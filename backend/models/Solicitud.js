import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  // Campos para farmacia o solicitudes básicas
  nombre: String,
  direccion: String,
  telefono: String,
  aseguradora: String,
  aseguradoraNombre: String,
  origen: String,
  codigoSolicitud: String,

  // Campos para hospital
  afiliado: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio" },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  monto: Number,
  fechaServicio: Date,
  comentarios: String,
  resultados: String,

  estado: {
    type: String,
    default: 'pendiente' // Tanto farmacia como hospital lo inician así
  }
}, { timestamps: true });

// Asegura que la colección se llame 'solicituds'
export default mongoose.model('Solicitud', solicitudSchema, 'solicituds');
