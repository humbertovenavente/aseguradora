import mongoose from 'mongoose';

const CoberturaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    porcentajeCobertura: { type: Number, required: true, min: 0, max: 100 },
    montoMinimoCobertura: { type: Number, default: 250.0, required: false  },
    servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' }]  // Relación con servicios
}, { timestamps: true });

export default mongoose.model('Cobertura', CoberturaSchema);
