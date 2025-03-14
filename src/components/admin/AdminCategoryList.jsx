import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaPawSolid } from "react-icons/lia";

const BASE_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${BASE_URL}/api/categorias`;

const AdminCategoryList = ({ onEdit }) => {
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);
	const { auth, logout } = useContext(AuthContext);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [categoryToDelete, setCategoryToDelete] = useState(null);

	const fetchCategories = async () => {
		if (!auth || !auth.token) {
			logout();
			return;
		}

		try {
			const response = await axios.get(API_URL, {
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			});
			setCategories(response.data);
		} catch {
			setError("Error al cargar las categorías");
		}
	};

	useEffect(() => {
		fetchCategories();
	}, [auth.token]);

	// Make fetchCategories available to parent
	useEffect(() => {
		if (window) {
			window.refreshCategoryList = fetchCategories;
		}
		return () => {
			if (window) {
				delete window.refreshCategoryList;
			}
		};
	}, []);

	// Make fetchCategories available globally
	useEffect(() => {
		window.refreshCategoryList = fetchCategories;
		return () => {
			delete window.refreshCategoryList;
		};
	}, [fetchCategories]); // Add fetchCategories as dependency

	const openDeleteModal = (category) => {
		setCategoryToDelete(category);
		setConfirmDelete(true);
	};

	const handleDeleteConfirmed = async () => {
		if (!categoryToDelete) return;
		setDeleteLoading(true);
		try {
			console.log("Deleting category:", categoryToDelete); // Debug log
			const response = await axios.delete(
				`${API_URL}/${categoryToDelete.idCategoria}`, // Changed from .id to .idCategoria
				{
					headers: {
						Authorization: `Bearer ${auth.token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 204) {
				toast.success("Categoría eliminada exitosamente", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});

				setCategories(
					categories.filter(
						(c) => c.idCategoria !== categoryToDelete.idCategoria
					)
				); // Changed from .id to .idCategoria
				setError(null);
			}
		} catch (err) {
			console.error("Delete error:", err); // Debug log
			const errorMessage =
				err.response?.status === 403
					? "No tienes permisos para eliminar esta categoría"
					: "Error al eliminar la categoría";
			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setDeleteLoading(false);
			setConfirmDelete(false);
			setCategoryToDelete(null);
		}
	};

	const handleDeleteCancel = () => {
		setConfirmDelete(false);
		setCategoryToDelete(null);
	};

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<div className="admin-list">
				{error && <div className="error-message">{error}</div>}
				<table className="admin-table">
					<thead>
						<tr>
							<th className="table-header">Nombre</th>
							<th className="table-header">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{categories.map((category) => (
							<tr key={category.idCategoria} className="table-row">
								{" "}
								{/* Changed from .id to .idCategoria */}
								<td className="table-cell">{category.nombre}</td>
								<td className="table-cell">
									<div className="action-buttons">
										<button
											className="icon-button"
											onClick={() => onEdit(category)}
											title="Editar"
										>
											<svg
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
												<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
											</svg>
										</button>
										<button
											className="icon-button delete"
											onClick={() => openDeleteModal(category)}
											title="Eliminar"
											disabled={deleteLoading}
										>
											<svg
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path d="M3 6h18" />
												<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
												<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
											</svg>
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{confirmDelete && (
				<div className="modal-overlay">
					<div className="modal-container">
						<LiaPawSolid className="modal-icon" />
						<p>
							¿Estás seguro de querer eliminar la categoría &quot;
							{categoryToDelete?.nombre}&quot; del listado?
						</p>
						<div className="modal-buttons">
							<button
								className="modal-button cancel"
								onClick={handleDeleteCancel}
								disabled={deleteLoading}
							>
								Cancelar
							</button>
							<button
								className="modal-button confirm"
								onClick={handleDeleteConfirmed}
								disabled={deleteLoading}
							>
								Aceptar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

AdminCategoryList.propTypes = {
	onEdit: PropTypes.func.isRequired,
};

export default AdminCategoryList;
