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

// Styles
import "../../styles/header/menu.css";

const Menu = () => {
	return (
		<nav className="menu">
			<ul>
				<li>
					<LiaPawSolid className="paw-icon" />
					Cuidadores
				</li>
				<li>
					<LiaPawSolid className="paw-icon" />
					Instalaciones
				</li>
				<li>
					<LiaPawSolid className="paw-icon" />
					Nosotros
				</li>
				<li>
					<LiaPawSolid className="paw-icon" />
					Contacto
				</li>
			</ul>
		</nav>
	);
};

export default Menu;
