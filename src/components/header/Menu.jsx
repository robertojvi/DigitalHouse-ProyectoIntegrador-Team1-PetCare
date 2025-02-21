/**
 * Navigation menu component
 * Features:
 * - List of navigation links
 * - Paw icons from react-icons/lia
 * - Responsive design (collapses to hamburger menu)
 * - Hover effects on menu items
 */

// React
import { LiaPawSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

// Styles
import "../../styles/header/menu.css";

const Menu = () => {
	return (
		<nav className="menu">
			<ul className="menu-list">
				<li>
					<Link to="/cuidadores">
						<LiaPawSolid className="paw-icon" />
						Cuidadores
					</Link>
				</li>
				<li>
					<Link to="/instalaciones">
						<LiaPawSolid className="paw-icon" />
						Instalaciones
					</Link>
				</li>
				<li>
					<Link to="/asesorias">
						<LiaPawSolid className="paw-icon" />
						Asesorías
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Menu;
