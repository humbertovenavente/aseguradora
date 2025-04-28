import mongoose from 'mongoose';

/**
 * Esquema que representa un servicio médico.
 * Puede tener subservicios, una cobertura y hospitales aprobados.
 */
const ServicioSchema = new mongoose.Schema({
  /** Nombre del servicio */
  nombre: { type: String, required: true },

  /** Descripción del servicio */
  descripcion: { type: String },

  /** Precio asignado para la aseguradora */
  precioAseguradora: { type: Number, required: true, min: 0 },

  /** Lista de hospitales aprobados para brindar este servicio */
  hospitalesAprobados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true }],

  /** Referencia al servicio padre (si es subservicio) */
  servicioPadre: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', default: null },

  /** Subservicios relacionados */
  subservicios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' }],

  /** Cobertura asociada a este servicio */
  cobertura: { type: mongoose.Schema.Types.ObjectId, ref: 'Cobertura', required: false },

  /** URL de la imagen ilustrativa del servicio */
  imagenUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('Servicio', ServicioSchema);
