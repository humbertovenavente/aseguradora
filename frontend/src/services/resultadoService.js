import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/resultados`;

export const obtenerResultados = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
