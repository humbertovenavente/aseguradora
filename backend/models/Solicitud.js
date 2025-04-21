import mongoose from 'mongoose';

/**
 * Esquema para solicitudes de servicios realizadas por hospitales o farmacias.
 */
const solicitudSchema = new mongoose.Schema({
  /** Nombre de quien realiza la solicitud (farmacia o entidad externa) */
  nombre: String,

  /** Dirección física del solicitante */
  direccion: String,

  /** Teléfono de contacto */
  telefono: String,

  /** Código o identificador de aseguradora */
  aseguradora: String,

  /** Nombre completo de la aseguradora */
  aseguradoraNombre: String,

  /** Origen de la solicitud (hospital, farmacia, etc.) */
  origen: String,

  /** Código interno único de la solicitud */
  codigoSolicitud: String,

  /** Cliente afiliado que solicita el servicio */
  afiliado: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },

  /** Servicio médico solicitado */
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio" },

  /** Hospital donde se solicita la atención */
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },

  /** Monto estimado del servicio */
  monto: Number,

  /** Fecha en la que se solicita el servicio */
  fechaServicio: Date,

  /** Comentarios adicionales sobre la solicitud */
  comentarios: String,

  /** Resultados médicos o de revisión (si aplica) */
  resultados: String,

  /** Estado actual de la solicitud */
  estado: {
    type: String,
    default: 'pendiente'
  }
}, { timestamps: true });

export default mongoose.model('Solicitud', solicitudSchema, 'solicituds');
