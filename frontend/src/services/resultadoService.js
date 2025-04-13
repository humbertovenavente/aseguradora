// src/services/resultadoService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/resultados';

export const obtenerResultados = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
