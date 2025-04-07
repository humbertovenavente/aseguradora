import axios from "axios";

const API_URL = "http://localhost:5001/api/footer";

const MODERACION_URL = "http://localhost:5001/api/moderacion";

export const obtenerFooter = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


// Enviar propuesta de edición del footer (moderación)
export const proponerEdicionFooter = async (contenido, creadoPor) => {
  const propuesta = {
    pagina: "footer",
    contenido: { contenido },
    creadoPor, // ID del usuario que edita (debe enviarse desde el frontend)
    estado: "pendiente"
  };

  const response = await axios.post(MODERACION_URL, propuesta);
  return response.data;
};