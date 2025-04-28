import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/polizas-clientes`;

export const pagarPoliza = async (cliente_id, poliza_id, monto_pagado = 100) => {
  const response = await axios.post(`${API_URL}/pagar`, { cliente_id, poliza_id, monto_pagado });
  return response.data;
};

export const obtenerEstadoPoliza = async (cliente_id, poliza_id) => {
  const response = await axios.get(`${API_URL}/estado-poliza/${cliente_id}/${poliza_id}`);
  return response.data;
};

export const actualizarEstadoPago = async (cliente_id, poliza_id, estado_pago) => {
  const response = await axios.put(`${API_URL}/actualizar-estado`, {
    cliente_id,
    poliza_id,
    estado_pago,
  });
  return response.data;
};
