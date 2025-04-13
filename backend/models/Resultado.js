import mongoose from "mongoose";

const ResultadoSchema = new mongoose.Schema({
  idCita: { type: String, required: true },
  diagnostico: { type: String, required: true },
  resultados: { type: String, required: true },
  fecha: { type: Date, required: true },
  documento: { type: String },
  nombre: { type: String },
  apellido: { type: String },
  doctor: { type: String },
}, { timestamps: true });

export default mongoose.model("Resultado", ResultadoSchema);
