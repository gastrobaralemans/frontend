import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"
import {Link} from 'react-router-dom'
import Input from '../../components/auth/input';
import Button from '../../components/auth/button';


const Login = () =>{
    const [correo, setCorreo] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
    
        const data = {
            correo:correo,
            pass:pass
        };
    try{
        const response = await fetch("http://localhost:8080/api/auth/login",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const json = await response.json();
            localStorage.setItem("token", json.token);
            localStorage.setItem("refreshToken", json.refreshToken);
            localStorage.setItem("nombre", json.nombre);
            localStorage.setItem("rol", json.rol);
            switch(json.rol){
                case "admin":
                    navigate("/admin/dashboard");
                    break;
                case "mesero":
                    navigate("/mesero/dashboard");
                    break;
                case "cocinero":
                    navigate("/cocinero/dashboard");
                    break;
                default:
                    navigate("/");
                    break;
            }
        }
        else {
            const errorMsg = await response.text();
            alert("Error: " + errorMsg);
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión con el servidor");
    }
    } 
    return(
        <>
            <div className='min-h-screen flex items-center justify-center'>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-red-800 mb-4">Iniciar sesión</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input type="text" name="correo" placeholder="johndoe@mail.com" value={correo} onChange={(e) =>setCorreo(e.target.value)}/>
                    <Input type="password" name="pass" placeholder="********" value={pass} onChange={(e) =>setPass(e.target.value)}/>
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