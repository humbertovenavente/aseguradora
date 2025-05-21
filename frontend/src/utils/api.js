// VITE_API_URL → e.g. http://localhost:5001/api
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";


export async function crearFarmacia(data) {
  const res = await fetch(`${API_BASE_URL}/servicio-farmacias`, {
    method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
export async function editarFarmacia(id, data) {
  const res = await fetch(`${API_BASE_URL}/servicio-farmacias/${id}`, {
    method: "PUT", headers: {"Content-Type":"application/json"}, body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
export async function eliminarFarmacia(id) {
  const res = await fetch(`${API_BASE_URL}/servicio-farmacias/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
  return true;
}

// solicitudes multi‐farmacia
export async function fetchSolicitudesDescuentoFarmacias() {
  const res = await fetch(`${API_BASE_URL}/discount/medicamentos/listar`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}


export async function fetchFarmacias() {
  const res = await fetch(`${API_BASE_URL}/servicio-farmacias`);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // [{ _id, nombre, baseUrl, activo, ... }, …]
}

/**
 * Procesa una solicitud en la farmacia correcta vía proxy
 */
export async function procesarSolicitudDescuento(farmaciaBaseUrl, solicitudId, aprobar, nuevoDescuento) {
  const res = await fetch(`${API_BASE_URL}/discount/procesar/${solicitudId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ aprobar, farmaciaBaseUrl, nuevoDescuento })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
