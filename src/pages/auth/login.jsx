import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Input from '../../components/auth/input';
import Button from '../../components/auth/button';


const Login = () =>{
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
    
        const data = {
            correo:correo,
            contraseña:contraseña
        };
    
        const response = await fetch("http://localhost:8080/api/auth/login",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const text = await response.text();
        alert(text);
    } 
    return(
        <>
            <div className='min-h-screen flex items-center justify-center'>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-red-800 mb-4">Iniciar sesión</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                <Input type="text" name="correo" placeholder="jonhdoe@johndoe.com" value={correo} onChange={(e) =>setCorreo(e.target.value)}/>
                <Input type="password" name="contraseña" placeholder="********" value={contraseña} onChange={(e) =>setContraseña(e.target.value)}/>
                <Button type="submit">Iniciar sesión</Button>
                </form>

                <p className="text-center mt-4 text-sm">
                ¿No tienes cuenta?{" "}
                <Link to={"/register"} className="text-red-800 hover:underline">
                    Registrate
                </Link>
                </p>
            </div>
            </div>
        </> 
    );
    }
export default Login;