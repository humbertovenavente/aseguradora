import mongoose from 'mongoose'; 

const PolizaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    coberturaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cobertura', required: true },
    costo: { type: Number, required: true },
    vigencia: { type: Date, required: true },
    id_seguro: { type: mongoose.Schema.Types.ObjectId, ref: 'Seguro' }
}, { timestamps: true });

export default mongoose.model('Poliza', PolizaSchema);



