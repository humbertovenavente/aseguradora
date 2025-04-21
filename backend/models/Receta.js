import mongoose from "mongoose";

/**
 * Esquema para recetas médicas aprobadas o rechazadas por farmacia.
 */
const recetaSchema = new mongoose.Schema({
  /** Código único de la receta */
  idReceta: { type: String, required: true },

  /** Nombre de la farmacia que procesó la receta */
  farmacia: { type: String, required: true },

  /** Monto total de la receta */
  monto: { type: Number, required: true },

  /** Estado de la receta: aprobada o rechazada */
  estado: { type: String, enum: ['aprobada', 'rechazada'], required: true },

  /** Cliente relacionado */
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },

  /** Descuento aplicado, si aplica */
  descuento: { type: Number, default: 0 },

  /** Fecha de emisión de la receta */
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model("Receta", recetaSchema);
