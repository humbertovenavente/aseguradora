import mongoose from 'mongoose';

/**
 * Esquema para las categorías de servicios médicos o productos.
 * Puede ser categoría principal o subcategoría si tiene un padre.
 */
const categoriaSchema = new mongoose.Schema({
  /**
   * Nombre de la categoría.
   * @type {String}
   */
  nombre: { type: String, required: true },

  /**
   * Referencia a la categoría padre (si aplica).
   * Si es null, es una categoría principal.
   * @type {mongoose.Schema.Types.ObjectId|null}
   */
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', default: null }
}, { timestamps: true });

export default mongoose.model('Categoria', categoriaSchema);
