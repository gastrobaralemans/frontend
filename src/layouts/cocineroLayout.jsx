import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function CocineroLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("rol");
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
            <Link to="/cocinero/pedidos-preparacion" className="block pl-5 hover:text-[#7A0000] hover:font-bold">Ver pedidos en preparacion</Link>
            <Link to="/cocinero/inventario-cocinero" className="block pl-5 hover:text-[#7A0000] hover:font-bold">Inventario de ingredientes</Link>
            <button onClick={handleLogout} className="text-left w-full pl-5 hover:text-[#7A0000] hover:font-bold">Cerrar sesión</button>
          </nav>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="w-full flex justify-end items-center p-4 border-">
          <div className="flex items-center gap-2">
          <div className="w-15 h-15 rounded-full bg-black text-white flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} />
        </div>
            <div className="text-right text-x pr-3 my-5">
              <div className="font-medium">Cocinero</div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

