import axios from "axios";
import API_BASE_URL from "../config"; 

const CITAS_API = `${API_BASE_URL}/citas`;

//  Obtener todas las citas
export const obtenerCitas = async () => {
    try {
        const response = await axios.get(CITAS_API);
        return response.data;
    } catch (error) {
        console.error("Error al obtener citas:", error.response?.data || error.message);
        return [];
    }
};

// Obtener una cita por ID
export const obtenerCitaPorId = async (id) => {
    try {
        const response = await axios.get(`${CITAS_API}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la cita con ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

//  Agendar una nueva cita
export const agendarCita = async (citaData) => {
    try {
        const response = await axios.post(CITAS_API, citaData);
        return response.data;
    } catch (error) {
        console.error("Error al agendar cita:", error.response?.data || error.message);
        throw error;
    }
};

//  Actualizar una cita (cambiar estado, asignar autorización, etc.)
export const actualizarCita = async (id, citaData) => {
    try {
        const response = await axios.put(`${CITAS_API}/${id}`, citaData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar la cita con ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Eliminar una cita
export const eliminarCita = async (id) => {
    try {
        const response = await axios.delete(`${CITAS_API}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar la cita con ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};


