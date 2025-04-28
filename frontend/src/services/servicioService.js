import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/servicios`;

export const crearServicio = async (servicio) => {
  const response = await axios.post(API_URL, servicio);
  return response.data;
};

export const obtenerServicios = async () => {
  const response = await axios.get(`${API_URL}?populate=hospitalAprobado,subservicios`);
  return response.data;
};

export const obtenerServicioPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${encodeURIComponent(id)}?populate=hospitalAprobado,subservicios`);
  return response.data;
};

export const actualizarServicio = async (id, servicio) => {
  const response = await axios.put(`${API_URL}/${encodeURIComponent(id)}`, servicio);
  return response.data;
};

export const eliminarServicio = async (id) => {
  const response = await axios.delete(`${API_URL}/${encodeURIComponent(id)}`);
  return response.data;
};
export const obtenerServiciosPorHospital = async (idHospital) => {
  const response = await axios.get(`${API_URL}?hospitalAprobado=${encodeURIComponent(idHospital)}&populate=subservicios`);
  return response.data;
};
