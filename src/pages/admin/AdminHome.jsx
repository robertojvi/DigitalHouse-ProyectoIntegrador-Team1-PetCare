import  { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import AdminService from "./AdminService";
import AdminCategory from "./AdminCategory";
import "../../styles/admin/adminHome.css";
import AdminUser from "./AdminUser";

function AdminHome() {
	const { auth } = useContext(AuthContext);
	const [selectedMenu, setSelectedMenu] = useState('productos');

	const getInitials = (nombre, apellido) => {
		const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : "";
		const lastInitial = apellido ? apellido.charAt(0).toUpperCase() : "";
		return `${firstInitial}${lastInitial}`;
	};

	const handleMenuClick = (menu) => {
		setSelectedMenu(menu);
	};

	if (!auth.token) {
		return (
			<div className="admin-home-container">
				<div className="admin-welcome-card">
					<h2>Cargando...</h2>
				</div>
			</div>
		);
	}

	// Vista con menú lateral y contenido dinámico
	return (
		<main>
			<AdminLayout onMenuClick={handleMenuClick}>
				{selectedMenu === "productos" && (
					<AdminService isInAdminLayout={true} />
				)}
				{selectedMenu === "usuarios" && (
					<AdminUser isInAdminLayout={true} />
				)}
				{selectedMenu === "categorias" && (
					<AdminCategory isInAdminLayout={true} />
				)}
				{/* Agregar otros componentes según el menú seleccionado */}
			</AdminLayout>
		</main>
	);
}

export default AdminHome;
