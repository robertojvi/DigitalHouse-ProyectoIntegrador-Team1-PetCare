import axiosInstance from './config/axiosConfig';

const API_URL = 'http://localhost:8080/api/servicios';

export const crearServicio = async (servicioData) => {
    try {
        if (!servicioData.name || !servicioData.price || !servicioData.description) {
            throw new Error('Faltan campos requeridos');
        }

        const formData = new FormData();

        // Add text data
        formData.append('nombre', servicioData.name.trim());
        formData.append('descripcion', servicioData.description.trim());
        formData.append('precio', Number(servicioData.price));

        // Add images
        servicioData.images.forEach(image => {
            formData.append('imagenes', image.file);
        });

        // Add other required fields
        formData.append('disponibilidad', true);
        formData.append('establecimiento', JSON.stringify({
            idEstablecimiento: 2,
            nombre: "PetCare Services",
            direccion: "Calle de los Animales 456, Ciudad",
            telefono: "+593987654321"
        }));

        const response = await axiosInstance.post(`${API_URL}/servicio`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error del servidor');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw error;
        }
    }
};
