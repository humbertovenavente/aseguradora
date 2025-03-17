import axios from "axios";
import API_BASE_URL from "../config"; 

// Obtener todos los usuarios
export const getUsuarios = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/usuarios`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
};

// Asignar rol y activar usuario
export const asignarRol = async (id, rol_id) => {
    try {
        return await axios.put(`${API_BASE_URL}/usuarios/asignar-rol/${id}`, { rol_id });
    } catch (error) {
        console.error("Error al asignar rol:", error);
        throw error;
    }
};

// Desactivar usuario
export const desactivarUsuario = async (id) => {
    try {
        return await axios.put(`${API_BASE_URL}/usuarios/desactivar/${id}`);
    } catch (error) {
        console.error("Error al desactivar usuario:", error);
        throw error;
    }
};
