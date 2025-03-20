import axios from "axios";
import API_BASE_URL from "../config"; 

// Obtener todos los copagos
export const obtenerCopagos = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/copagos`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener copagos:", error);
        return [];
    }
};

// Generar un nuevo copago
export const generarCopago = async (clienteId, hospitalId, servicioId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/copagos/generar`, {
            clienteId,
            hospitalId,
            servicioId
        });
        return response.data;
    } catch (error) {
        console.error("Error al generar copago:", error);
        throw error;
    }
};

// Confirmar pago del copago
export const pagarCopago = async (id) => {
    try {
        return await axios.put(`${API_BASE_URL}/copagos/pagar/${id}`);
    } catch (error) {
        console.error("Error al procesar el pago:", error);
        throw error;
    }
};
