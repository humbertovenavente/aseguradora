import mongoose from 'mongoose';

/**
 * Esquema para las pólizas disponibles en la aseguradora.
 */
const PolizaSchema = new mongoose.Schema({
  /** Nombre de la póliza */
  nombre: { type: String, required: true },

  /** Referencia a la cobertura asociada */
  coberturaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cobertura', required: true },

  /** Costo total de la póliza */
  costo: { type: Number, required: true },

  /** Fecha de vencimiento */
  vigencia: { type: Date, required: true },

  /** ID del seguro que emite la póliza */
  id_seguro: { type: mongoose.Schema.Types.ObjectId, ref: 'Seguro' }
}, { timestamps: true });

export default mongoose.model('Poliza', PolizaSchema);
