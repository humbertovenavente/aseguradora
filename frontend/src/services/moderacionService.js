import axios from "axios";

const hostname = window.location.hostname;
const IP = hostname === "localhost" || hostname === "127.0.0.1" ? "localhost" : hostname;
const API_URL = "http://192.168.56.1:5001/api/moderacion";

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

export const obtenerPropuestaPorId = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  };

export const reenviarPropuesta = async (id, contenido) => {
    const response = await axios.put(`${API_URL}/reenviar/${id}`, {contenido});
    return response.data;
  };