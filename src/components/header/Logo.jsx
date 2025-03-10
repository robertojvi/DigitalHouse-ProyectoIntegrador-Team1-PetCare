/**
 * Logo component with home link
 * Features:
 * - Clickable logo image
 * - Links to home page
 * - Hover effect with shadow
 * - Responsive image sizing
 */

// Rect
import { Link } from "react-router-dom";

// Styles
import "../../styles/header/logo.css";

const Logo = () => {
	return (
		<Link to="/" className="logo">
			<img src="/images/pet-care-logo-v2.png" alt="pet care logo" />
		</Link>
	);
};

export default Logo;
