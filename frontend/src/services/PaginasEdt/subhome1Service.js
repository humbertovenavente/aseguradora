// src/services/PaginasEdt/subhome1Service.js
import axios from "axios";
import API_BASE_URL from "../../config";

const API_URL = `${API_BASE_URL}/subhome1`;

/**
 * Crea una nueva configuración de Subhome1.
 * POST /api/subhome1
 */
export const crearSubhome1 = async (subhomeData) => {
  const response = await axios.post(API_URL, subhomeData);
  return response.data;
};

/**
 * Obtiene la configuración actual de Subhome1.
 * GET /api/subhome1
 */
export const obtenerSubhome1 = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/**
 * Obtiene una configuración de Subhome1 por su ID.
 * GET /api/subhome1/:id
 */
export const obtenerSubhome1PorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

/**
 * Actualiza la configuración de Subhome1 existente.
 * PUT /api/subhome1
 */
export const actualizarSubhome1 = async (subhomeData) => {
  const response = await axios.put(API_URL, subhomeData);
  return response.data;
};

/**
 * Elimina la configuración de Subhome1 por su ID.
 * DELETE /api/subhome1/:id
 */
export const eliminarSubhome1 = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
