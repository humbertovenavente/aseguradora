import axios from "axios";

const API_URL = "http://localhost:5000/api/polizas";

// 📌 Obtener todas las pólizas
export const obtenerPolizas = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// 📌 Crear una nueva póliza
export const crearPoliza = async (poliza) => {
    const response = await axios.post(API_URL, poliza);
    return response.data;
};

// 📌 Modificar una póliza
export const actualizarPoliza = async (id, poliza) => {
    const response = await axios.put(`${API_URL}/${id}`, poliza);
    return response.data;
};

// 📌 Eliminar una póliza
export const eliminarPoliza = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
