import axios from "axios";
import API_BASE_URL from "../config"; 

export const getRoles = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/roles`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener roles:", error);
        return [];
    }
};
