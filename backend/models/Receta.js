import mongoose from "mongoose";

const recetaSchema = new mongoose.Schema({
  idReceta: { type: String, required: true },
  farmacia: { type: String, required: true },
  monto: { type: Number, required: true },
  estado: { type: String, enum: ['aprobada', 'rechazada'], required: true },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" }, // ← para trazabilidad
  descuento: { type: Number, default: 0 },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model("Receta", recetaSchema);
