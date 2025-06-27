import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth/Auth.Context";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, userRole } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    if (Array.isArray(requiredRole) && !requiredRole.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
    if (!Array.isArray(requiredRole) && userRole !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
