// frontend/services/elementosService.js
import axios from "axios";

const API_URL = "http://localhost:5001/api/elementos";

// 🔹 Obtener los servicios más vendidos
export const obtenerTopVendidos = async () => {
  try {
    const response = await axios.get(`${API_URL}/top-vendidos`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los servicios más vendidos:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Obtener las coberturas más usadas
export const obtenerTopCoberturas = async () => {
  try {
    const response = await axios.get(`${API_URL}/top-coberturas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las coberturas más usadas:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Obtener las pólizas más contratadas
export const obtenerTopPolizas = async () => {
  try {
    const response = await axios.get(`${API_URL}/top-polizas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las pólizas más contratadas:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Obtener los servicios más solicitados en citas
export const obtenerTopServiciosSolicitados = async () => {
  try {
    const response = await axios.get(`${API_URL}/top-servicios-solicitados`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los servicios más solicitados:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Obtener los empleados destacados
export const obtenerTopEmpleados = async () => {
  try {
    const response = await axios.get(`${API_URL}/top-empleados`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los empleados destacados:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Obtener las próximas citas médicas
export const obtenerProximasCitas = async () => {
  try {
    const response = await axios.get(`${API_URL}/proximas-citas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener próximas citas médicas:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Obtener los últimos servicios agregados
export const obtenerUltimosServicios = async () => {
  try {
    const response = await axios.get(`${API_URL}/ultimos-servicios`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los últimos servicios:", error.response?.data || error.message);
    throw error;
  }
};
