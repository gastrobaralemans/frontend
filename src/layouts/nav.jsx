import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/auth/button";
const Nav =() => {
    const token = localStorage.getItem("token");
    const nombre = localStorage.getItem("nombre");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("nombre");
        navigate("/login");
    };
    return(
        <>
           <nav className="flex items-center justify-between px-8 py-4">
            <Link to="/"><img src="/public/logotipe.png" alt="logo" className="h-40" /></Link>
            <div className="flex flex-items justify-center gap-2 w-72">
                {!token ? (
                    <>
                        <Button><Link to="/register">Crear cuenta</Link></Button>
                        <Button><Link to="/login">Iniciar sesión</Link></Button>
                    </>
                ) : (
                    <>
                        <span className="text-lg font-semibold">{nombre}</span>
                        <Button onClick={handleLogout}>Cerrar sesión</Button>
                    </>
                )}
            </div>
        </nav>
        </>
    );
};

export default Nav;