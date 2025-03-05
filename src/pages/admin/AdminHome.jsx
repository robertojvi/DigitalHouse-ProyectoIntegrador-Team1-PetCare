import React from "react";
import { Link } from "react-router-dom";
import "../../styles/admin/adminHome.css";

const AdminHome = () => {
	return (
		<main className="admin-container">
			<h1>Administración</h1>
			<div className="admin-navigation">
				<Link
					to="/administracion/service"
					className="adminHome-admin-button"
				>
					Lista de Productos
				</Link>
			</div>
		</main>
	);
};

export default AdminHome;
