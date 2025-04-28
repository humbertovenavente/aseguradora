import axios from "axios";
import API_BASE_URL from "../../config";

const API_URL = `${API_BASE_URL}/home`;

export const crearHome = async (homeData) => {
  const response = await axios.post(API_URL, homeData);
  return response.data;
};

export const obtenerHome = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export const obtenerHomePorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const actualizarHome = async (homeData) => {
  const response = await axios.put(API_URL, homeData);
  return response.data;
};

export const eliminarHome = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
