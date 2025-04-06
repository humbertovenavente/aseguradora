import axios from "axios";

const API_URL = "http://localhost:5000/api/menu";


  // ✅ CORREGIDO
export const obtenerMenuPorTipo = async (tipo) => {
    const response = await axios.get(`http://localhost:5000/api/menu/${tipo}`);
    return response.data;
  };
  
  
// Crear un nuevo menú (usa esto si querés insertar desde el frontend)
export const crearMenu = async (menu) => {
  const response = await axios.post(API_URL, menu);
  return response.data;
};

// Actualizar menú por tipo
export const actualizarMenu = async (tipo, menu) => {
  const response = await axios.put(`${API_URL}/${tipo}`, menu);
  return response.data;
};

// Eliminar menú por tipo
export const eliminarMenu = async (tipo) => {
  const response = await axios.delete(`${API_URL}/${tipo}`);
  return response.data;
};
