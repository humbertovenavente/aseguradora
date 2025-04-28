import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/solicitudes-atencion`;

export const enviarSolicitudAtencion = async (datos) => {
  const response = await axios.post(API_URL, datos);
  return response.data;
};

export const obtenerSolicitudesAtencion = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const aprobarSolicitudAtencion = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/aprobar`);
  return response.data;
};

export const rechazarSolicitudAtencion = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/rechazar`);
  return response.data;
};
