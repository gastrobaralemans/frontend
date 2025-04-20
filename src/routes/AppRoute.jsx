import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Index.jsx";

// Usuarios
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/register.jsx";
import Birthday from "../pages/reserves/birthday.jsx";
import Graduation from "../pages/reserves/graduation.jsx";
import Wedding from "../pages/reserves/wedding.jsx";

// Admin
import AdminLayout from "../layouts/adminLayout.jsx";
import DashboardAdmin from "../pages/admin/dashboard.jsx";
import MenuPromosAdmin from "../pages/admin/menupromos.jsx";
import PedidosAdmin from "../pages/admin/pedidos.jsx";
import ReportesAdmin from "../pages/admin/Reportes.jsx";
import InventarioAdmin from "../pages/admin/inventario.jsx";
import PostAdmin from "../pages/admin/post.jsx";

//Cocineroo

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Usuarios */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/birthdayreserve" element={<Birthday />} />
        <Route path="/graduationreserve" element={<Graduation />} />
        <Route path="/weddingreserve" element={<Wedding />} />

        {/* Admin layout con rutas anidadas */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="menu-promos" element={<MenuPromosAdmin />} />
          <Route path="pedidos" element={<PedidosAdmin />} />
          <Route path="reportes" element={<ReportesAdmin />} />
          <Route path="inventario" element={<InventarioAdmin />} />
          <Route path="post" element={<PostAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
