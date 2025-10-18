import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { toast } from 'sonner';
import Input from '../../components/auth/input';
import Button from '../../components/auth/button';
import { useForgotPasswordStore } from '../../store/forgotpasswordstore';
const CodeMail =()=>{
    const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const {setMail, setStep}=useForgotPasswordStore();

  const handleSubmit = async (e) => {
        e.preventDefault();

         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Por favor ingrese un correo electrónico válido');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el código');
            }
            setMail(email);
            setStep('verificationCode');
            toast.success('Código enviado a tu correo');
            navigate('/verificationcode');
            
        } catch (error) {
            toast.error(error.message || 'Error al enviar el código');
        } finally {
            setLoading(false);
        }
    

  }

  return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-red-800 mb-4">Ingresa tu correo electrónico</h2>

                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-3">
                            <Input 
                                type="text" 
                                name="correo" 
                                placeholder="johndoe@mail.com" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full"
                            />
                            <Button type="submit" className="w-full">
                                Enviar código
                            </Button>
                        </div>
                    </form>
                    
                    <p className="text-center mt-4 text-sm">
                        <Link to={"/login"} className="text-red-800 hover:underline">
                            Volver
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );


}

export default CodeMail;


