// React
import { useState, useEffect, useContext } from "react";
import axios from "axios";

// Components
import { AuthContext } from "../../auth/AuthContext";

// Styles
import "../../styles/admin/adminServiceList.css";

// Images
import pencilIcon from "../../images/pencil.png";
import trashIcon from "../../images/trash-can.png";

const AdminServiceList = () => {
	const { auth } = useContext(AuthContext);
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [deleteLoading, setDeleteLoading] = useState(false);

	useEffect(() => {
		fetchServices();
	}, []);

	const fetchServices = async () => {
		console.log("Token:" + auth.token);
		console.log("Role:" + auth.role);

		if (!auth.token || auth.role !== "ADMIN") {
			setError("No tienes permisos para acceder a esta información");
			setLoading(false);
			return;
		}

		try {
			const response = await axios.get(
				"http://localhost:8080/api/servicios",
				{
					headers: {
						Authorization: `Bearer ${auth.token}`,
						"Content-Type": "application/json",
					},
				}
			);

			console.log("Servicios desde la base de datos:");
			console.log(response.data);
			setServices(response.data);
			setError(null);
		} catch (err) {
			const errorMessage =
				err.response?.status === 403
					? "No tienes permisos para acceder a esta información"
					: "Error al cargar los servicios";
			setError(errorMessage);
			console.error("Error fetching services:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (item) => {
		console.log("Editando servicio:", item);
	};

	const handleDelete = async (service) => {
		if (
			!window.confirm(
				`¿Está seguro de eliminar el servicio "${service.nombre}"?`
			)
		) {
			return;
		}

		setDeleteLoading(true);
		try {
			await axios.delete(
				`http://localhost:8080/api/servicios/${service.idServicio}`,
				{
					headers: {
						Authorization: `Bearer ${auth.token}`,
						"Content-Type": "application/json",
					},
				}
			);

			// Actualizar la lista de servicios después de eliminar
			setServices(
				services.filter((s) => s.idServicio !== service.idServicio)
			);
			setError(null);
		} catch (err) {
			const errorMessage =
				err.response?.status === 403
					? "No tienes permisos para eliminar este servicio"
					: "Error al eliminar el servicio";
			setError(errorMessage);
			console.error("Error deleting service:", err);
		} finally {
			setDeleteLoading(false);
		}
	};

	if (loading)
		return <div className="loading-message">Cargando servicios...</div>;
	if (error) return <div className="error-message">Error: {error}</div>;

	return (
		<div className="admin-table-container">
			<table className="admin-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre / Servicio</th>
						<th>Categoría</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{services.map((service) => (
						<tr key={service.idServicio}>
							<td>{service.idServicio}</td>
							<td>{service.nombre}</td>
							<td>{service.categoria.nombre}</td>
							<td>
								<button
									className="icon-button"
									onClick={() => handleEdit(service)}
									disabled={deleteLoading}
								>
									<img
										src={pencilIcon}
										alt="Editar servicio"
									/>
								</button>
								<button
									className="icon-button"
									onClick={() => handleDelete(service)}
									disabled={deleteLoading}
								>
									<img
										src={trashIcon}
										alt="Eliminar servicio"
									/>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminServiceList;
