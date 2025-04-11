// src/services/solicitudAtencionService.js
import axios from "axios";

// Dirección del backend de la aseguradora
const API_URL = "http://localhost:5001/api/solicitudes-atencion";

/**
 * Enviar una nueva solicitud de atención hospitalaria.
 * @param {Object} datos - Objeto con afiliado, servicio, monto, hospital, etc.
 */
export const enviarSolicitudAtencion = async (datos) => {
  try {
    const response = await axios.post(API_URL, datos);
    return response.data;
  } catch (error) {
    console.error(" Error al enviar solicitud de atención:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al enviar solicitud de atención");
  }
};

/**
 * Obtener todas las solicitudes registradas (para vista admin, por ejemplo)
 */
export const obtenerSolicitudesAtencion = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(" Error al obtener solicitudes:", error.response?.data || error.message);
    return [];
  }
};

export const aprobarSolicitudAtencion = async (id) => {
    const res = await axios.put(`http://localhost:5001/api/solicitudes-atencion/${id}/aprobar`);
    return res.data;
  };
  
  export const rechazarSolicitudAtencion = async (id) => {
    const res = await axios.put(`http://localhost:5001/api/solicitudes-atencion/${id}/rechazar`);
    return res.data;
  };

  // src/services/solicitudesService.js
// src/services/solicitudAtencionService.js
export async function enviarSolicitudHospital(data) {
    const res = await fetch("http://localhost:5001/api/solicitudes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      throw new Error("Error al enviar solicitud");
    }
  
    return await res.json();
  }
  
  