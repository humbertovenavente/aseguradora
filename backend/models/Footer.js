import mongoose from "mongoose";

/**
 * Esquema para el contenido del footer del sistema.
 */
const footerSchema = new mongoose.Schema({
  /** Contenido del footer en formato de texto o HTML */
  contenido: { type: String, required: true }
});

export default mongoose.model("Footer", footerSchema);
