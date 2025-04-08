import mongoose from 'mongoose';

const PagoSchema = new mongoose.Schema({
    cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    poliza_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Poliza', required: true },
    pago: { type: Number, required: true },
    copago: { type: Number, required: false },
    fecha_pago: { type: Date, default: Date.now },
    estado_pago: { type: String, enum: ['aceptado', 'rechazado', ], required: true },
    motivo_rechazo: { type: String }
}, { timestamps: true });

export default mongoose.model('Pago', PagoSchema);
