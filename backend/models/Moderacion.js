import mongoose from "mongoose";

/**
 * Esquema para moderación de contenido editable en el sistema (páginas, secciones, etc).
 */
const moderacionSchema = new mongoose.Schema({
  /** Página a la que pertenece el contenido */
  pagina: {
    type: String,
    required: true
  },

  /** Contenido propuesto/modificado */
  contenido: {
    type: Object,
    required: true
  },

  /** Estado del proceso de moderación */
  estado: {
    type: String,
    enum: ["pendiente", "aprobado", "rechazado"],
    default: "pendiente"
  },

  /** Comentario del revisor si fue rechazado */
  comentarioRechazo: {
    type: String,
    default: ""
  },

  /** Nombre del creador o editor */
  creadoPor: {
    type: String,
    required: false
  }
}, { timestamps: true });

export default mongoose.model("Moderacion", moderacionSchema);
