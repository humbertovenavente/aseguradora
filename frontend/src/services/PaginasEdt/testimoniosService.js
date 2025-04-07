import axios from "axios";

const API_URL = "http://localhost:5001/api/testimonios";

const API_URL_MODERACION = "http://localhost:5001/api/moderacion";

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



// 📨 Enviar propuesta de modificación a moderación
export const enviarPropuestaTestimonios = async (testimonios, correoUsuario) => {
  const propuesta = {
    pagina: "testimonios",
    contenido: testimonios,
    creadoPor: correoUsuario,
  };
  const response = await axios.post(API_URL_MODERACION, propuesta);
  return response.data;
};