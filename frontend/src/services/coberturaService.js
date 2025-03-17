// =========================
// Cobertura Services
// =========================
import axios from "axios";

const API_URL = "http://localhost:5000/api/coberturas";

// ✅ Crear una nueva cobertura
export const crearCobertura = async (cobertura) => {
  const response = await axios.post(API_URL, cobertura);
  return response.data;
};

// 📄 Obtener todas las coberturas
export const obtenerCoberturas = async (isCustom = null) => {
  let url = API_URL;
  if (isCustom !== null) {
    url += `?isCustom=${isCustom}`;
  }
  const response = await axios.get(url);
  return response.data;
};

// 🔍 Obtener una cobertura por ID
export const obtenerCoberturaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ✏️ Actualizar una cobertura
export const actualizarCobertura = async (id, cobertura) => {
  const response = await axios.put(`${API_URL}/${id}`, cobertura);
  return response.data;
};

// ❌ Eliminar una cobertura
export const eliminarCobertura = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// 🔍 Obtener coberturas por clienteId (para coberturas personalizadas)
export const obtenerCoberturasPorCliente = async (clienteId) => {
  const response = await axios.get(`${API_URL}?clienteId=${clienteId}`);
  return response.data;
};
