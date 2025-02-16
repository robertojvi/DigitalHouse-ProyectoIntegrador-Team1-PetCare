// Imports
// React
import { Outlet } from "react-router-dom";

// Componentes
// import Navbar from "../Components/Header";
// import Footer from "../Components/Footer";

const Layout = () => {
	return (
		<div className="">
			{/* Renderiza tanto el(los) componente(s) (Navbar y Footer) como la ruta (Oulet) */}
			{/* <Header /> */}
			<Outlet />
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;
