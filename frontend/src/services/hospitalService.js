import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/hospitales`;

export const crearHospital = async (hospital) => {
  const response = await axios.post(API_URL, hospital);
  return response.data;
};

export const obtenerHospitales = async (convenioActivo = null) => {
  let url = API_URL;
  if (convenioActivo !== null) {
    url += `?convenioActivo=${convenioActivo}`;
  }
  const response = await axios.get(url);
  return response.data;
};

export const obtenerHospitalPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const actualizarHospital = async (id, hospital) => {
  const response = await axios.put(`${API_URL}/${id}`, hospital);
  return response.data;
};

export const eliminarHospital = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const obtenerHospitalesPorServicio = async (servicioId) => {
  const response = await axios.get(`${API_URL}?servicioId=${servicioId}`);
  return response.data;
};

export const obtenerHospitalesPendientes = async () => {
  const response = await axios.get(`${API_URL}/pendientes`);
  return response.data;
};

export const aprobarHospital = async (id) => {
  const response = await axios.patch(`${API_URL}/aprobar/${id}`);
  return response.data;
};

export const rechazarHospital = async (id) => {
  const response = await axios.patch(`${API_URL}/rechazar/${id}`);
  return response.data;
};
