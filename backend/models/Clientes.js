import mongoose from 'mongoose';

/**
 * Subdocumento que registra cada servicio usado por el cliente:
 * - hospital: nombre o código del hospital
 * - servicio: tipo o nombre del servicio (ej. consulta, laboratorio)
 * - fechaServicio: fecha en que se prestó
 * - costo: costo total del servicio
 * - copago: monto pagado por el cliente (según cobertura)
 * - comentarios, resultados: info adicional
 * - estadoAutorizacion: Aprobado, Rechazado, Pendiente, etc.
 * - numeroAutorizacion: si se aprobó, el número que emite el sistema
 */
const HistorialServicioSchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },
  fechaServicio: { type: Date, default: Date.now },
  costo: { type: Number, required: true },
  copago: { type: Number, default: 0 },
  comentarios: { type: String },
  resultados: { type: String },
}, { _id: false });

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String },
  documento: { type: String, required: true, unique: true },
  telefono: { type: String },
  fechaNacimiento: { type: Date },
  direccion: { type: String },

  numeroAfiliacion: { type: String, required: true, unique: true },
  polizaId: { type: mongoose.Schema.Types.ObjectId, ref: "Poliza" },
  polizaNombre: { type: String, required: true },
  fechaVencimiento: { type: Date },
  estadoPago: { type: Boolean, default: false },
 

  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },

     // Historial de servicios utilizados
  historialServicios: [HistorialServicioSchema] 

}, { timestamps: true });

export default mongoose.model("Cliente", ClienteSchema);