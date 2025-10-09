import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../components/auth/button';

export default function MeseroLayout() {
  const navigate = useNavigate();
  const nombre = localStorage.getItem("nombre");
  const correo = localStorage.getItem("correo");
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("rol");
    localStorage.removeItem("correo");
    navigate("/login");
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <div className="flex h-screen">
      <aside className="hidden md:flex w-48 bg-white border-r border-gray-200 p-4 flex-col justify-between">
        <div>
          <h1 className='text-xl font-bold pl-3 mb-15 my-5'>
            <span className='text-[#7A0000]'>Dash</span>
            <span className='text-black'>Mesero</span>
          </h1>
          <nav className="space-y-10 text-xl">
            <Link to="/mesero/registro-pedidos-mesero" className="block pl-5 hover:text-[#7A0000] hover:font-bold">Registrar Pedido</Link>
            <Link to="/mesero/historial-pedidos" className="block pl-5 hover:text-[#7A0000] hover:font-bold">Historial de pedidos</Link>
            <button onClick={handleLogout} className="text-left w-full pl-5 hover:text-[#7A0000] hover:font-bold">Cerrar sesión</button>
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="w-full flex justify-between items-center p-4 border-b border-gray-200 bg-white shrink-0">
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <h1 className='md:hidden text-lg font-bold'>
            <span className='text-[#7A0000]'>Dash</span>
            <span className='text-black'>Mesero</span>
          </h1>
          <div className="flex items-center gap-2">
            <div className="text-right text-sm md:text-base">
              <button 
                onClick={() => setMostrarPerfil(true)}
                className="font-medium hover:text-[#7A0000] cursor-pointer"
              >
                Mesero
              </button>
            </div>
          </div>
        </header>
        {menuAbierto && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-40 border-b border-gray-200">
            <nav className="flex flex-col p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <Link to="/mesero/registro-pedidos-mesero" className="block py-2 px-4 hover:text-[#7A0000] hover:font-bold" onClick={cerrarMenu}>Registrar Pedido</Link>
              <Link to="/mesero/historial-pedidos" className="block py-2 px-4 hover:text-[#7A0000] hover:font-bold" onClick={cerrarMenu}>Historial de pedidos</Link>
              <button onClick={() => { handleLogout(); cerrarMenu(); }} className="text-left py-2 px-4 hover:text-[#7A0000] hover:font-bold">Cerrar sesión</button>
            </nav>
          </div>
        )}

        <main className="flex-1 p-4 md:p-6 bg-white overflow-auto">
          <div className="min-w-full inline-block">
            <Outlet />
          </div>
        </main>
      </div>
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
                  value={nombre || "Mesero"}
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