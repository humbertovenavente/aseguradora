import axios from "axios";
import API_BASE_URL from "../config";

// buscar el cliente asociado al usuario
export const buscarClientePorUsuarioId = async (usuarioId) => {
    const response = await axios.get(`${API_BASE_URL}/clientes/buscar-por-usuario/${usuarioId}`);
    return response.data;
  };
  

// Historial de servicios
export const obtenerHistorialServicios = async (idCliente) => {
  const response = await axios.get(`${API_BASE_URL}/paciente/historial-servicios/${idCliente}`);
  return response.data;
};

// Citas
export const obtenerCitasPaciente = async (idCliente) => {
  const response = await axios.get(`${API_BASE_URL}/paciente/citas/${idCliente}`);
  return response.data;
};

// Recetas
export const obtenerRecetasPaciente = async (idCliente) => {
  const response = await axios.get(`${API_BASE_URL}/paciente/recetas/${idCliente}`);
  return response.data;
};
