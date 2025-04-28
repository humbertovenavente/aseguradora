import axios from "axios";
import API_BASE_URL from "../config"; // 

const API_URL = `${API_BASE_URL}/categorias`;

export const crearCategoria = async (categoria) => {
  const response = await axios.post(API_URL, categoria);
  return response.data;
};

export const obtenerCategorias = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const obtenerCategoriaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const actualizarCategoria = async (id, categoria) => {
  const response = await axios.put(`${API_URL}/${id}`, categoria);
  return response.data;
};

export const eliminarCategoria = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
