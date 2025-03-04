import axiosInstance from "./config/axiosConfig";

const API_URL = "http://localhost:8080/api/servicios";

export const crearServicio = async (servicioData) => {
	try {
		if (
			!servicioData.name ||
			!servicioData.price ||
			!servicioData.description ||
			!servicioData.category
		) {
			throw new Error("Faltan campos requeridos");
		}

		const formData = new FormData();

		// Create the datos JSON object
		const datos = {
			nombre: servicioData.name.trim(),
			descripcion: servicioData.description.trim(),
			precio: Number(servicioData.price),
			categoria: {
				id_categoria: parseInt(servicioData.category),
				nombre: servicioData.categoryName,
			},
		};

		// Append the JSON data as a string
		formData.append("datos", JSON.stringify(datos));

		// Append each image file
		servicioData.images.forEach((image) => {
			formData.append("imagenes", image.file);
		});

		console.log(formData);

		const response = await axiosInstance.post(
			`${API_URL}/servicio`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return response.data; // This will be the array of image URLs
	} catch (error) {
		if (error.response) {
			throw new Error(
				error.response.data.message || "Error del servidor"
			);
		} else if (error.request) {
			throw new Error("No se pudo conectar con el servidor");
		} else {
			throw error;
		}
	}
};
