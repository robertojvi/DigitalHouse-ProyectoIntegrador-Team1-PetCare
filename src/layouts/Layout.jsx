/**
 * Layout component that provides the main structure
 * Contains Header component and Outlet for nested routes
 * Future implementation planned for Footer component
 * Wraps all page content within a common structure
 */

// Imports
// React
import { Outlet } from "react-router-dom";

// Componentes
import Header from "../components/header/Header";
import Footer from "../components/Footer";

const Layout = () => {
	return (
		<div className="">
			{/* Renderiza tanto el(los) componente(s) (Navbar y Footer) como la ruta (Oulet) */}
			{/* <Header /> */}
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;
