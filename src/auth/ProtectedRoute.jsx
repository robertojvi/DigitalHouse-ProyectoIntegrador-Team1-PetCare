import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "../styles/protectedRoutes/protectedRoutes.css";

const ProtectedRoute = ({ children, requiredRole }) => {
	const { auth } = useContext(AuthContext);
	const location = useLocation();

	// If not authenticated, redirect to homepage
	if (!auth || !auth.token) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	// If role is required and user doesn't have it, redirect to homepage
	if (requiredRole && auth.role !== requiredRole) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	// If authenticated and has required role (if any), render the children
	return children;
};

export default ProtectedRoute;
