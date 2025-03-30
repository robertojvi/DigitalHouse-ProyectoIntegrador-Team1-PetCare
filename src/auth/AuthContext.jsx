import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		token: localStorage.getItem("token") || null,
		role: localStorage.getItem("role") || null,
		idUsuario: localStorage.getItem("idUser") || null,
		nombre: localStorage.getItem("userName") || "Usuario",
		apellido: localStorage.getItem("lastname") || "Apellido",
		isAuthenticated: !!localStorage.getItem("token"),
	});

	useEffect(() => {
		// Check if token exists in localStorage on component mount
		const token = localStorage.getItem("token");
		if (token) {
			updateAuthFromLocalStorage();
		}
	}, []);

	const updateAuthFromLocalStorage = () => {
		setAuth({
			token: localStorage.getItem("token"),
			role: localStorage.getItem("role"),
			idUsuario: localStorage.getItem("idUser"),
			nombre: localStorage.getItem("userName") || "Usuario",
			apellido: localStorage.getItem("lastname") || "Apellido",
			isAuthenticated: true,
		});
	};

	const login = (userData) => {
		// Save to localStorage
		localStorage.setItem("token", userData.token);
		localStorage.setItem("role", userData.role);
		localStorage.setItem("idUser", userData.idUsuario);
		localStorage.setItem("userName", userData.nombre || "Usuario");
		localStorage.setItem("lastname", userData.apellido || "Apellido");

		// Update auth state
		setAuth({
			token: userData.token,
			role: userData.role,
			idUsuario: userData.idUsuario,
			nombre: userData.nombre || "Usuario",
			apellido: userData.apellido || "Apellido",
			isAuthenticated: true,
		});

		console.log("Auth context updated with new token:", userData.token);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		localStorage.removeItem("idUser");
		localStorage.removeItem("userName");
		localStorage.removeItem("lastname");

		setAuth({
			token: null,
			role: null,
			idUsuario: null,
			nombre: "Usuario",
			apellido: "Apellido",
			isAuthenticated: false,
		});
	};

	return (
		<AuthContext.Provider
			value={{ auth, login, logout, updateAuthFromLocalStorage }}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
