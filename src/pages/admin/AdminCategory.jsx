import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import "../../styles/admin/adminService.css";

// Components
import AdminCategoryList from "../../components/admin/AdminCategoryList";
import AddCategoryForm from "../../components/forms/AddCategoryForm";
import EditCategoryForm from "../../components/forms/EditCategoryForm";

// Images
import warningIcon from "../../images/warning.png";
import addPlusIcon from "../../images/add-plus.png";

const AdminCategory = ({ isInAdminLayout }) => {
	const [showAddForm, setShowAddForm] = useState(false);
	const [error, setError] = useState(null);
	const { auth, logout } = useContext(AuthContext);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [showEditForm, setShowEditForm] = useState(false);

	const getAuthHeaders = () => {
		if (!auth || !auth.token) return null;
		return {
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		};
	};

	const handleAddCategory = async (categoryData) => {
		const headers = getAuthHeaders();
		if (!headers) {
			logout();
			return;
		}

		try {
			await axios.post(
				"http://localhost:8080/api/categorias",
				categoryData,
				headers
			);
			setShowAddForm(false);
			alert("Categoría creada exitosamente");
		} catch (error) {
			console.error("Error creating category:", error);
			setError("Error al crear la categoría: " + error.message);
		}
	};

	const handleEditCategory = async (categoryData) => {
		const headers = getAuthHeaders();
		if (!headers) {
			logout();
			return;
		}

		try {
			await axios.put(
				`http://localhost:8080/api/categorias/${categoryData.id}`,
				categoryData,
				headers
			);
			setShowEditForm(false);
			setSelectedCategory(null);
			alert("Categoría actualizada exitosamente");
		} catch (error) {
			setError("Error al actualizar la categoría: " + error.message);
		}
	};

	const handleCategoryEdit = (category) => {
		setSelectedCategory(category);
		setShowEditForm(true);
	};

	return (
		<main className={`admin-container ${isInAdminLayout ? "in-layout" : ""}`}>
			<div className="mobile-message">
				<img src={warningIcon} alt="Warning" className="warning-icon" />
				<span>NO DISPONIBLE PARA MOBILE</span>
			</div>

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
					<span className="breadcrumb-current">Categorías</span>
				</div>
			)}

			{error && <div className="error-message">{error}</div>}

			<div className="admin-content">
				<section className="admin-section">
					<div className="admin-header">
						<button
							className="adminService-admin-button"
							onClick={() => setShowAddForm(true)}
						>
							<span>Agregar Categoría</span>
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
					</div>

					{showAddForm && (
						<AddCategoryForm
							onClose={() => setShowAddForm(false)}
							onSubmit={handleAddCategory}
						/>
					)}

					{showEditForm && selectedCategory && (
						<EditCategoryForm
							category={selectedCategory}
							onClose={() => {
								setShowEditForm(false);
								setSelectedCategory(null);
							}}
							onSubmit={handleEditCategory}
						/>
					)}

					<AdminCategoryList onEdit={handleCategoryEdit} />
				</section>
			</div>
		</main>
	);
};

export default AdminCategory;
