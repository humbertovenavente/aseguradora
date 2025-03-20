import axios from "axios";
import API_BASE_URL from "../config";

const EMPLEADOS_API = `${API_BASE_URL}/empleados`;

// Obtener todos los empleados
export const obtenerEmpleados = async () => {
  try {
    const response = await axios.get(EMPLEADOS_API);
    return response.data;
  } catch (error) {
    console.error("Error al obtener empleados:", error.response?.data || error.message);
    return [];
  }
};

// Crear un nuevo empleado
export const crearEmpleado = async (empleado) => {
  try {
    console.log("📤 Enviando empleado:", empleado);
    const response = await axios.post(EMPLEADOS_API, empleado);
    console.log("✅ Empleado creado correctamente.");
    return response.data;
  } catch (error) {
    console.error("❌ Error al crear el empleado:", error.response?.data || error.message);
    throw error;
  }
};

// Modificar un empleado
export const actualizarEmpleado = async (id, empleado) => {
  try {
    const response = await axios.put(`${EMPLEADOS_API}/${id}`, empleado);
    return response.data;
  } catch (error) {
    console.error(`❌ Error al actualizar el empleado con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un empleado
export const eliminarEmpleado = async (id) => {
  try {
    const response = await axios.delete(`${EMPLEADOS_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error al eliminar el empleado con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
