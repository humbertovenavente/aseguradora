import mongoose from 'mongoose';

const ServicioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precioAseguradora: { type: Number, required: true, min: 0 }, 
    hospitalAprobado: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    // Relación Many-to-One: Si es null, es un servicio principal; si tiene un valor, es un subservicio.
    servicioPadre: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', default: null },
    // Relación One-to-Many: Un servicio puede tener múltiples subservicios
    subservicios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' }],
    imagenUrl: { type: String } // 📌 Agregado para manejar imágenes
}, { timestamps: true });

export default mongoose.model('Servicio', ServicioSchema);
