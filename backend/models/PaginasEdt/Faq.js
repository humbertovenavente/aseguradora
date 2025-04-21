import mongoose from "mongoose";

/**
 * Subdocumento para cada ítem de FAQ (pregunta-respuesta).
 */
const FaqItemSchema = new mongoose.Schema({
  /** Pregunta frecuente */
  pregunta: { type: String, required: true },

  /** Respuesta asociada a la pregunta */
  respuesta: { type: String, required: true }
});

/**
 * Esquema que agrupa varias preguntas frecuentes (FAQs).
 */
const FaqSchema = new mongoose.Schema({
  /** Arreglo de ítems de preguntas y respuestas */
  items: [FaqItemSchema]
});

export default mongoose.model("Faq", FaqSchema);
