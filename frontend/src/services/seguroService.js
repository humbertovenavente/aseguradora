import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = `${API_BASE_URL}/seguros`;

export const obtenerSeguros = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const obtenerSeguroPorId = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const crearSeguro = async (seguro) => {
    const response = await axios.post(API_URL, seguro);
    return response.data;
};

export const actualizarSeguro = async (id, seguro) => {
    const response = await axios.put(`${API_URL}/${id}`, seguro);
    return response.data;
};

export const eliminarSeguro = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
