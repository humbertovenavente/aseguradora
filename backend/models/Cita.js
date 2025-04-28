import mongoose from "mongoose";

/**
 * Esquema para registrar citas médicas.
 * Incluye paciente, hospital, servicio, horario y diagnóstico.
 */
const CitaSchema = new mongoose.Schema({
  /**
   * Fecha de la cita.
   * @type {Date}
   */
  fecha: { type: Date, required: true },

  /**
   * Cliente/Paciente que recibe la cita.
   * @type {mongoose.Schema.Types.ObjectId}
   */
  idPaciente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },

  /**
   * Doctor asignado a la cita (puede estar vacío inicialmente).
   * @type {mongoose.Schema.Types.ObjectId}
   */
  idDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: false, default: null },

  /**
   * Motivo o razón de la cita.
   * @type {String}
   */
  motivo: { type: String, required: false, maxlength: 200 },

  /**
   * Hospital donde se atenderá la cita.
   * @type {mongoose.Schema.Types.ObjectId}
   */
  idHospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },

  /**
   * Servicio médico solicitado.
   * @type {mongoose.Schema.Types.ObjectId}
   */
  idServicio: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio", required: true },

  /**
   * Estado actual de la cita.
   * @type {"Pendiente"|"Confirmada"|"Cancelada"|"Completada"}
   */
  estado: { type: String, enum: ["Pendiente", "Confirmada", "Cancelada", "Completada"], default: "Pendiente" },

  /**
   * Hora de inicio (formato HH:MM).
   * @type {String}
   */
  horaInicio: { type: String, required: true },

  /**
   * Hora de finalización (opcional).
   * @type {String}
   */
  horaFin: { type: String, required: false },

  /**
   * Aseguradora asociada si aplica.
   * @type {mongoose.Schema.Types.ObjectId}
   */
  idAseguradora: { type: mongoose.Schema.Types.ObjectId, ref: "Seguro", required: false },

  /**
   * Número de autorización del seguro.
   * @type {String}
   */
  numeroAutorizacion: { type: String, default: null },

  /**
   * Diagnóstico médico dado durante la cita.
   * @type {String}
   */
  diagnostico: { type: String, required: false, maxlength: 4000 },

  /**
   * Resultados derivados de la cita (pruebas, observaciones, etc).
   * @type {String}
   */
  resultados: { type: String, required: false, maxlength: 4000 }

}, { timestamps: true });

export default mongoose.model("Cita", CitaSchema);
