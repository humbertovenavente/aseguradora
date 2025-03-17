import axios from "axios";

const API_URL = "http://localhost:5000/api/pagos";

// ✅ Crear un nuevo pago
export const crearPago = async (pago) => {
  const response = await axios.post(API_URL, pago);
  return response.data;
};

// 📄 Obtener todos los pagos
export const obtenerPagos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 🔍 Obtener un pago por ID
export const obtenerPagoPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// 🔄 Obtener pagos por cliente
export const obtenerPagosPorCliente = async (clienteId) => {
  const response = await axios.get(`${API_URL}/cliente/${clienteId}`);
  return response.data;
};

// 📅 Obtener pagos por rango de fechas
export const obtenerPagosPorFecha = async (fechaInicio, fechaFin) => {
  const response = await axios.get(`${API_URL}/fecha`, {
    params: {
      fechaInicio,
      fechaFin,
    },
  });
  return response.data;
};

// ✏️ Actualizar un pago
export const actualizarPago = async (id, pago) => {
  const response = await axios.put(`${API_URL}/${id}`, pago);
  return response.data;
};

// ❌ Eliminar un pago
export const eliminarPago = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
