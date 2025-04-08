import axios from "axios";
import API_BASE_URL from "../config";

// Ya incluye /api → NO lo repitas
const API_URL = `${API_BASE_URL}/recetas`;

export const obtenerRecetas = async () => {
  const response = await axios.get(`${API_URL}/todas`);
  return response.data;
};

export const obtenerMontoMinimo = async () => {
  const response = await axios.get(`${API_URL}/configuracion/monto`);
  return response.data;
};

export const actualizarMontoMinimo = async (nuevoMonto) => {
  const response = await axios.put(`${API_URL}/configuracion/monto`, {
    valor: nuevoMonto,
  });
  return response.data;
};


