import axios from "axios";
import API_BASE_URL from "../config"; 

const CLIENTES_API = `${API_BASE_URL}/clientes`;

//  Obtener todos los clientes
export const obtenerClientes = async () => {
    try {
        const response = await axios.get(CLIENTES_API);
        return response.data;
    } catch (error) {
        console.error("Error al obtener clientes:", error.response?.data || error.message);
        return [];
    }
};

// Crear un nuevo cliente
export const crearCliente = async (cliente) => {
  try {
      console.log(" Enviando cliente:", cliente); // LOG PARA DEPURACIÓN
      const response = await axios.post(`${API_BASE_URL}/clientes`, cliente);
      console.log(" Cliente creado correctamente.");
      return response.data;
  } catch (error) {
      console.error(" Error al crear el cliente:", error.response?.data || error.message);
      throw error;
  }
};


//  Modificar un cliente
export const actualizarCliente = async (id, cliente) => {
    try {
        const response = await axios.put(`${CLIENTES_API}/${id}`, cliente);
        return response.data;
    } catch (error) {
        console.error(` Error al actualizar el cliente con ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

//  Eliminar un cliente
export const eliminarCliente = async (id) => {
    try {
        const response = await axios.delete(`${CLIENTES_API}/${id}`);
        return response.data;
    } catch (error) {
        console.error(` Error al eliminar el cliente con ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};
