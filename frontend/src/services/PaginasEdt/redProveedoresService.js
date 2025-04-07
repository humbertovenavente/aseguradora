import axios from "axios";

const API_URL = "http://localhost:5001/api/redProveedores";

const API_URL_MODERACION = "http://localhost:5001/api/moderacion";

// 📄 Obtener la lista de proveedores
export const obtenerRedProveedores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✏️ Enviar propuesta de actualización usando moderación
export const enviarPropuestaRedProveedores = async (proveedores, correoUsuario) => {
  const propuesta = {
    pagina: "red-proveedores", // Este valor debe coincidir con el del backend
    contenido: { proveedores }, // Enviamos el array de proveedores dentro de "contenido"
    creadoPor: correoUsuario, // El correo del editor actual
  };

  const response = await axios.post(API_URL_MODERACION, propuesta);
  return response.data;
};