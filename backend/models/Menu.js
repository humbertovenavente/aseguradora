import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['principal', 'lateral'], required: true },
  items: [
    {
      titulo: String,
      icono: String,
      ruta: String,
      permiso: { type: String, enum: ['ver', 'editar', 'crear', 'eliminar'], default: 'ver' }
    }
  ]
});

export default mongoose.model('Menu', menuSchema);
