import axios from "axios";

const API_URL = "http://localhost:5000/api/footer";

export const obtenerFooter = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const actualizarFooter = async (contenido) => {
  const response = await axios.put(API_URL, { contenido });
  return response.data;
};
