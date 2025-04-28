import mongoose from 'mongoose';

/**
 * Esquema para farmacias registradas en el sistema.
 * Incluye información de contacto y estado de aprobación.
 */
const farmaciaSchema = new mongoose.Schema({
  /** Nombre de la farmacia */
  nombre: { type: String, required: true },

  /** Dirección física de la farmacia */
  direccion: { type: String, required: true },

  /** Teléfono de contacto */
  telefono: { type: String, required: true },

  /** Estado del registro de la farmacia */
  estado: {
    type: String,
    enum: ["pendiente", "aprobado", "rechazado"],
    default: "pendiente"
  }
}, { timestamps: true });

export default mongoose.model('Farmacia', farmaciaSchema, 'farmacias');
