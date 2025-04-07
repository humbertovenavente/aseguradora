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
}
