import express from 'express';
import Categoria from '../models/Categoria.js';

const router = express.Router();

// ✅ Crear una nueva categoría o subcategoría
router.post('/', async (req, res) => {
    const { nombre, parent } = req.body;
    try {
        // Si se envía 'parent', verificar que la categoría padre exista
        if (parent) {
            const categoriaPadre = await Categoria.findById(parent);
            if (!categoriaPadre) {
                return res.status(404).json({ mensaje: "Categoría padre no encontrada." });
            }
        }
        
        const nuevaCategoria = await Categoria.create({
            nombre,
            parent: parent || null
        });

        res.status(201).json({ mensaje: "Categoría creada exitosamente.", categoria: nuevaCategoria });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la categoría", error: error.message });
    }
});

// 📄 Listar todas las categorías (y subcategorías)
router.get('/', async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las categorías", error: error.message });
    }
});

// 🔍 Obtener una categoría por ID
router.get('/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ mensaje: "Categoría no encontrada." });
        }
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la categoría", error: error.message });
    }
});

// ✏️ Actualizar una categoría o subcategoría
router.put('/:id', async (req, res) => {
    const { nombre, parent } = req.body;
    try {
        // Si se envía 'parent', verificar que la categoría padre exista
        if (parent) {
            const categoriaPadre = await Categoria.findById(parent);
            if (!categoriaPadre) {
                return res.status(404).json({ mensaje: "Categoría padre no encontrada." });
            }
        }

        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            req.params.id,
            { nombre, parent: parent || null },
            { new: true }
        );

        if (!categoriaActualizada) {
            return res.status(404).json({ mensaje: "Categoría no encontrada." });
        }

        res.json({ mensaje: "Categoría actualizada correctamente.", categoria: categoriaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la categoría", error: error.message });
    }
});

// ❌ Eliminar una categoría o subcategoría
router.delete('/:id', async (req, res) => {
    try {
        const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);
        if (!categoriaEliminada) {
            return res.status(404).json({ mensaje: "Categoría no encontrada." });
        }
        res.json({ mensaje: "Categoría eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la categoría", error: error.message });
    }
});

export default router;
