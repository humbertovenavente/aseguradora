import axios from "axios";

const API_URL = "http://localhost:5001/api/contacto";
const API_URL_MODERACION = "http://localhost:5001/api/moderacion";


// ✅ (Opcional) Crear un nuevo contacto
// Útil si manejas múltiples registros de "Contacto" en tu base de datos.
export const crearContacto = async (contacto) => {
  const response = await axios.post(API_URL, contacto);
  return response.data;
};

// 📄 Obtener la información de contacto (o la lista de contactos)
export const obtenerContacto = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 🔍 Obtener un contacto por ID (opcional, si manejas varios)
export const obtenerContactoPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ✏️ Actualizar la información de contacto
// En tu caso, si manejas uno solo, basta con PUT a /api/contacto
export const actualizarContacto = async (contacto) => {
  const response = await axios.put(API_URL, contacto);
  return response.data;
};

// ❌ Eliminar el contacto (opcional, si manejas múltiples)
export const eliminarContacto = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};


// ✅ Crear propuesta de edición para contacto (moderación)
export const enviarPropuestaContacto = async (contenido, correoUsuario) => {
  const propuesta = {
    pagina: "contacto",
    contenido, // ya debe tener: titulo, introduccion, telefono, direccion, correo
    creadoPor: correoUsuario,
  };

  const response = await axios.post(API_URL_MODERACION, propuesta);
  return response.data;
};

