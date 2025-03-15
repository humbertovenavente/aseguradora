import axios from "axios";

const API_URL = "http://localhost:5000/api/clientes";

// 📌 Obtener todos los clientes
export const obtenerClientes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 📌 Crear un nuevo cliente
export const crearCliente = async (cliente) => {
  const response = await axios.post(API_URL, cliente);
  return response.data;
};

// 📌 Modificar un cliente
export const actualizarCliente = async (id, cliente) => {
  const response = await axios.put(`${API_URL}/${id}`, cliente);
  return response.data;
};

// 📌 Eliminar un cliente
export const eliminarCliente = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
