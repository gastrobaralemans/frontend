import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bell, ShoppingCart, FileText } from "lucide-react";
import Button from "../components/auth/button";
import CarritoModal from "../components/carrito/CarritoModal";

const Nav = () => {
  const token = localStorage.getItem("token");
  const nombre = localStorage.getItem("nombre");
  const navigate = useNavigate();

  const [notis, setNotis] = useState([]);
  const [mostrarNotis, setMostrarNotis] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
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

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4">
        <Link to="/">
          <img src="/logotipe.png" alt="logo" className="h-40" />
        </Link>

        <div className="flex items-center gap-2 w-72">
          {!token ? (
            <>
              <Button>
                <Link to="/register">Crear cuenta</Link>
              </Button>
              <Button>
                <Link to="/login">Iniciar sesión</Link>
              </Button>
            </>
          ) : (
            <>
              <span className="text-lg font-semibold">{nombre}</span>

              <Link to="/postusers" className="flex items-center gap-1 text-gray-700 hover:text-black">
                <FileText className="h-6 w-6"/>
              </Link>

              <Link
                to="/carrito"
                className="flex items-center text-gray-700 hover:text-black"
                aria-label="Ir al carrito"
                >
                <ShoppingCart className="h-6 w-6" />
                </Link>

              <button onClick={obtenerNotis} className="relative">
                <Bell className="h-6 w-6 text-gray-700 hover:text-black" />
              </button>

              <Button onClick={handleLogout}>Cerrar sesión</Button>
            </>
          )}
        </div>
      </nav>
      {mostrarCarrito && (
        <CarritoModal onClose={() => setMostrarCarrito(false)} />
      )}
      {mostrarNotis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto relative">
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
    </>
  );
};

export default Nav;
