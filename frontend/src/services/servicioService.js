import axios from "axios";

const API_URL = "http://localhost:5001/api/servicios";

//  Crear un nuevo servicio
export const crearServicio = async (servicio) => {
  try {
    const response = await axios.post(API_URL, servicio);
    return response.data;
  } catch (error) {
    console.error("Error al crear el servicio:", error.response?.data || error.message);
    throw error;
  }
};

//  Obtener todos los servicios con hospitales y subservicios relacionados
export const obtenerServicios = async () => {
  try {
    const response = await axios.get(`${API_URL}?populate=hospitalAprobado,subservicios`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los servicios:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener un servicio por ID con su hospital y subservicios
export const obtenerServicioPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${encodeURIComponent(id)}?populate=hospitalAprobado,subservicios`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el servicio con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

//  Actualizar un servicio
export const actualizarServicio = async (id, servicio) => {
  try {
    const response = await axios.put(`${API_URL}/${encodeURIComponent(id)}`, servicio);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el servicio con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un servicio
export const eliminarServicio = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${encodeURIComponent(id)}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el servicio con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
