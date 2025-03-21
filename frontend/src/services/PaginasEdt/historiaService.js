import axios from "axios";

const API_URL = "http://localhost:5000/api/historia";

// ✅ (Opcional) Crear una nueva historia
// Útil solo si manejas múltiples “historias” en tu base de datos.
export const crearHistoria = async (historia) => {
  const response = await axios.post(API_URL, historia);
  return response.data;
};

// 📄 Obtener la historia (o la lista de historias)
export const obtenerHistoria = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 🔍 Obtener una historia por ID (opcional, si manejas varias)
export const obtenerHistoriaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ✏️ Actualizar la historia
// En tu caso, si manejas una sola, basta con PUT a /api/historia
export const actualizarHistoria = async (historia) => {
  const response = await axios.put(API_URL, historia);
  return response.data;
};

// ❌ Eliminar la historia (opcional, si manejas múltiples)
export const eliminarHistoria = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
