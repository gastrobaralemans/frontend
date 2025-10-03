import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Input from '../../components/auth/input';
import Button from '../../components/auth/button';
import { useForgotPasswordStore } from '../../store/forgotpasswordstore';

const VerificationCode = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { email, setCode: setStoreCode, setStep } = useForgotPasswordStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!code || code.length !== 6) {
            toast.error('Por favor ingrese un código válido de 6 dígitos');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code }),
            });

            if (!response.ok) {
                throw new Error('Código inválido o expirado');
            }

            const data = await response.json();
            
            if (data.valid) {
                setStoreCode(code);
                setStep('resetPassword');
                toast.success('Código verificado correctamente');
                navigate('/resetpassword');
            } else {
                throw new Error('Código inválido');
            }
            
        } catch (error) {
            toast.error(error.message || 'Error al verificar el código');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Error al reenviar el código');
            }

            toast.success('Código reenviado a tu correo');
        } catch (error) {
            toast.error(error.message || 'Error al reenviar el código');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-red-800 mb-4">Verificación de Código</h2>
                    <p className="text-gray-600 mb-6">
                        Ingresa el código de 6 dígitos que enviamos a: <br />
                        <span className="font-medium">{email}</span>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input 
                                type="text" 
                                name="codigo" 
                                placeholder="123456" 
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                maxLength={6}
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Verificando...' : 'Verificar Código'}
                        </Button>
                    </form>

                    <div className="text-center mt-4 space-y-2">
                        <p className="text-sm text-gray-600">
                            ¿No recibiste el código?{' '}
                            <button 
                                type="button" 
                                onClick={handleResendCode}
                                className="text-red-800 hover:underline font-medium"
                            >
                                Reenviar código
                            </button>
                        </p>
                        <p className="text-sm">
                            <Link to={"/codemail"} className="text-red-800 hover:underline">
                                Volver
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationCode;