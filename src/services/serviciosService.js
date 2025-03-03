import axios from 'axios';

const API_URL = 'http://localhost:8080/api/servicios';

export const crearServicio = async (servicioData) => {
    try {
        // Validar datos antes de enviar
        if (!servicioData.name || !servicioData.price || !servicioData.description) {
            throw new Error('Faltan campos requeridos');
        }

        const payload = {
            nombre: servicioData.name.trim(),
            descripcion: servicioData.description.trim(),
            precio: Number(servicioData.price),
            imagenUrl: servicioData.image.trim(),
            disponibilidad: true,
            fechaRegistro: new Date().toISOString(),
            fechaActualizacion: new Date().toISOString(),
            esBorrado: false,
            fechaBorrado: null,
            detallePedidos: [],
            establecimiento: {
                idEstablecimiento: 2,
                nombre: "PetCare Services",
                direccion: "Calle de los Animales 456, Ciudad",
                telefono: "+593987654321"
            },
            usuariosQueLoMarcaron: []
        };

        const headers = {
            'Content-Type': 'application/json',
            // Agregar headers de autorización si son necesarios
            // 'Authorization': `Bearer ${token}`
        };

        const response = await axios.post(`${API_URL}/servicio`, payload, { headers });
        return response.data;
    } catch (error) {
        if (error.response) {
            // Error de respuesta del servidor
            throw new Error(error.response.data.message || 'Error del servidor');
        } else if (error.request) {
            // Error de conexión
            throw new Error('No se pudo conectar con el servidor');
        } else {
            // Otros errores
            throw error;
        }
    }
};
