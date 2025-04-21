import mongoose from "mongoose";

/**
 * Esquema que representa una sección de historia institucional o de empresa.
 */
const HistoriaSchema = new mongoose.Schema({
  /** Título principal de la sección */
  titulo: { type: String, required: true },

  /** URL de la imagen representativa */
  imagenUrl: { type: String, required: true },

  /** Lista de párrafos que conforman la historia */
  parrafos: [{ type: String }]
});

export default mongoose.model("Historia", HistoriaSchema);
