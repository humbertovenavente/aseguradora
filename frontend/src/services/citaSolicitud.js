import axios from "axios";

const API_URL = "http://192.168.0.5:8080/citas/externa"; // Reemplaza con la IP correcta de tu backend del hospital

export const enviarCitaAlHospital = async (payload) => {
  try {
    const response = await axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    console.error("❌ Error al enviar cita al hospital:", error.response?.data || error.message);
    throw error;
  }
};
