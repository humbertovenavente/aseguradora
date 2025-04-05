// frontend/services/reportesService.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api/reporte";

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
