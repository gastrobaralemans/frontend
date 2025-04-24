import { Navigate } from 'react-router-dom';

const PublicOnlyRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  if (token) {
    if (rol === "admin") return <Navigate to="/admin/dashboard" />;
    if (rol === "cocinero") return <Navigate to="/cocinero/dashboard" />;
    if (rol === "mesero") return <Navigate to="/mesero/dashboard" />;
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicOnlyRoute;
