import mongoose from 'mongoose';

const HospitalSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    serviciosAprobados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' }],
    convenioActivo: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Hospital', HospitalSchema);
