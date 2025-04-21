import mongoose from 'mongoose';

/**
 * Esquema que relaciona a un cliente con una póliza.
 * Registra el estado del pago, fecha de pago y vencimiento.
 */
const ClientePolizaSchema = new mongoose.Schema({
  /** Cliente relacionado con la póliza */
  id_cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },

  /** Póliza asociada al cliente */
  id_poliza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poliza',
    required: true
  },

  /** Estado actual del pago */
  estado_pago: {
    type: Boolean,
    default: false
  },

  /** Fecha en la que se realizó el pago */
  fecha_pago: {
    type: Date,
    default: null
  },

  /** Fecha de vencimiento de la póliza */
  fecha_vencimiento: {
    type: Date,
    default: null
  }
}, { timestamps: true });

export default mongoose.model('ClientePoliza', ClientePolizaSchema);
