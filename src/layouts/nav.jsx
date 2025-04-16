import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/auth/button";
const Nav =() => {
    return(
        <>
            <nav className="flex items-center justify-between px-8 py-4">
                <Link to="/"><img src="/public/logotipe.png" alt="logo" className="h-40
                "/></Link>
            <div className="flex flex-items justify-center gap-2 w-72">
                <Button><Link to="/register">Crear cuenta</Link></Button>
                <Button><Link to="/login">Iniciar sesión</Link></Button>
            </div>
            </nav>
        </>
    );
};

export default Nav;