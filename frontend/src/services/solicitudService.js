import axios from "axios";
import API_URL from "../config";

// Obtener todas las solicitudes hospitalarias
export const obtenerSolicitudes = async () => {
  const res = await axios.get(`${API_URL}/solicitudes`);
  return res.data;
};

// Aprobar una solicitud (vía ruta específica en el backend)
export const aprobarSolicitud = async (id) => {
  const res = await axios.put(`${API_URL}/solicitudes/${id}/aprobar`);
  return res.data;
};

// Rechazar una solicitud (vía ruta específica en el backend)
export const rechazarSolicitud = async (id) => {
  const res = await axios.put(`${API_URL}/solicitudes/${id}/rechazar`);
  return res.data;
};

// Actualizar el estado manualmente (opcional)
export const actualizarEstadoSolicitud = async (id, nuevoEstado) => {
  const res = await axios.put(`${API_URL}/solicitudes/${id}`, {
    estado: nuevoEstado
  });

  if (res.status !== 200) {
    throw new Error("Error actualizando solicitud");
  }

  return res.data;
};

export const enviarSolicitudHospital = async (datos) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al enviar solicitud");
  }

  return await res.json();
};