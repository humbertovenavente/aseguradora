import axios from "axios";

const API_URL = "http://localhost:5001/api/faq";

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
