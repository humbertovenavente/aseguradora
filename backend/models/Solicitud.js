import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  telefono: String,
  aseguradora: String,
  estado: {
    type: String,
    default: 'pendiente' // El backend de Quarkus envía pendiente
  }
}, { timestamps: true });

// Asegúrate de que la colección se llame 'solicituds'
export default mongoose.model('Solicitud', solicitudSchema, 'solicituds');

