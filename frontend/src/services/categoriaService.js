import axios from "axios";

const API_URL = "http://localhost:5000/api/categorias";

// ✅ Crear una nueva categoría o subcategoría
export const crearCategoria = async (categoria) => {
  const response = await axios.post(API_URL, categoria);
  return response.data;
};

// 📄 Obtener todas las categorías (incluyendo subcategorías)
export const obtenerCategorias = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 🔍 Obtener una categoría por ID
export const obtenerCategoriaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ✏️ Actualizar una categoría o subcategoría
export const actualizarCategoria = async (id, categoria) => {
  const response = await axios.put(`${API_URL}/${id}`, categoria);
  return response.data;
};

// ❌ Eliminar una categoría o subcategoría
export const eliminarCategoria = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
