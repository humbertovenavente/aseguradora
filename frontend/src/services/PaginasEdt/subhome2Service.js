// src/services/PaginasEdt/Subhome2Service.js
import axios from "axios";
import API_BASE_URL from "../../config";

const API_URL = `${API_BASE_URL}/subhome2`;

/**
 * Crea una nueva configuración de subhome2.
 * POST /api/subhome2
 */
export const crearSubhome2 = async (subhomeData) => {
  const response = await axios.post(API_URL, subhomeData);
  return response.data;
};

/**
 * Obtiene la configuración actual de Subhome2.
 * GET /api/Subhome2
 */
export const obtenerSubhome2 = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/**
 * Obtiene una configuración de Subhome2 por su ID.
 * GET /api/Subhome2/:id
 */
export const obtenerSubhome2PorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

/**
 * Actualiza la configuración de Subhome2 existente.
 * PUT /api/Subhome2
 */
export const actualizarSubhome2 = async (subhomeData) => {
  const response = await axios.put(API_URL, subhomeData);
  return response.data;
};

/**
 * Elimina la configuración de Subhome2 por su ID.
 * DELETE /api/Subhome2/:id
 */
export const eliminarSubhome2 = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
