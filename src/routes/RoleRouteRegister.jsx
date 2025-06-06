import { Navigate } from 'react-router-dom';

const RoleRouteRegister = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  if (!token || !allowedRoles.includes(rol)) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default RoleRouteRegister;
