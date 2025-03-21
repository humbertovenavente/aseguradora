import axios from "axios";

const API_URL = "http://localhost:5000/api/home";

// ✅ (Opcional) Crear un nuevo Home
// Útil si en algún momento decides manejar múltiples documentos de Home.
export const crearHome = async (homeData) => {
  const response = await axios.post(API_URL, homeData);
  return response.data;
};

// 📄 Obtener la configuración del Home
// En tu caso, si solo manejas un documento único, esto bastará para cargar la info.
export const obtenerHome = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 🔍 Obtener un Home por ID (opcional, si manejas varios)
export const obtenerHomePorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ✏️ Actualizar la configuración del Home
// Si manejas un solo documento, con PUT a /api/home será suficiente.
export const actualizarHome = async (homeData) => {
  const response = await axios.put(API_URL, homeData);
  return response.data;
};

// ❌ Eliminar un Home (opcional, si manejas múltiples)
export const eliminarHome = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
