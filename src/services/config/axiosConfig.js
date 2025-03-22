import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "";

const instance = axios.create({
	baseURL: BASE_URL,
});

// Add a request interceptor to include the token in every request
instance.interceptors.request.use(
	(config) => {
		// Solo mostrar logs en desarrollo
		if (import.meta.env.DEV) {
			console.log("Config:", {
				config,
			});
		}

		// Get the token from localStorage before each request
		const token = localStorage.getItem("token");
		// Solo mostrar logs en desarrollo
		if (import.meta.env.DEV) {
			console.log("Token:", {
				token,
			});
		}

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Only set Content-Type if it's not already set and not a FormData request
		if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
			config.headers['Content-Type'] = 'application/json';
		}

		// Solo mostrar logs en desarrollo
		if (import.meta.env.DEV) {
			console.log("Request:", {
				url: config.url,
				method: config.method,
				contentType: config.headers['Content-Type'],
				// No mostrar headers para proteger datos sensibles
			});
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		// Solo mostrar logs en desarrollo
		if (import.meta.env.DEV) {
			console.log("Response:", response.status);
		}
		return response;
	},
	(error) => {
		// Handle 401 (Unauthorized) or 403 (Forbidden) errors
		if (error.response?.status === 401 || error.response?.status === 403) {
			localStorage.removeItem("token");
			window.location.href = "/";
		}

		// Solo mostrar logs en desarrollo
		if (import.meta.env.DEV) {
			console.error("Error:", {
				status: error.response?.status,
				message: error.message,
			});
		}

		return Promise.reject(error);
	}
);

export default instance;
