import axios from "axios";

const API_URL = "http://localhost:8080/citas/externa"; // Asegúrate que esta URL sea correcta y accesible

export const enviarCitaAlHospital = async (payload) => {
  try {
    console.log("📦 Enviando cita al hospital:", payload);
    const response = await axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    console.error("❌ Error al enviar cita al hospital:", error.response?.data || error.message);
    throw error;
  }
};
