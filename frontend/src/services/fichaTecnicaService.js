import axios from "axios";
import API_BASE_URL from "../config";

// Obtener todas las fichas técnicas
export const getFichasTecnicas = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/fichatecnica`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener fichas técnicas:", error);
        return [];
    }
};

//  Obtener ficha técnica por ID
export const getFichaTecnicaById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/fichatecnica/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener ficha técnica:", error);
        return null;
    }
};

//  Crear nueva ficha técnica (Asegúrate de que esta función exista)
export const crearFichaTecnica = async (ficha) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/fichatecnica`, ficha);
        return response.data;
    } catch (error) {
        console.error("Error al crear ficha técnica:", error);
        throw error;
    }
};

// Actualizar ficha técnica
export const updateFichaTecnica = async (id, fichaData) => {
    try {
        return await axios.put(`${API_BASE_URL}/fichatecnica/${id}`, fichaData);
    } catch (error) {
        console.error("Error al actualizar ficha técnica:", error);
        throw error;
    }
};

// Eliminar ficha técnica
export const deleteFichaTecnica = async (id) => {
    try {
        return await axios.delete(`${API_BASE_URL}/fichatecnica/${id}`);
    } catch (error) {
        console.error("Error al eliminar ficha técnica:", error);
        throw error;
    }
};

// agregar servicios
export const agregarHistorialServicio = async (fichaId, nuevoServicio) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/fichatecnica/historial/${fichaId}`, nuevoServicio);
        return response.data;
    } catch (error) {
        console.error("Error al agregar historial de servicio:", error);
        throw error;
    }
};

