import mongoose from 'mongoose';

/**
 * Esquema de datos para una aseguradora.
 * Contiene nombre, correo y teléfono de contacto.
 */
const AseguradoraSchema = new mongoose.Schema({
  /**
   * Nombre de la aseguradora.
   * @type {String}
   */
  nombre: { type: String, required: true },

  /**
   * Correo electrónico de contacto.
   * @type {String}
   */
  correo: { type: String },

  /**
   * Número telefónico de contacto.
   * @type {String}
   */
  telefono: { type: String }
});

export default mongoose.model("Aseguradora", AseguradoraSchema);
