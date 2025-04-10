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


/**
 * PUT - Recalcular Copago de un Cliente
 */
export const recalcularCopagoCliente = async (clienteId) => {
    try {
        console.log(` Recalculando copago para el cliente ID: ${clienteId}`);
        const response = await axios.put(`${CLIENTES_API}/${clienteId}/recalcular-copago`);
        console.log(" Copagos recalculados correctamente.");
        return response.data;
    } catch (error) {
        console.error(" Error al recalcular copago:", error.response?.data || error.message);
        throw error;
    }
};

export const pagarCopagoCliente = async (clienteId, historialId) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/clientes/${clienteId}/historial/${historialId}/pagar`);
        return response.data;
    } catch (error) {
        console.error(" Error al pagar copago:", error.response?.data || error.message);
        throw error;
    }
};

export const crearClienteDesdeUsuario = async (usuarioId, cliente) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/clientes/crear-desde-usuario/${usuarioId}`, cliente);
        return res.data;
    } catch (error) {
        console.error("Error al crear cliente desde usuario:", error.response?.data || error.message);
        throw error;
    }
};


// Obtener historial de servicios por cliente
export const getHistorialCliente = async (clienteId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/clientes/${clienteId}/historial`);
        return response.data.historialServicios;
    } catch (error) {
        console.error("Error al obtener historial de cliente:", error);
        return [];
    }
};


// esto solamente es para lo que vamos a utilizar en jalar la informacion 
export async function obtenerHistorialCliente(clienteId) {
    const respuesta = await axios.get(`${CLIENTES_API}/${clienteId}/historial`);
    return respuesta.data.historialServicios; // Solo devuelve el historial

}
