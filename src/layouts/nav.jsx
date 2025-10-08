import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bell, ShoppingCart, FileText, Menu, X } from "lucide-react";
import Button from "../components/auth/button";
import CarritoModal from "../components/carrito/CarritoModal";

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
      <nav className="flex items-center justify-between px-4 py-4 md:px-8 relative bg-white shadow-sm">
        <Link to="/" className="flex-shrink-0">
          <img 
            src="/logotipe.png" 
            alt="logo" 
            className="h-16 md:h-24 lg:h-32 xl:h-40 transition-all duration-300" 
          />
        </Link>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {!token ? (
            <>
              <Button className="text-sm lg:text-base">
                <Link to="/register">Crear cuenta</Link>
              </Button>
              <Button className="text-sm lg:text-base">
                <Link to="/login">Iniciar sesión</Link>
              </Button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setMostrarPerfil(true)}
                className="text-base lg:text-lg font-semibold hover:text-blue-600 transition-colors"
              >
                {nombre}
              </button>

              <Link 
                to="/postusers" 
                className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors"
                title="Mis publicaciones"
              >
                <FileText className="h-5 w-5 lg:h-6 lg:w-6" />
              </Link>

              <Link
                to="/carrito"
                className="flex items-center text-gray-700 hover:text-black transition-colors"
                aria-label="Ir al carrito"
              >
                <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6" />
              </Link>

              <button 
                onClick={obtenerNotis} 
                className="relative text-gray-700 hover:text-black transition-colors"
              >
                <Bell className="h-5 w-5 lg:h-6 lg:w-6" />
              </button>

              <Button 
                onClick={handleLogout}
                className="text-sm lg:text-base"
              >
                Cerrar sesión
              </Button>
            </>
          )}
        </div>

        <button 
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Menú móvil */}
        {menuAbierto && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-40">
            <div className="flex flex-col p-4 gap-4">
              {!token ? (
                <>
                  <Button className="w-full justify-center">
                    <Link to="/register" onClick={cerrarMenu}>Crear cuenta</Link>
                  </Button>
                  <Button className="w-full justify-center">
                    <Link to="/login" onClick={cerrarMenu}>Iniciar sesión</Link>
                  </Button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setMostrarPerfil(true);
                      cerrarMenu();
                    }}
                    className="text-lg font-semibold text-left py-2 border-b"
                  >
                    {nombre}
                  </button>

                  <Link 
                    to="/postusers" 
                    className="flex items-center gap-2 py-2 border-b text-gray-700 hover:text-black"
                    onClick={cerrarMenu}
                  >
                    <FileText className="h-5 w-5" />
                    <span>Mis publicaciones</span>
                  </Link>

                  <Link
                    to="/carrito"
                    className="flex items-center gap-2 py-2 border-b text-gray-700 hover:text-black"
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
                    className="flex items-center gap-2 py-2 border-b text-gray-700 hover:text-black text-left"
                  >
                    <Bell className="h-5 w-5" />
                    <span>Notificaciones</span>
                  </button>

                  <Button 
                    onClick={() => {
                      handleLogout();
                      cerrarMenu();
                    }}
                    className="w-full justify-center mt-2"
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