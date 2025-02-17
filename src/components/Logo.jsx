// Rect
import { Link } from "react-router-dom";

// Styles
import "../styles/header.css";

const Logo = () => {
	return (
		<Link to="/" className="logo">
			<img src="/src/images/pet-care-logo-v2.png" alt="pet care logo" />
		</Link>
	);
};

export default Logo;
