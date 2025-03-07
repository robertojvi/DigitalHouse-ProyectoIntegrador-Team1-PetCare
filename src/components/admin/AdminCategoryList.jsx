import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import PropTypes from "prop-types";

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
		} catch {
			setError("Error al cargar las categorías");
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
										title="Eliminar"
										disabled
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
	);
};
AdminCategoryList.propTypes = {
	onEdit: PropTypes.func.isRequired,
};

export default AdminCategoryList;
