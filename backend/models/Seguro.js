import mongoose from 'mongoose';

/**
 * Esquema que representa a una entidad aseguradora.
 */
const seguroSchema = new mongoose.Schema({
  /** Nombre del seguro */
  nombre: { type: String, required: true },

  /** Código único del seguro */
  codigo: { type: String, required: true, unique: true },

  /** Dirección física de la aseguradora */
  direccion: String,

  /** Teléfono de contacto */
  telefono: String,

  /** Correo electrónico de contacto */
  correo: String
});

export default mongoose.model('Seguro', seguroSchema);
