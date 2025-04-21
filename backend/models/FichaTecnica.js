import mongoose from 'mongoose';

/**
 * Esquema de Ficha Técnica del Cliente en la aseguradora.
 * Contiene historial de servicios con copagos, comentarios y resultados.
 */
const FichaTecnicaSchema = new mongoose.Schema({
  /** Cliente relacionado con la ficha técnica */
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },

  /** Usuario que registró la ficha */
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },

  /** Seguro asociado a la ficha técnica */
  seguroId: { type: mongoose.Schema.Types.ObjectId, ref: "Seguro", required: true },

  /** Fecha de creación de la ficha */
  fechaCreacion: { type: Date, default: Date.now },

  /** Historial de servicios utilizados */
  historialServicios: [
    {
      hospital: { type: String },
      servicio: {
        _id: mongoose.Schema.Types.ObjectId,
        nombre: String,
        descripcion: String,
        precioAseguradora: Number
      },
      fechaServicio: Date,
      costo: Number,
      copago: Number,
      estadoCopago: String,
      comentarios: String,
      resultados: String
    }
  ]
}, { timestamps: true });

export default mongoose.model('FichaTecnica', FichaTecnicaSchema);
