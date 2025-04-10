import mongoose from 'mongoose';

/**
 * Esquema de Ficha Técnica del Cliente en la aseguradora
 */
const FichaTecnicaSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  seguroId: { type: mongoose.Schema.Types.ObjectId, ref: "Seguro", required: true },
  fechaCreacion: { type: Date, default: Date.now },

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
