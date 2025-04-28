import mongoose from "mongoose";

/**
 * Subdocumento para representar cada servicio en un reporte.
 */
const ServicioReporteSchema = new mongoose.Schema({
  servicioNombre: String,
  fecha: Date,
  copago: Number,
  costoTotal: Number,
  clienteNombre: String
}, { _id: false });

/**
 * Esquema para reportes mensuales generados por hospital o farmacia.
 */
const ReporteSchema = new mongoose.Schema({
  /** Tipo de reporte: hospital o farmacia */
  tipo: { type: String, enum: ['hospital', 'farmacia'], required: true },

  /** ID de la entidad (hospital o farmacia) */
  entidadId: { type: mongoose.Schema.Types.ObjectId, refPath: 'tipo' },

  /** Nombre de la entidad */
  nombreEntidad: String,

  /** Correo de destino para el envío del reporte */
  correoDestino: String,

  /** Período del reporte en formato YYYY-MM */
  periodo: String,

  /** Detalle de los servicios incluidos en el reporte */
  servicios: [ServicioReporteSchema],

  /** Total del mes (suma de servicios) */
  totalMes: Number,

  /** Fecha en la que se generó el reporte */
  fechaGeneracion: { type: Date, default: Date.now },

  /** URL o ruta local del archivo Excel generado */
  archivoExcelUrl: String
});

export default mongoose.model("Reporte", ReporteSchema);
