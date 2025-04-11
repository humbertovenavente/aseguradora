import mongoose from 'mongoose';

const farmaciaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    estado: {
      type: String,
      enum: ["pendiente", "aprobado", "rechazado"],
      default: "pendiente"
    }
}, { timestamps: true });

export default mongoose.model('Farmacia', farmaciaSchema, 'farmacias');
