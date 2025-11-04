import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Nav from '../../layouts/nav';
import Input from '../../components/auth/input';
import Button from '../../components/auth/button';
import Footer from '../../components/footer';
import { useForgotPasswordStore } from '../../store';
import { toast } from 'sonner';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { reset } = useForgotPasswordStore();

  useEffect(() => reset(), [reset]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, pass })
      });
      if (response.ok) {
        const json = await response.json();
        localStorage.setItem("token", json.token);
        localStorage.setItem("refreshToken", json.refreshToken);
        localStorage.setItem("nombre", json.nombre);
        localStorage.setItem("correo", json.correo || correo);
        localStorage.setItem("rol", json.rol);
        toast.success("Inicio de sesión exitoso");
        switch (json.rol) {
          case "admin": navigate("/admin/dashboard"); break;
          case "mesero": navigate("/mesero/dashboard"); break;
          case "cocinero": navigate("/cocinero/dashboard"); break;
          default: navigate("/"); break;
        }
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Error desconocido al iniciar sesión");
      }
    } catch {
      toast.error("Error de conexión con el servidor");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-red-800 mb-4">Iniciar sesión</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="text" name="correo" placeholder="johndoe@mail.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />

            <div className="relative">
              <Input
                type={showPass ? 'text' : 'password'}
                name="pass"
                placeholder="********"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-sm text-red-700 hover:underline"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? 'Ocultar' : 'Ver'}
              </button>
            </div>

            <Button type="submit">Iniciar sesión</Button>
          </form>

          <p className="text-center mt-4 text-sm">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-red-800 hover:underline">Registrate</Link>
          </p>
          <p className="text-center mt-4 text-sm">
            ¿Olvidaste la contraseña?{" "}
            <Link to="/codemail" className="text-red-800 hover:underline">Actualizar</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
