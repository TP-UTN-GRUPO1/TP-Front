import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, userRole } = useContext(AuthContext);
  const role = Number(userRole);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    if (Array.isArray(requiredRole) && !requiredRole.includes(role)) {
      return <Navigate to="/unauthorized" replace />;
    }
    if (!Array.isArray(requiredRole) && role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
