import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = "http://localhost:5001/api/polizas-clientes"; 

// Pagar una póliza (POST)
export const pagarPoliza = async (cliente_id, poliza_id, monto_pagado = 100) => {
  const response = await axios.post(`${API_URL}/pagar`, {
    cliente_id,
    poliza_id,
    monto_pagado
  });
  return response.data;
};

// Consultar estado de la póliza (GET)
export const obtenerEstadoPoliza = async (cliente_id, poliza_id) => {
  const response = await axios.get(`${API_URL}/estado-poliza/${cliente_id}/${poliza_id}`);
  return response.data;
};

// PUT - actualizar estado de pago manualmente
export const actualizarEstadoPago = async (cliente_id, poliza_id, estado_pago) => {
  console.log("🟡 Enviando al backend:", { cliente_id, poliza_id, estado_pago });

  const response = await axios.put(`${API_URL}/actualizar-estado`, {
    cliente_id,
    poliza_id,
    estado_pago
  });

  return response.data;
};



