import mongoose from "mongoose";

/**
 * Esquema para la información de contacto de la aseguradora.
 */
const ContactoSchema = new mongoose.Schema({
  /** Título o encabezado del bloque de contacto */
  titulo: { type: String, required: true },

  /** Texto introductorio o descripción */
  introduccion: { type: String },

  /** Teléfono de contacto */
  telefono: { type: String },

  /** Dirección física */
  direccion: { type: String },

  /** Correo electrónico */
  correo: { type: String }
});

export default mongoose.model("Contacto", ContactoSchema);
