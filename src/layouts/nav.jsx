import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bell, ShoppingCart, FileText, Menu, X } from "lucide-react";
import Button from "../components/auth/button";

const Nav = () => {
  const token = localStorage.getItem("token");
  const nombre = localStorage.getItem("nombre");
  const correo = localStorage.getItem("correo");
  const navigate = useNavigate();

  const [notis, setNotis] = useState([]);
  const [mostrarNotis, setMostrarNotis] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    navigate("/login");
  };

  const obtenerNotis = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:8080/api/reservas/notificaciones", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotis(response.data);
      setMostrarNotis(true);
    } catch (error) {
      console.error("Error al obtener notificaciones", error);
    }
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-4 md:px-8 relative">
        <Link to="/" className="flex-shrink-0">
          <img 
            src="/logotipe.png" 
            alt="logo" 
            className="h-16 md:h-24 lg:h-32 xl:h-40 transition-all duration-300" 
          />
        </Link>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {!token ? (
            <>              <button className="bg-black text-white px-8 py-3">
                <Link to="/register" className="inline-block w-full h-full">
                  Crear cuenta
                </Link>
              </button>
                            <button className="bg-black text-white px-8 py-3">
                <Link to="/login" className="inline-block w-full h-full">
                  Iniciar sesión
                </Link>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setMostrarPerfil(true)}
                className="text-base lg:text-lg font-semibold px-4 py-2"
              >
                {nombre}
              </button>

              <Link 
                to="/postusers" 
                className="flex items-center gap-1 text-black"
                title="Publicaciones"
              >
                <FileText className="h-5 w-5 lg:h-6 lg:w-6" />
              </Link>

              <Link
                to="/carrito"
                className="flex items-center text-black"
                aria-label="Ir al carrito"
              >
                <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6" />
              </Link>

              <button 
                onClick={obtenerNotis} 
                className="relative text-black"
              >
                <Bell className="h-5 w-5 lg:h-6 lg:w-6" />
              </button>

              <button 
                onClick={handleLogout}
                className="bg-black text-white px-6 py-3"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>

        <button 
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        {menuAbierto && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-40 border-t">
            <div className="flex flex-col p-4 gap-3">
              {!token ? (
                <>
                  <Button className="w-full justify-center py-4 text-base font-semibold bg-[#7A0000] hover:bg-[#5a0000]">
                    <Link to="/register" onClick={cerrarMenu} className="w-full block">Crear cuenta</Link>
                  </Button>
                  <Button className="w-full justify-center py-4 text-base font-semibold border-2 border-[#7A0000] text-[#7A0000] bg-transparent hover:bg-[#7A0000] hover:text-white">
                    <Link to="/login" onClick={cerrarMenu} className="w-full block">Iniciar sesión</Link>
                  </Button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setMostrarPerfil(true);
                      cerrarMenu();
                    }}
                    className="text-lg font-semibold text-left py-3 px-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {nombre}
                  </button>
                  <Link 
                    to="/postusers" 
                    className="flex items-center gap-3 py-3 px-4"
                    onClick={cerrarMenu}
                  >
                    <FileText className="h-5 w-5" />
                    <span>Publicaciones</span>
                  </Link>
                  <Link
                    to="/carrito"
                    className="flex items-center gap-3 py-3 px-4"
                    onClick={cerrarMenu}
                    aria-label="Ir al carrito"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Carrito</span>
                  </Link>
                  <button 
                    onClick={() => {
                      obtenerNotis();
                      cerrarMenu();
                    }} 
                    className="flex items-center gap-3 py-3 px-4"
                  >
                    <Bell className="h-5 w-5" />
                    <span>Notificaciones</span>
                  </button>

                  <Button 
                    onClick={() => {
                      handleLogout();
                      cerrarMenu();
                    }}
                    className="w-full justify-center py-4 mt-2 text-base font-semibold bg-gray-800 hover:bg-gray-700"
                  >
                    Cerrar sesión
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      {mostrarNotis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-96 max-h-[80vh] overflow-y-auto relative">
            <h2 className="text-xl font-bold mb-4">Notificaciones</h2>
            <button
              onClick={() => setMostrarNotis(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {notis.length === 0 ? (
              <p>No tienes notificaciones.</p>
            ) : (
              <ul>
                {notis.map((noti) => (
                  <li key={noti.id} className="border-b py-2">
                    <strong>{noti.titulo}</strong>
                    <p>{noti.mensaje}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(noti.fecha).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {mostrarPerfil && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-96 max-h-[80vh] overflow-y-auto relative">
            <h2 className="text-xl font-bold mb-4">Mi Perfil</h2>
            <button
              onClick={() => setMostrarPerfil(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre || ""}
                  readOnly
                  className="w-full px-3 py-2 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={correo || ""}
                  readOnly
                  className="w-full px-3 py-2 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setMostrarPerfil(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;