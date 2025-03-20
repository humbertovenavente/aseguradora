import mongoose from "mongoose";

const CitaSchema = new mongoose.Schema({
    fecha: { type: Date, required: true }, // Fecha de la cita
    idPaciente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true }, // Cliente/Paciente
    idDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: false, default: null }, // Se asigna después
    motivo: { type: String, required: false, maxlength: 200 }, // Razón de la cita
    idHospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true }, // Hospital asignado
    idServicio: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio", required: true }, // Tipo de servicio solicitado
    estado: { type: String, enum: ["Pendiente", "Confirmada", "Cancelada", "Completada"], default: "Pendiente" }, // Estado de la cita
    horaInicio: { type: String, required: true }, // Hora de inicio (Formato HH:MM)
    horaFin: { type: String, required: false }, // Hora de finalización
    idAseguradora: { type: mongoose.Schema.Types.ObjectId, ref: "Seguro", required: false }, // ID de la aseguradora si aplica
    numeroAutorizacion: { type: String, default: null }, // Número de autorización si es aprobado por el seguro
    diagnostico: { type: String, required: false, maxlength: 4000 }, // Diagnóstico médico
    resultados: { type: String, required: false, maxlength: 4000 } // Resultados de la cita
}, { timestamps: true });

export default mongoose.model("Cita", CitaSchema);
