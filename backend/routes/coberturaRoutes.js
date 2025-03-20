
// routes/coberturaRoutes.js
import express from 'express';
import Cobertura from '../models/Cobertura.js';

const router = express.Router();

// ✅ Crear una nueva cobertura
router.post('/', async (req, res) => {
    const { nombre, descripcion, porcentajeCobertura, servicios } = req.body;

    try {
        const nuevaCobertura = await Cobertura.create({
            nombre,
            descripcion,
            porcentajeCobertura,
            servicios 
            
        });
        res.status(201).json({ mensaje: "Cobertura creada exitosamente.", cobertura: nuevaCobertura });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la cobertura", error: error.message });
    }
});

// 📄 Listar todas las coberturas
router.get('/', async (req, res) => {
    try {
        const coberturas = await Cobertura.find().populate('servicios'); 
        res.json(coberturas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las coberturas", error: error.message });
    }
});

// 🔍 Obtener una cobertura por ID
router.get('/:id', async (req, res) => {
    try {
        const cobertura = await Cobertura.findById(req.params.id);
        if (!cobertura) {
            return res.status(404).json({ mensaje: "Cobertura no encontrada." });
        }
        res.json(cobertura);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la cobertura", error: error.message });
    }
});

// ✏️ Actualizar una cobertura
router.put('/:id', async (req, res) => {
    const { nombre, descripcion, porcentajeCobertura, servicios } = req.body;

    try {
        const coberturaActualizada = await Cobertura.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, porcentajeCobertura, servicios},
            { new: true }
        );

        if (!coberturaActualizada) {
            return res.status(404).json({ mensaje: "Cobertura no encontrada." });
        }

        res.json({ mensaje: "Cobertura actualizada correctamente.", cobertura: coberturaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la cobertura", error: error.message });
    }
});

// ❌ Eliminar una cobertura
router.delete('/:id', async (req, res) => {
    try {
        const coberturaEliminada = await Cobertura.findByIdAndDelete(req.params.id);

        if (!coberturaEliminada) {
            return res.status(404).json({ mensaje: "Cobertura no encontrada." });
        }

        res.json({ mensaje: "Cobertura eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la cobertura", error: error.message });
    }
});

export default router;
