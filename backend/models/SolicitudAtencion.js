import mongoose from 'mongoose';

/**
 * Esquema para solicitudes de atención hospitalaria por parte del cliente asegurado.
 */
const solicitudAtencionSchema = new mongoose.Schema({
  /** Cliente afiliado */
  afiliado: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },

  /** Servicio solicitado */
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio", required: true },

  /** Hospital que brindará la atención */
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },

  /** Monto estimado del servicio */
  monto: Number,

  /** Fecha en la que se brindará el servicio */
  fechaServicio: { type: Date, default: Date.now },

  /** Comentarios sobre la solicitud */
  comentarios: String,

  /** Resultados asociados (opcional) */
  resultados: String,

  /** Estado de la solicitud */
  estado: {
    type: String,
    default: 'pendiente'
  },

  /** Número de autorización otorgado por la aseguradora */
  numeroAutorizacion: String
}, { timestamps: true });

export default mongoose.model('SolicitudAtencion', solicitudAtencionSchema);
