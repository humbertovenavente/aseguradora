import mongoose from 'mongoose';

const AseguradoraSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String },
  telefono: { type: String }
});

export default mongoose.model("Aseguradora", AseguradoraSchema);
