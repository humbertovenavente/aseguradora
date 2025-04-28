import mongoose from 'mongoose';
import Cobertura from './Cobertura.js';
import Servicio from './Servicio.js';
import Poliza from './Poliza.js';

/**
 * Subdocumento del historial de servicios médicos utilizados por el cliente.
 * Incluye información sobre el hospital, servicio recibido, fecha, costo y copago.
 */
const HistorialServicioSchema = new mongoose.Schema({
  /**
   * Hospital donde se brindó el servicio.
   * @type {mongoose.Schema.Types.ObjectId}
   */
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },

  /**
   * Servicio médico prestado.
   * @type {mongoose.Schema.Types.ObjectId}
   */
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },

  /**
   * Fecha en la que se brindó el servicio.
   * @type {Date}
   */
  fechaServicio: { type: Date, default: Date.now },

  /**
   * Costo total del servicio brindado.
   * @type {Number}
   */
  costo: { type: Number, required: true },

  /**
   * Monto que debe pagar el cliente después de aplicar la cobertura.
   * @type {Number}
   */
  copago: { type: Number, default: 0 },

  /**
   * Estado del pago del copago (pendiente/pagado).
   * @type {String}
   */
  estadoCopago: { type: String, enum: ['pendiente', 'pagado'], default: 'pendiente' },

  /**
   * Comentarios adicionales sobre el servicio o tratamiento.
   * @type {String}
   */
  comentarios: { type: String },

  /**
   * Resultados del servicio médico (si aplica).
   * @type {String}
   */
  resultados: { type: String },
}, { _id: true });

/**
 * Esquema principal para clientes afiliados al seguro.
 * Contiene datos personales, información de afiliación y un historial de servicios utilizados.
 */
const ClienteSchema = new mongoose.Schema({
  /** Nombre del cliente */
  nombre: { type: String, required: true },

  /** Apellido del cliente */
  apellido: { type: String },

  /** Documento de identificación único (DPI u otro) */
  documento: { type: String, required: true, unique: true },

  /** Teléfono de contacto */
  telefono: { type: String },

  /** Fecha de nacimiento */
  fechaNacimiento: { type: Date },

  /** Dirección de residencia */
  direccion: { type: String },

  /** Número de afiliación único del cliente en la aseguradora */
  numeroAfiliacion: { type: String, required: true, unique: true },

  /** Referencia a la póliza contratada por el cliente */
  polizaId: { type: mongoose.Schema.Types.ObjectId, ref: "Poliza" },

  /** Nombre de la póliza (para mostrar rápidamente sin consultar) */
  polizaNombre: { type: String, required: true },

  /** Fecha de vencimiento de la póliza */
  fechaVencimiento: { type: Date },

  /** Estado actual del pago de la póliza */
  estadoPago: { type: Boolean, default: false },

  /** Usuario asociado al cliente (registro en la plataforma) */
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },

  /** Aseguradora responsable del cliente */
  aseguradora: { type: mongoose.Schema.Types.ObjectId, ref: "Seguro" },

  /** Historial de todos los servicios médicos utilizados por el cliente */
  historialServicios: [HistorialServicioSchema]

}, { timestamps: true });

/**
 * Middleware pre-save para calcular automáticamente el copago en base a la póliza y cobertura asociadas.
 * Se ejecuta antes de guardar un cliente nuevo o actualizado.
 */
ClienteSchema.pre('save', async function (next) {
    try {
        console.log(" Ejecutando middleware de cálculo de copago...");

        const poliza = await Poliza.findById(this.polizaId).populate("coberturaId");

        if (!poliza || !poliza.coberturaId) {
            console.log(`Póliza o cobertura no encontrada para el cliente.`);
            return next();
        }

        const porcentajeCobertura = poliza.coberturaId.porcentajeCobertura || 0;

        console.log(`Cobertura encontrada: ${porcentajeCobertura}%`);

        for (let i = 0; i < this.historialServicios.length; i++) {
            const servicioId = this.historialServicios[i].servicio;
            const servicio = await Servicio.findById(servicioId);
            if (!servicio) continue;

            const precioAseguradora = servicio.precioAseguradora || 0;
            const copagoCalculado = (precioAseguradora * (1 - (porcentajeCobertura / 100))).toFixed(2);
            this.historialServicios[i].copago = parseFloat(copagoCalculado);
        }

        next();
    } catch (error) {
        console.error("Error en el cálculo del copago:", error);
        next(error);
    }
});

export default mongoose.model("Cliente", ClienteSchema);
