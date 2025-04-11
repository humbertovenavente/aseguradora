import mongoose from 'mongoose';

const solicitudAtencionSchema = new mongoose.Schema({
  afiliado: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: "Servicio", required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  monto: Number,
  fechaServicio: { type: Date, default: Date.now },
  comentarios: String,
  resultados: String,
  estado: {
    type: String,
    default: 'pendiente'
  },
  numeroAutorizacion: String, 
}, { timestamps: true });

export default mongoose.model('SolicitudAtencion', solicitudAtencionSchema);
