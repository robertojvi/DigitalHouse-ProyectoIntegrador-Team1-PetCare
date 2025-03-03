import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2JlcnRvanZpQGdtYWlsLmNvbSIsImlhdCI6MTc0MDk2ODgyMSwiZXhwIjoxNzQxMDU1MjIxfQ.JnUcPjUokUoE6a6O5RVt1KqdqQoz3wuiYWy9Q3i9vzU';

export const obtenerCategorias = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/categorias", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching categories", error);
        throw error;
    }
};


