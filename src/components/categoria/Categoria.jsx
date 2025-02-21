/**
 * Hero component with hero link
 * Features:
 * - Clickable logo image
 * - Links to hero page
 * - Hover effect with shadow
 * - Responsive image sizing
 */

// Rect
import { Link } from "react-router-dom";

// Styles
import "../../styles/categoria/categoria.css";

const Categoria = ({nombre, image}) => {
	return (
		<div className="category-card">
			<img src={image} alt="category"/>
			<button>{nombre}</button>
		</div>
	);
};

export default Categoria;
