import axios from "axios";

const API_URL = "http://localhost:5001/api/redProveedores";

// 📄 Obtener la lista de proveedores
export const obtenerRedProveedores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✏️ Actualizar la lista de proveedores
export const actualizarRedProveedores = async (redProveedores) => {
  const response = await axios.put(API_URL, redProveedores);
  return response.data;
};
