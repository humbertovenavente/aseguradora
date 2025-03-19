import mongoose from 'mongoose';

/**
 * Esquema de Ficha Técnica del Cliente en la aseguradora
 */
const FichaTecnicaSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  seguroId: { type: mongoose.Schema.Types.ObjectId, ref: "Seguro", required: true },
  fechaCreacion: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('FichaTecnica', FichaTecnicaSchema);
