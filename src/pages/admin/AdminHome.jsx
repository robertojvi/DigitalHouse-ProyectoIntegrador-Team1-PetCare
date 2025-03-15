import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import AdminLayout from "../../layouts/AdminLayout";
import AdminService from "./AdminService";
import AdminCategory from "./AdminCategory";
import AdminUser from "./AdminUser";
import { AdminProfile } from "./AdminProfile";
import "../../styles/admin/adminHome.css";

function AdminHome() {
	const { auth, logout } = useContext(AuthContext);
	const [selectedMenu, setSelectedMenu] = useState(() => {
		return localStorage.getItem("adminSelectedMenu") || "productos";
	});
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		isMobile: window.innerWidth <= 768,
	});

	const getInitials = (nombre, apellido) => {
		const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : "";
		const lastInitial = apellido ? apellido.charAt(0).toUpperCase() : "";
		return `${firstInitial}${lastInitial}`;
	};

	// Verificar dimensiones
	React.useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			const isMobile = width <= 768;
			setDimensions({ width, isMobile });
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Fix the storage event listener - use a simpler approach
	useEffect(() => {
		// Check localStorage on component mount
		const storedMenu = localStorage.getItem("adminSelectedMenu");
		if (storedMenu && storedMenu !== selectedMenu) {
			setSelectedMenu(storedMenu);
		}

		// This is a simpler approach since storage events only fire in other tabs
		const checkStorageInterval = setInterval(() => {
			const currentMenu = localStorage.getItem("adminSelectedMenu");
			if (currentMenu && currentMenu !== selectedMenu) {
				setSelectedMenu(currentMenu);
			}
		}, 1000); // Check every second

		return () => clearInterval(checkStorageInterval);
	}, []);

	const handleMenuClick = (menu) => {
		if (menu === "logout") {
			localStorage.removeItem("adminSelectedMenu");
			logout();
			return;
		}

		setSelectedMenu(menu);
		localStorage.setItem("adminSelectedMenu", menu);
	};

	if (!auth || !auth.token) {
		return (
			<div className="admin-home-container">
				<div className="admin-welcome-card">
					<h2>Cargando...</h2>
				</div>
			</div>
		);
	}

	// Verificar si debemos mostrar el warning
	const shouldShowWarning = dimensions.isMobile && auth?.role === "ADMIN";

	// Vista con menú lateral y contenido dinámico
	return (
		<main>
			<AdminLayout
				onMenuClick={handleMenuClick}
				shouldShowWarning={shouldShowWarning}
				selectedMenu={selectedMenu}
			>
				{selectedMenu === "productos" && (
					<AdminService isInAdminLayout={true} />
				)}
				{selectedMenu === "usuarios" && <AdminUser isInAdminLayout={true} />}
				{selectedMenu === "categorias" && (
					<AdminCategory isInAdminLayout={true} />
				)}
				{selectedMenu === "perfil" && <AdminProfile isInAdminLayout={true} />}
			</AdminLayout>
		</main>
	);
}

export default AdminHome;
