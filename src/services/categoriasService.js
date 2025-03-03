import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categorias';

export const obtenerCategorias = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener categorías:', error.response?.data || error.message);
        throw error;
    }
};
