import mongoose from "mongoose"; // ← ESTA LÍNEA ES IMPORTANTE

const configSchema = new mongoose.Schema({
  clave: { type: String, required: true, unique: true },
  valor: mongoose.Schema.Types.Mixed
});

export default mongoose.model('Configuracion', configSchema);
