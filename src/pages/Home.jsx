// Styles
// import "../styles/home.css";
import { RecommendedServices } from "../components/RecommendedServices";
import Categoria from "../components/categoria/Categoria";
import "../styles/home/home.css";
import { TitleComponent } from "../components/shared/TitleComponent";
import WhatsAppButton from "../components/shared/WhatsAppComponent";
import { SearchComponent } from "../components/shared/SearchComponent";
import { ServicesFilter } from "../components/ServicesFilter";
import { useState } from "react";
import { Pagination } from "../components/Pagination";

/**
 * Home Page Component
 *
 * Features:
 * - Main landing page of the application
 * - Contains sample content with text and images
 * - Uses CSS Grid/Flexbox for layout
 * - Responsive design for all screen sizes
 * - Optimized image loading with width/height attributes
 *
 * Structure:
 * - Main container with className="mainContainer"
 * - Page heading (h1)
 * - Content section with className="home-content"
 * - Multiple paragraphs of text
 * - Responsive images with className="pet-image"
 *
 * Styling:
 * - Uses home.css for component specific styles
 * - Responsive images with fixed dimensions (200x100)
 * - Maintains consistent spacing between elements
 * - Proper semantic HTML structure
 *
 * Image Sources:
 * - Uses Unsplash API for sample pet images
 * - Two alternating images (puppy and kitten)
 * - Alt text provided for accessibility
 *
 * Props:
 * - None
 *
 * State:
 * - None (stateless component)
 *
 * Example Usage:
 * ```jsx
 * <Route path="/" element={<Home />} />
 * ```
 *
 * Related Files:
 * - /src/styles/home.css - Component styles
 * - /src/routes/index.jsx - Route configuration
 */

const categorias = [
	{ id: 1, nombre: "Cuidado en casa", image: "/categoria1.png" },
	{ id: 2, nombre: "Cuidado en instalaciones", image: "/categoria2.png" },
	{ id: 3, nombre: "Asesoria personalizada", image: "/categoria3.png" },
];

const Home = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const totalItems = 20; // Actualizar este número según la cantidad total de servicios

	return (
		<>
			<main className="mainContainer">
				<SearchComponent />
				<div style={{ border: "1px solid #000000", padding: "30px 50px" }}>
					<ServicesFilter />
				</div>

				<div style={{ marginTop: "22px" }}>
					<RecommendedServices
						currentPage={currentPage}
						itemsPerPage={itemsPerPage}
					/>
					<Pagination
						totalItems={totalItems}
						itemsPerPage={itemsPerPage}
						currentPage={currentPage}
						onPageChange={setCurrentPage}
					/>
				</div>
			</main>
		</>
	);
};

export default Home;
