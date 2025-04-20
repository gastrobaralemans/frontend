import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-48 bg-white border-r border-gray-200 p-4 flex flex-col justify-between">
        <div>
          <h1 className='text-xl font-bold pl-3 mb-15 my-5'>
            <span className='text-[#7A0000]'>Dash</span>
            <span className='text-black'>Admin</span>
          </h1>
          <nav className="space-y-10 text-xl">
            <Link to="/admin/menu-promos" className="block pl-5 hover:text-[#7A0000] hover:font-bold">Menu y promociones</Link>
            <Link to="/admin/pedidos" className="block pl-5 hover:text-[#7A0000] hover:font-bold">Pedidos</Link>
            <Link to="/admin/reportes" className="block pl-5 hover:text-[#7A0000] hover:font-bold">Reportes</Link>
            <Link to="/admin/inventario" className="block pl-5 hover:text-[#7A0000] hover:font-bold">Inventario</Link>
            <Link to="/admin/post" className="block pl-5 hover:text-[#7A0000] hover:font-bold">Crear Post</Link>
            <Link to="/admin/logout" className="block pl-5 hover:text-[#7A0000] hover:font-bold">Cerrar sesión</Link>
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
              <div className="font-medium">John Doe</div>
              <div className="text-gray-500">Admin</div>
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

