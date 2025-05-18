import axios from "axios";
import API_BASE_URL from "../config"; 

// Extraemos solo el hostname dinámico de API_BASE_URL
const API_HOST = API_BASE_URL.replace("/api", ""); // quita '/api'
const API_URL = `${API_HOST.replace(":5022", ":8080")}/citas/externa`; 

export const enviarCitaAlHospital = async (payload) => {
  try {
    console.log("Enviando cita al hospital:", payload);
    const response = await axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    console.error("Error al enviar cita al hospital:", error.response?.data || error.message);
    throw error;
  }
};
