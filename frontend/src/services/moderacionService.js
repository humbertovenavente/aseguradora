import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/moderacion`;

export const crearPropuesta = async (propuesta) => {
  const response = await axios.post(API_URL, propuesta);
  return response.data;
};

export const obtenerPropuestasPorEstado = async (estado) => {
  const response = await axios.get(`${API_URL}/estado/${estado}`);
  return response.data;
};

export const aprobarPropuesta = async (id) => {
  const response = await axios.put(`${API_URL}/aprobar/${id}`);
  return response.data;
};

export const rechazarPropuesta = async (id, comentario) => {
  const response = await axios.put(`${API_URL}/rechazar/${id}`, { comentarioRechazo: comentario });
  return response.data;
};

export const obtenerPropuestaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const reenviarPropuesta = async (id, contenido) => {
  const response = await axios.put(`${API_URL}/reenviar/${id}`, { contenido });
  return response.data;
};
