import axios from "axios";
import API_BASE_URL from "../../config";

const API_URL = `${API_BASE_URL}/historia`;
const API_URL_MODERACION = `${API_BASE_URL}/moderacion`;

export const crearHistoria = async (historia) => {
  const response = await axios.post(API_URL, historia);
  return response.data;
};

export const obtenerHistoria = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const obtenerHistoriaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const actualizarHistoria = async (historia) => {
  const response = await axios.put(API_URL, historia);
  return response.data;
};

export const eliminarHistoria = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const enviarPropuestaHistoria = async (contenido, correo) => {
  const propuesta = {
    pagina: "historia",
    contenido,
    creadoPor: correo
  };
  const response = await axios.post(API_URL_MODERACION, propuesta);
  return response.data;
};
