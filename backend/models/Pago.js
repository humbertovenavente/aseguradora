import mongoose from 'mongoose';

/**
 * Esquema para registrar pagos realizados por clientes.
 * Incluye el monto, copago, estado y motivo si fue rechazado.
 */
const PagoSchema = new mongoose.Schema({
  /** Cliente que realizó el pago */
  cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },

  /** Póliza asociada al pago */
  poliza_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Poliza', required: true },

  /** Monto pagado */
  pago: { type: Number, required: true },

  /** Monto del copago si aplica */
  copago: { type: Number, required: false },

  /** Fecha en la que se realizó el pago */
  fecha_pago: { type: Date, default: Date.now },

  /** Estado del pago */
  estado_pago: { type: String, enum: ['aceptado', 'rechazado'], required: true },

  /** Motivo del rechazo si aplica */
  motivo_rechazo: { type: String }
}, { timestamps: true });

export default mongoose.model('Pago', PagoSchema);
