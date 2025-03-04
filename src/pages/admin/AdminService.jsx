// React
import { useState } from "react";
import { Link } from "react-router-dom";

// Components
import AdminServiceList from "../../components/admin/AdminServiceList";
import AddProductForm from "../../components/forms/AddProductForm";

// Styles
import "../../styles/admin/adminService.css";

// Images
import warningIcon from "../../images/warning.png";
import addPlusIcon from "../../images/add-plus.png";

const AdminService = () => {
	const [showAddForm, setShowAddForm] = useState(false);
	const [error, setError] = useState(null);
	const [productos, setProductos] = useState([]);

	const handleAddProduct = async (servicioData) => {
		try {
			setError(null);
			/* setProductos((prevProductos) => [
				...prevProductos,
				{
					id: servicioData.id || Date.now(),
					tipo: "Servicio",
					nombre: servicioData.nombre || servicioData.name,
				},
			]); */

			// Opcional: Mostrar mensaje de éxito
			alert("Servicio creado exitosamente");
			<AdminServiceList />;
		} catch (error) {
			setError(error.message || "Error al crear el servicio");
			console.error("Error al procesar el servicio:", error);
		}
	};

	return (
		<main className="admin-container">
			{/* Mobile section */}
			<div className="mobile-message">
				<img src={warningIcon} alt="Warning" className="warning-icon" />
				<span>NO DISPONIBLE PARA MOBILE</span>
			</div>

			{/* Breadcrumbs section */}
			<div className="breadcrumb">
				<Link to="/" className="breadcrumb-link">
					Inicio
				</Link>

				<span className="breadcrumb-separator"> &gt; </span>

				<Link to="/administracion" className="breadcrumb-link">
					Administración
				</Link>

				<span className="breadcrumb-separator"> &gt; </span>

				<span className="breadcrumb-current">Servicio</span>
			</div>

			{error && <div className="error-message">{error}</div>}

			{/* List section */}
			<div className="admin-content">
				<section className="admin-section">
					<div className="admin-header">
						<button
							className="adminService-admin-button"
							onClick={() => setShowAddForm(true)}
						>
							<span>Añadir Productos</span>
							<img
								src={addPlusIcon}
								alt="Añadir"
								style={{
									width: "15px",
									height: "15px",
									marginLeft: "8px",
								}}
							/>
						</button>

						{showAddForm && (
							<AddProductForm
								onClose={() => {
									setShowAddForm(false);
									setError(null);
								}}
								onSubmit={handleAddProduct}
							/>
						)}
					</div>

					<AdminServiceList />
				</section>
			</div>
		</main>
	);
};

export default AdminService;
