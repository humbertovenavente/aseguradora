// src/services/citaSolicitud.js
import axios from "axios";

// ✅ Dirección IP local del backend del hospital
const HOSPITAL_API = "http://localhost:8080/citas/externa";

/**
 * Envía una cita confirmada al sistema del hospital.
 * Este método se utiliza cuando una aseguradora aprueba una cita
 * y necesita registrarla también en la base de datos del hospital.
 *
 * @param {Object} payload - Objeto con los datos de la cita, debe incluir:
 *   - dpi
 *   - nombre
 *   - apellido
 *   - fecha
 *   - horaInicio
 *   - horaFin
 *   - motivo
 *   - idHospital
 *   - idServicio
 *   - idAseguradora
 *   - numeroAutorizacion
 * @returns {Promise<Object>} - Respuesta del backend hospitalario
 */
export const enviarCitaAlHospital = async (payload) => {
  try {
    const response = await axios.post(HOSPITAL_API, payload);
    console.log("✅ Cita enviada correctamente al hospital:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al enviar cita al hospital:", error.response?.data || error.message);
    throw error;
  }
};
