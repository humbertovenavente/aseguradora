import axios from "axios";

const API_URL = "http://localhost:5000/api/servicios";

// ✅ Crear un nuevo servicio
export const crearServicio = async (servicio) => {
  const response = await axios.post(API_URL, servicio);
  return response.data;
};

// 📄 Obtener todos los servicios
export const obtenerServicios = async () => {
    const response = await axios.get(`${API_URL}?populate=hospital`);
    return response.data;
};


// 🔍 Obtener un servicio por ID
export const obtenerServicioPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ✏️ Actualizar un servicio
export const actualizarServicio = async (id, servicio) => {
  const response = await axios.put(`${API_URL}/${id}`, servicio);
  return response.data;
};

// ❌ Eliminar un servicio
export const eliminarServicio = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
