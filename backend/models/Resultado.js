import mongoose from "mongoose";

/**
 * Esquema para resultados médicos enviados desde el hospital.
 * Incluye diagnóstico, resultados y datos del paciente.
 */
const ResultadoSchema = new mongoose.Schema({
  /** ID de la cita médica */
  idCita: { type: String, required: true },

  /** Diagnóstico médico final */
  diagnostico: { type: String, required: true },

  /** Resultados médicos entregados */
  resultados: { type: String, required: true },

  /** Fecha de emisión del resultado */
  fecha: { type: Date, required: true },

  /** Documento del paciente */
  documento: { type: String },

  /** Nombre del paciente */
  nombre: { type: String },

  /** Apellido del paciente */
  apellido: { type: String },

  /** Doctor que emitió el resultado */
  doctor: { type: String }
}, { timestamps: true });

export default mongoose.model("Resultado", ResultadoSchema);
