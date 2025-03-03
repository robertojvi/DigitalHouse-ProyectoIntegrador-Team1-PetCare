import axios from 'axios';

export const obtenerCategorias = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        // Add logging to debug the token
        console.log('Using token:', token);

        const config = {
            method: 'get',
            url: 'http://localhost:8080/api/categorias',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        // Log the request configuration
        console.log('Request config:', config);

        const response = await axios(config);

        // Log the response
        console.log('API Response:', response);

        if (!response.data) {
            throw new Error('No data received from the API');
        }

        return response.data;
    } catch (error) {
        // Enhanced error logging
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });

        if (error.response?.status === 401) {
            throw new Error('Token de autenticación inválido o expirado');
        }

        if (error.response?.status === 403) {
            throw new Error('No tiene permisos para acceder a este recurso');
        }

        throw new Error(error.response?.data?.message || 'Error al cargar las categorías');
    }
};


