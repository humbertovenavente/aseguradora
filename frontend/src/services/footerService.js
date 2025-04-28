import axios from "axios";
import API_BASE_URL from "../config"; // <- esta es la forma correcta en tu caso

const API_URL = `${API_BASE_URL}/footer`;
const MODERACION_URL = `${API_BASE_URL}/moderacion`;

export const obtenerFooter = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const proponerEdicionFooter = async (contenido, creadoPor) => {
  const propuesta = {
    pagina: "footer",
    contenido: { contenido },
    creadoPor,
    estado: "pendiente"
  };

  const response = await axios.post(MODERACION_URL, propuesta);
  return response.data;
};
