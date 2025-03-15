import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaPawSolid } from "react-icons/lia";
// Import image icons
import pencilIcon from "../../images/pencil.png";
import trashIcon from "../../images/trash-can.png";

const BASE_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${BASE_URL}/api/usuarios`;

const AdminUserList = ({ onEdit }) => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const { auth, logout } = useContext(AuthContext);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [userToDelete, setUserToDelete] = useState(null);

	const fetchUsers = async () => {
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
			console.log("User data from API:", response.data);

			// Check if we need to transform the role property
			const mappedUsers = response.data.map((user) => {
				// Check if role exists with different property name
				// Common variations: role, userRole, tipo, tipo_usuario, etc.
				const roleValue =
					user.rol ||
					user.role ||
					user.userRole ||
					user.tipo ||
					user.tipo_usuario ||
					user.user_type ||
					"No asignado";

				return {
					...user,
					rol: roleValue, // Ensure the rol property exists
				};
			});

			setUsers(mappedUsers);
		} catch (error) {
			console.error("Error fetching users:", error);
			setError("Error al cargar los usuarios");
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [auth.token]);

	// Make fetchUsers available to parent
	useEffect(() => {
		if (window) {
			window.refreshCategoryList = fetchUsers;
		}
		return () => {
			if (window) {
				delete window.refreshCategoryList;
			}
		};
	}, []);

	// Make fetchUsers available globally with the correct name
	useEffect(() => {
		window.refreshUserList = fetchUsers;
		// Still keep refreshCategoryList for backward compatibility
		window.refreshCategoryList = fetchUsers;

		// Listen for custom refresh events
		const handleCustomRefresh = (event) => {
			if (event.detail && event.detail.users) {
				const mappedUsers = event.detail.users.map((user) => {
					const roleValue =
						user.rol ||
						user.role ||
						user.userRole ||
						user.tipo ||
						user.tipo_usuario ||
						user.user_type ||
						"No asignado";
					return {
						...user,
						rol: roleValue,
					};
				});
				setUsers(mappedUsers);
			} else {
				fetchUsers();
			}
		};

		window.addEventListener("userListRefresh", handleCustomRefresh);

		return () => {
			delete window.refreshUserList;
			delete window.refreshCategoryList;
			window.removeEventListener("userListRefresh", handleCustomRefresh);
		};
	}, [fetchUsers]);

	const openDeleteModal = (user) => {
		setUserToDelete(user);
		setConfirmDelete(true);
	};

	const handleDeleteCancel = () => {
		setConfirmDelete(false);
		setUserToDelete(null);
	};

	const handleDeleteConfirmed = async () => {
		if (!userToDelete) return;
		setDeleteLoading(true);
		try {
			const response = await axios.delete(`${API_URL}/${userToDelete.id}`, {
				headers: {
					Authorization: `Bearer ${auth.token}`,
					"Content-Type": "application/json",
				},
			});

			if (response.status === 204) {
				toast.success("Usuario eliminado exitosamente");
				setUsers(users.filter((u) => u.id !== userToDelete.id));
				setError(null);
			}
		} catch (err) {
			const errorMessage =
				err.response?.status === 403
					? "No tienes permisos para eliminar este usuario"
					: "Error al eliminar el usuario";
			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setDeleteLoading(false);
			setConfirmDelete(false);
			setUserToDelete(null);
		}
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
							<th className="table-header">Rol</th>
							<th className="table-header">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id} className="table-row">
								<td className="table-cell">{user.nombre}</td>
								<td className="table-cell">{user.rol}</td>
								<td className="table-cell">
									<div className="action-buttons">
										<button
											className="icon-button"
											onClick={() => onEdit(user)}
											title="Editar"
										>
											<img
												src={pencilIcon}
												alt="Editar"
												style={{ width: "20px", height: "20px" }}
											/>
										</button>
										<button
											className="icon-button delete"
											onClick={() => openDeleteModal(user)}
											title="Eliminar"
											disabled={deleteLoading}
										>
											<img
												src={trashIcon}
												alt="Eliminar"
												style={{ width: "20px", height: "20px" }}
											/>
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
							¿Estás seguro de querer eliminar al usuario &quot;
							{userToDelete?.nombre}&quot; del listado?
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

AdminUserList.propTypes = {
	onEdit: PropTypes.func.isRequired,
};

export default AdminUserList;
