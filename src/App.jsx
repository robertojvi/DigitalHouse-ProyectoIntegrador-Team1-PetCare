// Imports
// React
import { Routes, Route } from "react-router-dom";
// Styles
import "./styles/app.css";

// Ruta padre
import Layout from "./layouts/Layout";

// Rutas hijas
import Home from "./pages/Home";
// import Contact from "./Pages/Contact";
// import Detail from "./Pages/Detail";
// import Favs from "./Pages/Favs";

/**
 * Main application component that handles routing
 * Uses React Router for navigation
 * Layout component serves as the parent route
 * Home component is the default landing page
 * Includes 404 error handling for invalid routes
 */
function App() {
	return (
		// <>
		<Routes>
			{/* Padre de las rutas anidadas */}
			<Route path="/" element={<Layout />}>
				{/* Rutas anidadas hijas */}
				<Route path="/" element={<Home />} />
				{/* <Route path="/contact" element={<Contact />} />
				<Route path="/dentist/:id" element={<Detail />} />
				<Route path="/favs" element={<Favs />} /> */}
				<Route
					path="*"
					element={
						// <h1 style="padding-top: 30vh;">
						<h1 className="mainContainer">
							Page not found - Error 404
						</h1>
					}
				/>
			</Route>
		</Routes>
		// </>
	);
}

export default App;
