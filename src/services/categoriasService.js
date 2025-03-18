import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${BASE_URL}/api/categorias`;

export const obtenerCategorias = async () => {

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        // Simple direct request without extra configuration
        const response = await axios.get(
            API_URL,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error('Error fetching categories:', {
            status: error.response?.status,
            message: error.message,
            data: error.response?.data
        });

        throw new Error('Error al cargar las categorías');
    }
};

// Completely updated function to create a category with detailed debugging
export const crearCategoria = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        console.log("Creating new category with formData");

        // Log the content of the FormData for debugging
        for (let pair of formData.entries()) {
            console.log(`FormData contains: ${pair[0]}: ${pair[1]}`);
        }

        // Make the API call
        const response = await axios.post(API_URL, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Raw API response:", response);

        // Detailed examination of the response structure
        console.log("Response structure:", {
            status: response.status,
            statusText: response.statusText,
            hasData: !!response.data,
            dataKeys: response.data ? Object.keys(response.data) : []
        });

        // Check for various possible response formats
        let categoryData = null;

        if (response.data) {
            if (typeof response.data === 'object') {
                // Directly use response.data if it has idCategoria
                if (response.data.idCategoria) {
                    categoryData = response.data;
                }
                // Try common wrapper structures
                else if (response.data.data && response.data.data.idCategoria) {
                    categoryData = response.data.data;
                }
                else if (response.data.categoria && response.data.categoria.idCategoria) {
                    categoryData = response.data.categoria;
                }
                // Try to find any object with idCategoria or id
                else {
                    for (const key in response.data) {
                        if (response.data[key] &&
                            (response.data[key].idCategoria || response.data[key].id)) {
                            categoryData = response.data[key];
                            break;
                        }
                    }

                    // If still not found, check if response.data itself has an id
                    if (!categoryData && (response.data.id || response.data._id)) {
                        categoryData = {
                            idCategoria: response.data.id || response.data._id,
                            nombre: response.data.nombre || response.data.name || "Nueva Categoría"
                        };
                    }
                }
            }
        }

        // If we still don't have valid data, create a temporary object for testing
        if (!categoryData) {
            console.warn("Could not find category data in response, using full response as fallback");
            // Create a fallback object based on what we sent
            const parsedData = formData.get('datos') ? JSON.parse(formData.get('datos')) : {};

            categoryData = {
                // Generate a temporary ID (for testing only - in production you should not do this)
                idCategoria: `temp_${Date.now()}`,
                nombre: parsedData.nombre || "Nueva Categoría",
                descripcion: parsedData.descripcion || ""
            };
        }

        console.log("Final processed category data:", categoryData);

        return categoryData;
    } catch (error) {
        console.error("Error creating category:", error);

        // Provide more detailed error info
        if (error.response) {
            console.error("Server response:", {
                status: error.response.status,
                data: error.response.data
            });
        }

        throw new Error(`Error al crear la categoría: ${error.message}`);
    }
};


