import axios from "axios";
import API_URL from "../config";

// 🔹 Obtener todas las solicitudes hospitalarias
export const obtenerSolicitudes = async () => {
  const res = await axios.get(`${API_URL}/solicitudes`);
  return res.data;
};

// 🔹 Aprobar una solicitud
export const aprobarSolicitud = async (id) => {
  const res = await axios.put(`${API_URL}/solicitudes/${id}/aprobar`);
  return res.data;
};

// 🔹 Rechazar una solicitud
export const rechazarSolicitud = async (id) => {
  const res = await axios.put(`${API_URL}/solicitudes/${id}/rechazar`);
  return res.data;
};

// 🔹 Actualizar estado general (sin origen)
export const actualizarEstadoSolicitud = async (id, nuevoEstado) => {
  const res = await axios.put(`${API_URL}/solicitudes/${id}`, {
    estado: nuevoEstado
  });

  if (res.status !== 200) {
    throw new Error("Error actualizando solicitud");
  }

  return res.data;
};

// 🔹 Actualizar estado según origen (farmacia u hospital)
export const actualizarEstadoPorOrigen = async (id, nuevoEstado, origen) => {
  const endpoint = origen === "farmacia"
    ? `${API_URL}/solicitudes/farmacia/${id}`
    : `${API_URL}/solicitudes/hospital/${id}`;

  const res = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ estado: nuevoEstado })
  });

  if (!res.ok) throw new Error("Error actualizando solicitud");
  return await res.json();
};

// 🔹 Enviar solicitud al hospital (POST)
export const enviarSolicitudHospital = async (datos) => {
  const res = await fetch(`${API_URL}/solicitudes/hospital`, {
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
