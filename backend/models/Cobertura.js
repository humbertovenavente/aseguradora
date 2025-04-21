import mongoose from 'mongoose';

/**
 * Esquema de cobertura médica.
 * Define el porcentaje de cobertura, monto mínimo y servicios aplicables.
 */
const CoberturaSchema = new mongoose.Schema({
  /** Nombre de la cobertura */
  nombre: { type: String, required: true },

  /** Descripción breve de la cobertura */
  descripcion: { type: String },

  /** Porcentaje que cubre el seguro (0 a 100) */
  porcentajeCobertura: { type: Number, required: true, min: 0, max: 100 },

  /** Monto mínimo para que la cobertura aplique */
  montoMinimoCobertura: { type: Number, default: 250.0 },

  /** Servicios que incluye esta cobertura */
  servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' }]
}, { timestamps: true });

export default mongoose.model('Cobertura', CoberturaSchema);
