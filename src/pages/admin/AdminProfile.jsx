import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";

export const AdminProfile = () => {
    const BASE_URL = import.meta.env.VITE_API_URL || "";
    const API_URL = `${BASE_URL}/api/usuarios`;
    const [profileInfo, setProfileInfo] = useState(null);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);

    console.log("AUTH", auth)
    const getAuthHeaders = () => {
        if (!auth || !auth.token) return null;
        return {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                "Content-Type": "application/json"
            },
        };
    };

    const getUserProfile = async () => {
        const headers = getAuthHeaders();
        if (!headers) {
            console.warn("No hay token disponible, cerrando sesión...");
            setError("No estás autenticado.");
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/profile`, headers);
            setProfileInfo(response.data);
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            const errorMessage = error.response?.status === 403
                ? "No tienes permisos para ver este perfil"
                : `Error al obtener el usuario: ${error.response?.data?.message || error.message}`;
            setError(errorMessage);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, [auth]);

    return (
        <div>
            <h2>Perfil del usuario</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {profileInfo ? (
                <div>
                    <p><strong>Nombre:</strong> {profileInfo.nombre} {profileInfo.apellido}</p>
                    <p><strong>Email: </strong> {profileInfo.email}</p>
                </div>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
};
