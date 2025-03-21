import mongoose from 'mongoose';
import Cobertura from './Cobertura.js'; // Importar Cobertura para calcular el copago
import Servicio from './Servicio.js';
import Poliza from './Poliza.js';

const HistorialServicioSchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },
  fechaServicio: { type: Date, default: Date.now },
  costo: { type: Number, required: true },
  copago: { type: Number, default: 0 },  // Se calculará automáticamente
  estadoCopago: { type: String, enum: ['pendiente', 'pagado'], default: 'pendiente' },
  comentarios: { type: String },
  resultados: { type: String },
}, { _id: true }); // Le decimos a Mongoose que genere un _id por cada historial

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

  historialServicios: [HistorialServicioSchema]

}, { timestamps: true });

/**
 * este es el TRIGGER PARA CALCULAR AUTOMATICAMENTE EL COPAGO PMiddleware `pre-save` para calcular el copago automáticamente
 */
ClienteSchema.pre('save', async function (next) {
    try {
        console.log("🟢 Ejecutando middleware de cálculo de copago...");

        const poliza = await Poliza.findById(this.polizaId).populate("coberturaId");

        if (!poliza || !poliza.coberturaId) {
            console.log(`⚠️ Póliza o cobertura no encontrada para el cliente.`);
            return next();
        }

        const porcentajeCobertura = poliza.coberturaId.porcentajeCobertura || 0;

        console.log(`✅ Cobertura encontrada: ${porcentajeCobertura}%`);

        for (let i = 0; i < this.historialServicios.length; i++) {
            const servicioId = this.historialServicios[i].servicio;
            const servicio = await Servicio.findById(servicioId); // Asegurar que obtiene el último dato

            if (!servicio) continue;

            const precioAseguradora = servicio.precioAseguradora || 0; // Obtener precio actualizado

            // 📌 Mantener el costo del hospital y calcular el copago basado en `precioAseguradora`
            const copagoCalculado = (precioAseguradora * (1 - (porcentajeCobertura / 100))).toFixed(2);
            this.historialServicios[i].copago = parseFloat(copagoCalculado);
        }

        next();
    } catch (error) {
        console.error("❌ Error en el cálculo del copago:", error);
        next(error);
    }
});






export default mongoose.model("Cliente", ClienteSchema);
