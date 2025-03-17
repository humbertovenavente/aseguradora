import mongoose from 'mongoose';

const seguroSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    direccion: String,
    telefono: String,
    correo: String
});

export default mongoose.model('Seguro', seguroSchema);
