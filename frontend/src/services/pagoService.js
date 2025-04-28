import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/pagos`;

export const crearPago = async (pago) => {
  const response = await axios.post(API_URL, pago);
  return response.data;
};

export const obtenerPagos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const obtenerPagoPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const obtenerPagosPorCliente = async (clienteId) => {
  const response = await axios.get(`${API_URL}/cliente/${clienteId}`);
  return response.data;
};

export const obtenerPagosPorFecha = async (fechaInicio, fechaFin) => {
  const response = await axios.get(`${API_URL}/fecha`, {
    params: { fechaInicio, fechaFin },
  });
  return response.data;
};

export const actualizarPago = async (id, pago) => {
  const response = await axios.put(`${API_URL}/${id}`, pago);
  return response.data;
};

export const eliminarPago = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
