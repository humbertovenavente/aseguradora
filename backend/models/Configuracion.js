import mongoose from "mongoose";

/**
 * Esquema para variables de configuración clave-valor en la plataforma.
 * Permite guardar settings dinámicos.
 */
const configSchema = new mongoose.Schema({
  /** Clave única de la configuración */
  clave: { type: String, required: true, unique: true },

  /** Valor asociado (puede ser cualquier tipo de dato) */
  valor: mongoose.Schema.Types.Mixed
});

export default mongoose.model('Configuracion', configSchema);
