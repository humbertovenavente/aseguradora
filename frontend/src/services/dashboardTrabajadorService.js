import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/dashboard-trabajador`;

export const obtenerDashboardTrabajador = async (idCliente) => {
  const response = await axios.get(`${API_URL}/${idCliente}`);
  return response.data;
};
