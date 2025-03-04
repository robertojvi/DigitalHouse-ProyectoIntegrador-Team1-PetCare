// React
import { Link } from "react-router-dom";

// Components
import AdminServiceList from "../../components/admin/AdminServiceList";

// Styles
import "../../styles/admin/adminService.css";

// Images
import warningIcon from "../../images/warning.png";

const AdminService = () => {
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

			{/* List section */}
			<div className="admin-content">
				<section className="admin-section">
					<div className="admin-header">
						<button className="adminService-admin-button">
							Añadir Productos
						</button>
					</div>

					<AdminServiceList />
				</section>
			</div>
		</main>
	);
};

export default AdminService;
