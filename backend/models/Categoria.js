import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    // Si 'parent' es null, es una categoría principal; de lo contrario, es una subcategoría.
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', default: null }
}, { timestamps: true });

export default mongoose.model('Categoria', categoriaSchema);
