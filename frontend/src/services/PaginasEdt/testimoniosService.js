import axios from "axios";

const API_URL = "http://localhost:5001/api/testimonios";

// Obtener los testimonios
export const obtenerTestimonios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Actualizar los testimonios
export const actualizarTestimonios = async (testimonios) => {
  const response = await axios.put(API_URL, testimonios);
  return response.data;
};
