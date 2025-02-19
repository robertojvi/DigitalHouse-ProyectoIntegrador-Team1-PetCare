// Language: JavaScript (React)
/**
 * Top navigation bar component
 * Features:
 * - Company tagline with home link
 * - User authentication buttons
 * - User icon display
 * - Responsive design for different screen sizes
 */
import { Link } from "react-router-dom";
import "../../styles/header/topBar.css";
import userIcon from "../../images/user.png";

const TopBar = () => {
	return (
		<div className="top-bar">
			<Link to="/" className="top-bar-text">
				La mejor compañia para tu mejor amigo
			</Link>
			<div className="top-bar-buttons">
				<img src={userIcon} alt="User icon" className="user-icon" />
				<button>Crear cuenta</button>
				<p>/</p>
				<button>Iniciar sesión</button>
			</div>
		</div>
	);
};

export default TopBar;
