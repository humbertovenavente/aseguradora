import axios from "axios";
import API_BASE_URL from "../config";

const API_BASE = `${API_BASE_URL}/reporte`;

export const generarReporteHospital = async (mes) => {
  const response = await axios.get(`${API_BASE}/hospital/${mes}/generar`);
  return response.data;
};

export const obtenerReportesPorMes = async (tipo, mes) => {
  const response = await axios.get(`${API_BASE}/${tipo}/${mes}`);
  return response.data;
};

export const eliminarReporte = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`);
  return response.data;
};
