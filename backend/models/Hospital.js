import mongoose from 'mongoose';

/**
 * Esquema para hospitales registrados en el sistema.
 * Incluye información de contacto, servicios aprobados y estado de convenio.
 */
const HospitalSchema = new mongoose.Schema({
  /** Nombre del hospital */
  nombre: { type: String, required: true },

  /** Dirección del hospital */
  direccion: { type: String, required: true },

  /** Teléfono de contacto */
  telefono: { type: String, required: true },

  /** Servicios aprobados para este hospital */
  serviciosAprobados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' }],

  /** Indica si el convenio con la aseguradora está activo */
  convenioActivo: { type: Boolean, default: false },

  /** Estado del convenio: pendiente, aprobado o rechazado */
  estado: {
    type: String,
    enum: ["pendiente", "aprobado", "rechazado"],
    default: "pendiente"
  }
}, { timestamps: true });

export default mongoose.model('Hospital', HospitalSchema);
