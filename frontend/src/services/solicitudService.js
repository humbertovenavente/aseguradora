import axios from "axios";
import API_URL from "../config";

export async function actualizarEstadoSolicitud(id, nuevoEstado) {
  const res = await fetch(`${API_URL}/solicitudes/${id}`, {
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
