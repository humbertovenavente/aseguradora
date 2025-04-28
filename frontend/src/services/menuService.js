import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/menu`;

export const obtenerMenuPorTipo = async (tipo) => {
  const response = await axios.get(`${API_BASE_URL}/menu/${tipo}`);
  return response.data;
};

export const crearMenu = async (menu) => {
  const response = await axios.post(API_URL, menu);
  return response.data;
};

export const actualizarMenu = async (tipo, menu) => {
  const response = await axios.put(`${API_URL}/${tipo}`, menu);
  return response.data;
};

export const eliminarMenu = async (tipo) => {
  const response = await axios.delete(`${API_URL}/${tipo}`);
  return response.data;
};
