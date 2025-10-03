import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Input from '../../components/auth/input';
import Button from '../../components/auth/button';
import { useForgotPasswordStore } from '../../store/forgotpasswordstore';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { email, code, reset } = useForgotPasswordStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPassword || !repeatPassword) {
            toast.error('Por favor complete todos los campos');
            return;
        }
        if (newPassword.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        if (newPassword !== repeatPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email, 
                    code, 
                    newPassword 
                }),
            });

            if (!response.ok) {
                throw new Error('Error al restablecer la contraseña');
            }

            const data = await response.json();
            
            if (data.success) {
                toast.success('Contraseña restablecida correctamente');
                reset();
                navigate('/login');
            } else {
                throw new Error('Error al restablecer la contraseña');
            }
            
        } catch (error) {
            toast.error(error.message || 'Error al restablecer la contraseña');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-red-800 mb-4">Restablecer Contraseña</h2>
                    <p className="text-gray-600 mb-6">
                        Crea una nueva contraseña para tu cuenta
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input 
                                type="password" 
                                name="nuevaContraseña" 
                                placeholder="Nueva contraseña" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <Input 
                                type="password" 
                                name="repetirContraseña" 
                                placeholder="Repetir contraseña" 
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
                        </Button>
                    </form>

                    <p className="text-center mt-4 text-sm">
                        <Link to={"/verificationcode"} className="text-red-800 hover:underline">
                            Volver
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;