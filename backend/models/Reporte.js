import mongoose from "mongoose";

const ServicioReporteSchema = new mongoose.Schema({
  servicioNombre: String,
  fecha: Date,
  copago: Number,
  costoTotal: Number,
  clienteNombre: String
}, { _id: false });

const ReporteSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['hospital', 'farmacia'], required: true },
  entidadId: { type: mongoose.Schema.Types.ObjectId, refPath: 'tipo' },
  nombreEntidad: String,
  correoDestino: String,
  periodo: String, // Ej: "2025-04"
  servicios: [ServicioReporteSchema],
  totalMes: Number,
  fechaGeneracion: { type: Date, default: Date.now },
  archivoExcelUrl: String // Ruta local o URL si lo subís a un servidor
});

export default mongoose.model("Reporte", ReporteSchema);
