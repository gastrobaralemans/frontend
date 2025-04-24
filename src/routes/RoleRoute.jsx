import { Navigate } from 'react-router-dom';

const RoleRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  if (!token || !allowedRoles.includes(rol)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleRoute;
