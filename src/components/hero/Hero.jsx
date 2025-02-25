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
import "../../styles/hero/hero.css";

const Hero = () => {
	return (
		<div className="hero-image">
			<img src="/hero.png" alt="hero" className="hero-image" />
			<div className="hero-slogan">
				<p>¡Ellos merecen lo mejor! </p>
				<p>¡Incluso cuando estás lejos!</p>
				<button>Agenda Ahora</button>
			</div>
		</div>
	);
};

export default Hero;
