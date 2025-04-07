import axios from "axios";

const API_URL = "http://localhost:5001/api/faq";

const API_URL_MODERACION = "http://localhost:5001/api/moderacion";

// 📄 Obtener la FAQ
export const obtenerFaq = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✏️ Actualizar la FAQ
export const actualizarFaq = async (faq) => {
  const response = await axios.put(API_URL, faq);
  return response.data;
};

// 📤 Enviar propuesta para moderación con correo del usuario
export const enviarPropuestaFaq = async (items, correoUsuario) => {
  const propuesta = {
    pagina: "faq",
    contenido: { items },
    creadoPor: correoUsuario, // ahora se guarda el correo directamente
  };

  const response = await axios.post(API_URL_MODERACION, propuesta);
  return response.data;
};