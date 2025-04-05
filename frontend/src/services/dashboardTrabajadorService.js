import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard-trabajador";

export const obtenerDashboardTrabajador = async (idCliente) => {
  const response = await axios.get(`${API_URL}/${idCliente}`);
  return response.data;
};
