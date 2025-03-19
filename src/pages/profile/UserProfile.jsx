import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import "../../styles/admin/adminProfile.css";

const UserProfile = () => {
	const { auth } = useContext(AuthContext);
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Use the same BASE_URL pattern as AdminUserList
	const BASE_URL = import.meta.env.VITE_API_URL || "";
	const API_URL = `${BASE_URL}/api/usuarios`;

	useEffect(() => {
		console.log("Auth object:", auth);

		if (auth?.role === "CLIENTE" || auth?.role === "USER") {
			// For client/user roles, just use the auth data from context
			console.log("Using auth data from context for client/user role");
			setUserData(auth);
			setLoading(false);
		} else if (auth && (auth.id || auth.idUsuario)) {
			// Only try API fetch for admin users
			fetchUserData(auth.id || auth.idUsuario);
		} else if (auth && auth.token) {
			console.log("Auth object without ID:", auth);
			setUserData(auth);
			setLoading(false);
		} else {
			setLoading(false);
		}
	}, [auth]);

	const fetchUserData = async (userId) => {
		try {
			setLoading(true);
			console.log(
				`Fetching user data for ID: ${userId} from ${API_URL}/${userId}`
			);

			const response = await axios.get(`${API_URL}/${userId}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			});

			console.log("User data from API:", response.data);

			// Map the response to our expected properties
			const apiData = response.data;

			// Extract role from authorities if needed
			let role = apiData.role;
			if (!role && apiData.authorities && apiData.authorities.length > 0) {
				const authority = apiData.authorities[0].authority;
				role = authority.replace("ROLE_", "");
			}

			const processedUserData = {
				id: apiData.idUsuario,
				nombre: apiData.nombre,
				apellido: apiData.apellido,
				email: apiData.email || apiData.username,
				telefono: apiData.telefono,
				role: role,
				fechaRegistro: apiData.fechaRegistro,
				fechaActualizacion: apiData.fechaActualizacion,
				originalData: apiData,
			};

			setUserData(processedUserData);
			setLoading(false);
			setError(null); // Clear any previous errors
		} catch (err) {
			console.error("Error fetching user data:", err);

			// Handle 403 forbidden errors gracefully
			if (err.response && err.response.status === 403) {
				console.log("Access forbidden - using data from auth context");
				setUserData(auth);
				// No need to show error to user for expected permission issues
				setError(null);
			} else {
				setUserData(auth);
				setError(`Error al cargar datos del perfil: ${err.message}`);
			}
			setLoading(false);
		}
	};

	if (!auth || !auth.token) {
		return (
			<div className="profile-container">
				<div className="profile-card">
					<h2>Acceso no autorizado</h2>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="profile-container">
				<div className="profile-card">
					<h2>Cargando información de usuario...</h2>
				</div>
			</div>
		);
	}

	// Merge auth and userData to ensure we have all available data
	const user = userData ? { ...auth, ...userData } : auth;

	// Extract data for display
	const displayName = user.nombre || "";
	const displayLastName = user.apellido || "";
	const displayEmail = user.email || user.username || "";
	const displayPhone = user.telefono || "";
	const displayRole = user.role || "";

	return (
		<div className="profile-container">
			<div className="profile-card">
				<div className="profile-header">
					<div className="profile-avatar">
						<span>
							{displayName[0] || ""}
							{displayLastName[0] || ""}
						</span>
					</div>
					<h2>Mi Perfil</h2>
					{error && (
						<p
							className="profile-error"
							style={{ color: "red", marginTop: "10px" }}
						>
							{error}
						</p>
					)}
				</div>

				<div className="profile-info">
					{displayName && (
						<div className="profile-info-item">
							<strong>Nombre:</strong>
							<span>{displayName}</span>
						</div>
					)}

					{displayLastName && (
						<div className="profile-info-item">
							<strong>Apellido:</strong>
							<span>{displayLastName}</span>
						</div>
					)}

					{displayEmail && (
						<div className="profile-info-item">
							<strong>Email:</strong>
							<span>{displayEmail}</span>
						</div>
					)}

					{displayPhone && (
						<div className="profile-info-item">
							<strong>Teléfono:</strong>
							<span>{displayPhone}</span>
						</div>
					)}

					{displayRole && (
						<div className="profile-info-item">
							<strong>Rol:</strong>
							<span>
								{displayRole === "ADMIN" ? "Administrador" : "Usuario"}
							</span>
						</div>
					)}

					{/* Additional fields that might be interesting */}
					{userData?.fechaRegistro && (
						<div className="profile-info-item">
							<strong>Fecha de registro:</strong>
							<span>
								{new Date(userData.fechaRegistro).toLocaleDateString("es-ES")}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

// Helper function to format field names for display
const formatFieldName = (key) => {
	const fieldNameMap = {
		fechaNacimiento: "Fecha de Nacimiento",
		direccion: "Dirección",
		ciudad: "Ciudad",
		codigoPostal: "Código Postal",
		fechaRegistro: "Fecha de Registro",
		createdAt: "Fecha de Registro",
		updatedAt: "Última Actualización",
		password: "Contraseña",
	};

	return fieldNameMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
};

// Helper function to format field values for display
const formatFieldValue = (key, value) => {
	// Don't display password field content
	if (key === "password" || key === "contraseña") {
		return "********";
	}

	// Format date fields
	if (
		key.toLowerCase().includes("fecha") ||
		key === "createdAt" ||
		key === "updatedAt"
	) {
		try {
			return new Date(value).toLocaleDateString("es-ES");
		} catch (e) {
			return value.toString();
		}
	}

	// Handle boolean values
	if (typeof value === "boolean") {
		return value ? "Sí" : "No";
	}

	return value.toString();
};

export default UserProfile;
