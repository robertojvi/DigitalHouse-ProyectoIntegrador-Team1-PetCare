import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";

const AdminCategoryList = ({ onEdit }) => {
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);
	const { auth, logout } = useContext(AuthContext);

	const fetchCategories = async () => {
		if (!auth || !auth.token) {
			logout();
			return;
		}

		try {
			const response = await axios.get("http://localhost:8080/api/categorias", {
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			});
			setCategories(response.data);
		} catch (error) {
			setError("Error al cargar las categorías");
		}
	};

	const handleDelete = async (id) => {
		if (
			window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")
		) {
			try {
				await axios.delete(`http://localhost:8080/api/categorias/${id}`, {
					headers: {
						Authorization: `Bearer ${auth.token}`,
					},
				});
				fetchCategories(); // Recargar la lista
			} catch (error) {
				setError("Error al eliminar la categoría");
			}
		}
	};

	useEffect(() => {
		fetchCategories();
	}, [auth.token]);

	return (
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
						<tr key={category.id} className="table-row">
							<td className="table-cell">{category.nombre}</td>
							<td className="table-cell">
								<div className="action-buttons">
									<button
										className="admin-button"
										onClick={() => onEdit(category)}
									>
										Editar
									</button>
									<button
										className="admin-button"
										onClick={() => handleDelete(category.id)}
									>
										Eliminar
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminCategoryList;
