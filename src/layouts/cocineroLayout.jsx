import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/auth/button';

export default function CocineroLayout() {
  const navigate = useNavigate();
  const nombre = localStorage.getItem("nombre");
  const correo = localStorage.getItem("correo");
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("rol");
    localStorage.removeItem("correo");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <aside className="w-48 bg-white border-r border-gray-200 p-4 flex flex-col justify-between">
        <div>
          <h1 className='text-xl font-bold pl-3 mb-15 my-5'>
            <span className='text-[#7A0000]'>Dash</span>
            <span className='text-black'>Cocinero</span>
          </h1>
          <nav className="space-y-10 text-xl">
            <Link to="/cocinero/pedidos-cocinero" className="block pl-5 hover:text-[#7A0000] hover:font-bold">Pedidos</Link>
            <Link to="/cocinero/inventario-cocinero" className="block pl-5 hover:text-[#7A0000] hover:font-bold">Inventario de ingredientes</Link>
            <button onClick={handleLogout} className="text-left w-full pl-5 hover:text-[#7A0000] hover:font-bold">Cerrar sesión</button>
          </nav>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="w-full flex justify-end items-center p-4 border-">
          <div className="flex items-center gap-2">
            <div className="text-right text-x pr-3 my-5">
              <button 
                onClick={() => setMostrarPerfil(true)}
                className="font-medium hover:text-[#7A0000] cursor-pointer"
              >
                Cocinero
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>
      {mostrarPerfil && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto relative">
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
                  value={nombre || "Cocinero"}
                  readOnly
                  className="w-full px-3 py-2 cursor-not-allowed bg-gray-100"
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
                  className="w-full px-3 py-2 cursor-not-allowed bg-gray-100"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button 
                onClick={() => setMostrarPerfil(false)}
                className="px-4 py-2 bg-[#7A0000] text-white rounded-md hover:bg-[#5a0000] transition-colors"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}