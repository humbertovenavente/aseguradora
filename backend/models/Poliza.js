import mongoose from 'mongoose';

const PolizaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipoCobertura: { type: String, required: true },
    porcentajeCobertura: { type: Number, required: true, min: 0, max: 100 },
    costo: { type: Number, required: true },
    vigencia: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('Poliza', PolizaSchema);
