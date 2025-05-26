import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Nav from '../../layouts/nav';
import Input from '../../components/auth/input';
import Button from '../../components/auth/button';
import Footer from '../../components/footer';
import { toast } from 'sonner' 
const Register = () =>{
        const [nombre, setNombre] = useState('');
        const [correo, setCorreo] = useState('');
        const [pass, setPass] = useState('');
        const handleRegister = async (e) => {
            e.preventDefault();
            if (!nombre || !correo ||!pass){
                toast.error("Campos obligatorios");
                return;
            }
            const data = {
                nombre:nombre,
                correo:correo,
                pass:pass
            };
        
                    try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                Object.values(errorData).forEach(msg => {
                toast.error(msg);
                });
            } else {
                const successText = await response.text();
                toast.success(successText);
            }
            } catch (error) {
            console.error(error);
            toast.error("No te registraste");
            }

        };


    return(
        <>
        <div className="flex flex-col min-h-screen">
            <Nav />
            <main className="flex-grow flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-[#7A0000] mb-4">Crear cuenta</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                <Input type="text" name="nombre" placeholder="John Doe" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <Input type="text" name="correo" placeholder="johndoe@mail.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                <Input type="password" name="pass" placeholder="********" value={pass} onChange={(e) => setPass(e.target.value)} />
                <Button type="submit">Crear cuenta</Button>
                </form>

                <p className="text-center mt-4 text-sm">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-[#7A0000] hover:underline">
                    Inicia sesión
                </Link>
                </p>
            </div>
            </main>
            <Footer />
        </div>
        </>

    );
}

export default Register;