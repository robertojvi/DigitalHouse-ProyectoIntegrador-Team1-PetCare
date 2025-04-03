import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { TitleComponent } from "../shared/TitleComponent";
import { GridComponent } from "../GridComponent";
import { AuthContext } from "../../auth/AuthContext";
import { getServices } from "../../services/serviciosService";
import axios from "axios";

export const ServicesFeatured = ({ services = [] }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [randomizedServices, setRandomizedServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const firstRender = useRef(true);
	const {idCategoria, setFavoritos, auth, favoritos} = useContext(AuthContext);
	const BASE_URL = import.meta.env.VITE_API_URL || "";
	const API_URL_GET_USER = `${BASE_URL}/api/usuarios`;
	// Store previous location to detect back navigation
	useEffect(() => {
		// On component mount, check if we're coming back (this will run once)
		const checkBackNavigation = () => {
			// Check if we're coming back from a service detail page
			const prevPath = sessionStorage.getItem("previousPath");
			const currentPath = location.pathname;
			const isReturningFromDetail =
				prevPath && prevPath.includes("/service/") && currentPath === "/";

			console.log("Navigation check:", {
				prevPath,
				currentPath,
				isReturningFromDetail,
			});

			// If we're coming back from service detail, return true
			return isReturningFromDetail;
		};

		// If this is first render, check for back navigation
		if (firstRender.current) {
			const isBack = checkBackNavigation();
			firstRender.current = false;

			// Set current path as previous for next navigation
			sessionStorage.setItem("previousPath", location.pathname);

			// If coming back, load stored services
			if (isBack) {
				const storedServices = sessionStorage.getItem("randomizedServices");
				if (storedServices) {
					try {
						const parsedServices = JSON.parse(storedServices);
						console.log(
							"Using stored services from back navigation",
							parsedServices.length
						);
						setRandomizedServices(parsedServices);
						setLoading(false);
					} catch (error) {
						console.error("Error parsing stored services:", error);
					}
				}
			} else {
				// Not coming back, need to randomize
				randomizeServices();
			}
		}
	}, [location]);

	const fetchFavoritos = async () => {
		const responseUsuario = await axios.get(`${API_URL_GET_USER}/${auth.idUsuario}`, {
			headers: {
				Authorization: `Bearer ${auth.token}`
			}
		});		
		setFavoritos(responseUsuario.data.favoritos);
	}

	// Handle service randomization
	const randomizeServices = async () => {
		try {
			setLoading(true);

			// Use provided services or fetch them
			let servicesToUse = [];
			if (!services || services.length === 0 || !idCategoria) {
				if(sessionStorage.getItem("services")){
					servicesToUse = JSON.parse(sessionStorage.getItem("services"))
				} else {
					servicesToUse = await getServices();
				}	
			}

			let servicesStoraged = (sessionStorage.getItem("servicesFiltered") && sessionStorage.getItem("servicesFiltered").length > 0) && JSON.parse(sessionStorage.getItem("servicesFiltered"));
			servicesToUse = servicesStoraged && servicesStoraged.length > 0 ? servicesStoraged : (services.length>0 ? services : servicesToUse);
			

			if (servicesToUse && servicesToUse.length > 0) {
				// Create a copy of the services array
				const servicesCopy = [...servicesToUse];

				// Fisher-Yates shuffle
				for (let i = servicesCopy.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[servicesCopy[i], servicesCopy[j]] = [
						servicesCopy[j],
						servicesCopy[i],
					];
				}

				console.log("Services randomized successfully");
				setRandomizedServices(servicesCopy);

				// Save randomized services for back navigation
				sessionStorage.setItem(
					"randomizedServices",
					JSON.stringify(servicesCopy)
				);
			} else {
				setRandomizedServices([]);
			}

			setLoading(false);
		} catch (error) {
			console.error("Error in randomizeServices:", error);
			setRandomizedServices(services);
			setLoading(false);
		}
	};

	// Update services when they change, but only if not from back navigation
	useEffect(() => {
		if (!firstRender.current && services.length > 0) {
			// Only randomize if we're not on the first render
			// First render is handled by the location effect above
			console.log("Services changed, re-randomizing");
			randomizeServices();		
		}		
			idCategoria && randomizeServices();	
			fetchFavoritos();
	}, [services, idCategoria]);

	const handleServiceClick = (service) => {
		// Before navigating to service detail, store the current path
		sessionStorage.setItem("previousPath", location.pathname);

		// Store current services before navigating
		if (randomizedServices.length > 0) {
			console.log(
				"Storing services before navigation",
				randomizedServices.length
			);
			sessionStorage.setItem(
				"randomizedServices",
				JSON.stringify(randomizedServices)
			);
		}

		// Navigate to service detail
		navigate(`/service/${service.idServicio}`, {
			state: { selectedService: service },
		});
		window.scrollTo(0, 0);
	};

	// Use randomized services if available, otherwise use provided services
	const servicesToShow =
		randomizedServices.length > 0 ? randomizedServices : services;

	return (
		<div>
			<TitleComponent title={"Recomendados"} />
			{loading ? (
				<div>Cargando servicios recomendados...</div>
			) : (
				<GridComponent
					onServiceClick={handleServiceClick}
					services={servicesToShow}
				/>
			)}
		</div>
	);
};
