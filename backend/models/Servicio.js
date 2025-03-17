import mongoose from 'mongoose';

const ServicioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    categoria: { type: String, required: true },
    subcategoria: { type: String, required: true },
    precio: { type: Number, required: true, min: 0 },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
}, { timestamps: true });

export default mongoose.model('Servicio', ServicioSchema);

