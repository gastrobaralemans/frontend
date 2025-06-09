import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleRoute from "./RoleRoute.jsx";
import PublicOnlyRoute from "./publicsRoutes.jsx";
import RoleRouteRegister from "./RoleRouteRegister.jsx";

//user
import Home from "../pages/Index.jsx";
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/register.jsx";
import MenuPage from "../pages/menu/MenuPage.jsx";
import Birthday from "../pages/reserves/birthday.jsx";
import Graduation from "../pages/reserves/graduation.jsx";
import Wedding from "../pages/reserves/wedding.jsx";
import PostUser from "../pages/user/postusers.jsx";
import CarritoPage from "../pages/user/CarritoPage.jsx";
// Admin
import AdminLayout from "../layouts/adminLayout.jsx";
import DashboardAdmin from "../pages/admin/dashboard.jsx";
import UsersTable from "../pages/admin/users.jsx";
import MenuPromosAdmin from "../pages/admin/menupromos.jsx";
import PedidosAdmin from "../pages/admin/pedidos.jsx";
import ReportesAdmin from "../pages/admin/Reportes.jsx";
import ReservasAdmin from "../pages/admin/reservas.jsx";
import InventarioAdmin from "../pages/admin/inventario.jsx";
import AsociarIngredientes from "../pages/admin/receta.jsx";
import PostAdmin from "../pages/admin/post.jsx";

//Cocineroo
import CocineroLayout from "../layouts/cocineroLayout.jsx";
import DashboardCocinero from "../pages/cocinero/dashboard.jsx";
import InventarioIngredientesCocinero from "../pages/cocinero/inventario.jsx";
import PedidosCocinero from "../pages/cocinero/PedidosCocinero.jsx";

//mesero
import MeseroLayout from "../layouts/meseroLayout.jsx";
import DashboardMesero from "../pages/mesero/dashboard.jsx";
import HistorialPedidos from "../pages/mesero/historialPedidos.jsx";
import PedidosMesero from "../pages/mesero/pedidos.jsx";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Usuarios */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
        <Route path="/menu" element={<RoleRouteRegister allowedRoles={["usuario"]}><MenuPage /></RoleRouteRegister>} />
        <Route path="/birthdayreserve" element={<RoleRouteRegister allowedRoles={["usuario"]}><Birthday /></RoleRouteRegister>} />
        <Route path="/graduationreserve" element={<RoleRouteRegister allowedRoles={["usuario"]}><Graduation /></RoleRouteRegister>} />
        <Route path="/weddingreserve" element={<RoleRouteRegister allowedRoles={["usuario"]}><Wedding /></RoleRouteRegister>} />
        <Route path="/postusers" element={<RoleRouteRegister allowedRoles={["usuario"]}><PostUser /></RoleRouteRegister>} />
        <Route path="/carrito" element={<RoleRouteRegister allowedRoles={["usuario"]}><CarritoPage /></RoleRouteRegister>} />
        <Route path="/admin" element={<RoleRoute allowedRoles={["admin"]}><AdminLayout /></RoleRoute>}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="users" element={<UsersTable />} />
          <Route path="menu-promos" element={<MenuPromosAdmin />} />
          <Route path="pedidos" element={<PedidosAdmin />} />
          <Route path="reportes" element={<ReportesAdmin />} />
          <Route path="reservas" element={<ReservasAdmin />} />
          <Route path="inventario" element={<InventarioAdmin />} />
          <Route path="receta" element={<AsociarIngredientes />} />
          <Route path="post" element={<PostAdmin />} />
        </Route>
        <Route path="/cocinero" element={<RoleRoute allowedRoles={["cocinero"]}><CocineroLayout /></RoleRoute>}>
          <Route path="dashboard" element={<DashboardCocinero />} />
          <Route path="inventario-cocinero" element={<InventarioIngredientesCocinero />} />
          <Route path="pedidos-cocinero" element={<PedidosCocinero />} />
        </Route>
        <Route path="/mesero" element={<RoleRoute allowedRoles={["mesero"]}><MeseroLayout /></RoleRoute>}>
          <Route path="dashboard" element={<DashboardMesero />} />
          <Route path="historial-pedidos" element={<HistorialPedidos />} />
          <Route path="registro-pedidos-mesero" element={<PedidosMesero />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
