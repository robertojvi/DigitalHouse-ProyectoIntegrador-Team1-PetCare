// React
import { Routes, Route } from "react-router-dom";
// Styles
import "./styles/common/app.css";

// Components
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import AddProductForm from "./components/admin/AddProductForm";
import ServiceDetail from "./pages/ServiceDetail";
import ServiceGallery from "./pages/ServiceGallery";
import { AuthProvider } from "./auth/AuthContext";
import { GlobalStyles } from './styles/GlobalStyles';
/**
 * Main application component that handles routing
 * Uses React Router for navigation
 * Layout component serves as the parent route
 * Home component is the default landing page
 * Includes 404 error handling for invalid routes
 */
function App() {
	return (
		<AuthProvider>
			<GlobalStyles />
			<Routes>
				{/* Padre de las rutas anidadas */}
				<Route path="/" element={<Layout />}>
					{/* Rutas anidadas hijas */}
					<Route path="/" element={<Home />} />
					<Route
						path="/administracion"
						element={<AddProductForm />}
					/>
					<Route path="/service/:id" element={<ServiceDetail />} />
					<Route path="/gallery" element={<ServiceGallery />} />

					{/* <Route path="/contact" element={<Contact />} />
                    <Route path="/dentist/:id" element={<Detail />} />
                    <Route path="/favs" element={<Favs />} /> */}

					<Route
						path="*"
						element={
							<h1 className="mainContainer">
								Page not found - Error 404
							</h1>
						}
					/>
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default App;
