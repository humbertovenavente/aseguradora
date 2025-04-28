import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/polizas`;

export const obtenerPolizas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const obtenerPolizaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const crearPoliza = async (poliza) => {
  const response = await axios.post(API_URL, poliza);
  return response.data;
};

export const actualizarPoliza = async (id, poliza) => {
  const response = await axios.put(`${API_URL}/${id}`, poliza);
  return response.data;
};

export const eliminarPoliza = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
