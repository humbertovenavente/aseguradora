// src/services/citaSolicitud.js
import axios from "axios";

// IP pública del backend hospitalario
const HOSPITAL_API = "http://137.184.71.127:8080/citas/externa";

/**
 * Envía una cita confirmada al sistema del hospital
 * @param {Object} payload - Datos de la cita a enviar
 * @returns {Promise<Object>} - Respuesta del backend del hospital
 */
export const enviarCitaAlHospital = async (payload) => {
  try {
    const response = await axios.post(HOSPITAL_API, payload);
    console.log(" Cita enviada correctamente al hospital:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al enviar cita al hospital:", error.response?.data || error.message);
    throw error;
  }
};
