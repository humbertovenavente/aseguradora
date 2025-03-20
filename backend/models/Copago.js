import mongoose from 'mongoose';

const CopagoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },
  poliza: { type: mongoose.Schema.Types.ObjectId, ref: 'Poliza', required: true },
  cobertura: { type: mongoose.Schema.Types.ObjectId, ref: 'Cobertura', required: true },
  porcentajeCobertura: { type: Number, required: true },
  costoRealServicio: { type: Number, required: true },
  montoCopago: { type: Number, required: true },
  estado: { type: String, enum: ['pendiente', 'pagado'], default: 'pendiente' },
}, { timestamps: true });

export default mongoose.model('Copago', CopagoSchema);
