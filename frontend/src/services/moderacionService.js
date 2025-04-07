import axios from "axios";

const API_URL = "http://localhost:5000/api/moderacion";

// Crear una nueva propuesta de edición
export const crearPropuesta = async (propuesta) => {
  const response = await axios.post(API_URL, propuesta);
  return response.data;
};

// Obtener todas las propuestas por estado
export const obtenerPropuestasPorEstado = async (estado) => {
  const response = await axios.get(`${API_URL}/estado/${estado}`);
  return response.data;
};

// Aprobar una propuesta
export const aprobarPropuesta = async (id) => {
  const response = await axios.put(`${API_URL}/aprobar/${id}`);
  return response.data;
};

// Rechazar una propuesta con comentario
export const rechazarPropuesta = async (id, comentario) => {
  const response = await axios.put(`${API_URL}/rechazar/${id}`, {
    comentarioRechazo: comentario,
  });
  return response.data;
};
