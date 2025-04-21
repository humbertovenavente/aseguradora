import mongoose from 'mongoose';

/**
 * Esquema para la configuración de menús del sistema (principal o lateral).
 */
const menuSchema = new mongoose.Schema({
  /** Tipo de menú */
  tipo: { type: String, enum: ['principal', 'lateral'], required: true },

  /** Ítems que componen el menú */
  items: [
    {
      /** Título del ítem */
      titulo: String,
      /** Icono del ítem */
      icono: String,
      /** Ruta o path asociado */
      ruta: String,
      /** Permiso requerido para visualizar */
      permiso: { type: String, enum: ['ver', 'editar', 'crear', 'eliminar'], default: 'ver' }
    }
  ]
});

export default mongoose.model('Menu', menuSchema);
