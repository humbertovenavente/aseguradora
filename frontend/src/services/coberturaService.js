import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/coberturas`;

export const crearCobertura = async (cobertura) => {
  const response = await axios.post(API_URL, cobertura);
  return response.data;
};

export const obtenerCoberturas = async (isCustom = null) => {
  let url = API_URL;
  if (isCustom !== null) {
    url += `?isCustom=${isCustom}`;
  }
  const response = await axios.get(url);
  return response.data;
};

export const obtenerCoberturaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const actualizarCobertura = async (id, cobertura) => {
  const response = await axios.put(`${API_URL}/${id}`, cobertura);
  return response.data;
};

export const eliminarCobertura = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const obtenerCoberturasPorCliente = async (clienteId) => {
  const response = await axios.get(`${API_URL}?clienteId=${clienteId}`);
  return response.data;
};
