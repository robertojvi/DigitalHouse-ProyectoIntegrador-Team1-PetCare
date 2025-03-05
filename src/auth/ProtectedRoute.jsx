import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "../styles/protectedRoutes/protectedRoutes.css";

function ProtectedRoute({ children, requiredRole }) {
const { auth } = useContext(AuthContext);

  if (!auth.role) {
    return <Navigate to="/" replace />; 
  }

  if (requiredRole && auth.role !== requiredRole) {
    return( 
            <>
            <div className="no-auth-msj">
                <h2>No tienes permiso para acceder a esta página.</h2>                
            </div>
                
            </>
        ); 
  }

  return children;
}

export default ProtectedRoute;
