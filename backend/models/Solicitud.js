import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  afiliado: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio", required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  monto: Number,
  fechaServicio: Date,
  comentarios: String,
  resultados: String,
  estado: {
    type: String,
    default: 'pendiente'
  }
}, { timestamps: true });

export default mongoose.model('Solicitud', solicitudSchema);
