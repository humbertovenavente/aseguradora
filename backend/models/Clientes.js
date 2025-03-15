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
  hospital: { type: String, required: true },
  servicio: { type: String, required: true },
  fechaServicio: { type: Date, default: Date.now },
  costo: { type: Number, required: true },
  copago: { type: Number, default: 0 },
  comentarios: { type: String },
  resultados: { type: String },
  estadoAutorizacion: { type: String, default: 'Pendiente' },
  numeroAutorizacion: { type: String }
}, { _id: false });

/**
 * Esquema principal de "Cliente" en la Aseguradora
 */
const ClienteSchema = new mongoose.Schema({
  // Datos personales
  nombre: { type: String, required: true },
  apellido: { type: String },
  documento: { type: String, required: true, unique: true },
  telefono: { type: String },
  email: { type: String },
  fechaNacimiento: { type: Date },
  direccion: { type: String },

  // Información de la póliza
  numeroAfiliacion: { type: String, required: true, unique: true },
  tipoPoliza: { type: String, enum: ['70%', '90%'], default: '70%' },
  porcentajeCobertura: { type: Number, default: 70 },
  fechaVencimiento: { type: Date },
  estadoPago: { type: Boolean, default: false },

  // Campo global para rechazar recetas/servicios menores a cierto monto
  montoMinimoCobertura: { type: Number, default: 250.0 },

  // Historial de servicios (lo que el cliente ya usó)
  historialServicios: [HistorialServicioSchema]

}, { timestamps: true });

// Exportamos como default para ES Modules
export default mongoose.model('Cliente', ClienteSchema);
