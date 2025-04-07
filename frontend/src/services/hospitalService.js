import axios from "axios";

const API_URL = "http://localhost:5001/api/hospitales";

// Crear un nuevo hospital
export const crearHospital = async (hospital) => {
  const response = await axios.post(API_URL, hospital);
  return response.data;
};

//  Obtener todos los hospitales (opcionalmente filtrado por convenio)
export const obtenerHospitales = async (convenioActivo = null) => {
  let url = API_URL;
  if (convenioActivo !== null) {
    url += `?convenioActivo=${convenioActivo}`;
  }
  const response = await axios.get(url);
  return response.data;
};

//  Obtener un hospital por ID
export const obtenerHospitalPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

//  Actualizar un hospital
export const actualizarHospital = async (id, hospital) => {
  const response = await axios.put(`${API_URL}/${id}`, hospital);
  return response.data;
};

//  Eliminar un hospital
export const eliminarHospital = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

//  Obtener hospitales por servicio aprobado
export const obtenerHospitalesPorServicio = async (servicioId) => {
  const response = await axios.get(`${API_URL}?servicioId=${servicioId}`);
  return response.data;
};
