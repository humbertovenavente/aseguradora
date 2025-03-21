import axios from "axios";
import API_BASE_URL from "../config"; 

// 🔍 Obtener todos los copagos
export const obtenerCopagos = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/copagos`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener copagos:", error);
        return [];
    }
};

// ✅ Confirmar pago de un copago
export const pagarCopago = async (id) => {
    try {
        return await axios.put(`${API_BASE_URL}/copagos/pagar/${id}`);
    } catch (error) {
        console.error("Error al procesar el pago:", error);
        throw error;
    }
};
