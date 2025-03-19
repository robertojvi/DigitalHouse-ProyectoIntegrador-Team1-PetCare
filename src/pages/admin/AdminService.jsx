// React
import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

// Components
import AdminServiceList from "../../components/admin/AdminServiceList";
import AddProductForm from "../../components/forms/AddProductForm";
import EditProductForm from "../../components/forms/EditProductForm";

// Styles
import "../../styles/admin/adminService.css";

// Images
import addPlusIcon from "../../images/add-plus.png";

// eslint-disable-next-line react/prop-types
const AdminService = ({ isInAdminLayout, onActionComplete }) => {
	const [showAddForm, setShowAddForm] = useState(false);
	const [error, setError] = useState(null);
	const { auth, logout } = useContext(AuthContext);
	const [, setLoading] = useState(false);
	const [, setServices] = useState([]);
	const [selectedService, setSelectedService] = useState(null);
	const [showEditForm, setShowEditForm] = useState(false);

	const BASE_URL = import.meta.env.VITE_API_URL || "";
	const API_URL = `${BASE_URL}/api/servicios`;

	const getAuthHeaders = () => {
		if (!auth || !auth.token) return null;
		return {
			headers: {
				Authorization: `Bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
		};
	};

	// Fix the fetchServices function to avoid circular dependencies
	const fetchServices = useCallback(async () => {
		console.log("Fetching services...");

		if (!auth || !auth.token) {
			logout();
			return;
		}

		const headers = {
			headers: {
				Authorization: `Bearer ${auth.token}`,
				"Content-Type": "application/json",
			},
		};

		try {
			setLoading(true);
			const response = await axios.get(API_URL, headers);
			console.log("Services fetched:", response.data);
			setServices(response.data);
			setError(null);

			// Set localStorage to mark we're on the products tab
			localStorage.setItem("adminSelectedMenu", "productos");
		} catch (err) {
			console.error("Error fetching services:", err);
			setError(
				"Error al cargar los servicios: " + (err.message || "Error desconocido")
			);
		} finally {
			setLoading(false);
		}
	}, [API_URL, auth, logout]);

	// Initial fetch
	useEffect(() => {
		fetchServices();
	}, [fetchServices]);

	// Setup global refresh function and event listeners
	useEffect(() => {
		console.log("Setting up refresh functions and listeners");

		// Make refresh functions available globally
		window.refreshServiceList = fetchServices;
		window.refreshProductList = fetchServices;

		// Listen for the custom event
		const handleServiceUpdated = (event) => {
			console.log("Service updated event received", event.detail);
			fetchServices();
		};

		window.addEventListener("serviceUpdated", handleServiceUpdated);

		return () => {
			console.log("Cleaning up refresh functions and listeners");
			delete window.refreshServiceList;
			delete window.refreshProductList;
			window.removeEventListener("serviceUpdated", handleServiceUpdated);
		};
	}, [fetchServices]);

	const handleAddProduct = async (servicioData) => {
		try {
			await axios.post(API_URL, servicioData, getAuthHeaders());
			await fetchServices(); // Recargar la lista
			setShowAddForm(false);
			toast.success("Servicio creado exitosamente");
			onActionComplete?.(); // Notificar que la acción se completó
		} catch (error) {
			console.error("Error creating service:", error);
			setError("Error al crear el servicio: " + error.message);
		}
	};

	const handleEditService = async (serviceData) => {
		const headers = getAuthHeaders();
		if (!headers) {
			logout();
			return;
		}

		try {
			// Corregimos la URL para incluir la categoría
			await axios.put(
				`${API_URL}/${serviceData.idServicio}/categorias/${serviceData.categoriaId}`,
				serviceData,
				headers
			);

			await fetchServices(); // Recargar la lista
			setShowEditForm(false);
			setSelectedService(null);
			toast.success("Servicio actualizado exitosamente");
			onActionComplete?.(); // Notificar que la acción se completó
		} catch (error) {
			setError("Error al actualizar el servicio: " + error.message);
			toast.error("Error al actualizar el servicio: " + error.message);
		}
	};

	const handleDeleteService = async (id) => {
		try {
			await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
			await fetchServices(); // Recargar la lista
			toast.success("Servicio eliminado exitosamente");
			onActionComplete?.(); // Notificar que la acción se completó
		} catch (error) {
			setError("Error al eliminar el servicio: " + error.message);
		}
	};

	const handleServiceEdit = (service) => {
		setSelectedService(service);
		setShowEditForm(true);
	};

	return (
		<main className={`admin-container ${isInAdminLayout ? "in-layout" : ""}`}>
			{/* Mobile section */}
			<div className="mobile-message">
				<img src="/images/warning.png" alt="Warning" className="warning-icon" />
				<span>NO DISPONIBLE PARA MOBILE</span>
			</div>

			{/* Breadcrumbs section - solo se muestra si no está en el layout */}
			{!isInAdminLayout && (
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
			)}

			{error && <div className="error-message">{error}</div>}

			{/* List section */}
			<div className="admin-content">
				<section className="admin-section">
					<div className="admin-header">
						<button
							className="adminService-admin-button"
							onClick={() => setShowAddForm(true)}
						>
							<span>Agregar Producto</span>
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
									setSelectedService(null);
									setError(null);
								}}
								onSubmit={handleAddProduct}
								initialData={selectedService}
							/>
						)}
					</div>

					{showEditForm && selectedService && (
						<EditProductForm
							service={selectedService}
							onClose={() => {
								setShowEditForm(false);
								setSelectedService(null);
							}}
							onSubmit={handleEditService}
						/>
					)}

					<AdminServiceList onEdit={handleServiceEdit} />
				</section>
			</div>
		</main>
	);
};

export default AdminService;
