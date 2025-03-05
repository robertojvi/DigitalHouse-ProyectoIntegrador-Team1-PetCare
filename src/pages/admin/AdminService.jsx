// React
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";

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
	const { auth, logout } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [services, setServices] = useState([]);

	const getAuthHeaders = () => {
		if (!auth || !auth.token) return null;
		return {
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		};
	};

	const fetchServices = async () => {
		const headers = getAuthHeaders();
		if (!headers) {
			logout();
			return;
		}

		try {
			setLoading(true);
			const response = await axios.get(
				"http://localhost:8080/api/servicios",
				headers
			);
			setServices(response.data);
			setError(null);
		} catch (err) {
			console.error("Error fetching services:", err);
			setError("Error al cargar los servicios: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchServices();
	}, [auth.token]);

	const handleAddProduct = async (servicioData) => {
		const headers = getAuthHeaders();
		if (!headers) {
			logout();
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:8080/api/servicios",
				servicioData,
				headers
			);

			// Actualizar la lista de servicios
			await fetchServices();

			setShowAddForm(false);
			alert("Servicio creado exitosamente");
		} catch (error) {
			console.error("Error creating service:", error);
			setError("Error al crear el servicio: " + error.message);
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
