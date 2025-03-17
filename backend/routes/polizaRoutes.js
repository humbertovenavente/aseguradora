import express from 'express';
import Poliza from '../models/Poliza.js';

const router = express.Router();

// ✅ Crear una nueva póliza
router.post('/', async (req, res) => {
    const { nombre, tipoCobertura, coberturaId, costo, vigencia, id_seguro } = req.body;

    try {
        const nuevaPoliza = await Poliza.create({
            nombre,
            tipoCobertura,
            coberturaId,
            costo,
            vigencia,
            id_seguro
        });
        res.status(201).json({ mensaje: "Póliza creada exitosamente.", poliza: nuevaPoliza });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la póliza", error: error.message });
    }
});

// 📄 Listar todas las pólizas con datos de cobertura y seguro asociados
router.get('/', async (req, res) => {
    try {
        const polizas = await Poliza.find()
            .populate('id_seguro')       // Poblamos los datos del seguro
            .populate('coberturaId');    // Poblamos los datos de la cobertura
        res.json(polizas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las pólizas", error: error.message });
    }
});

// 🔍 Obtener una póliza por ID
router.get('/:id', async (req, res) => {
    try {
        const poliza = await Poliza.findById(req.params.id)
            .populate('id_seguro')
            .populate('coberturaId');

        if (!poliza) {
            return res.status(404).json({ mensaje: "Póliza no encontrada." });
        }
        res.json(poliza);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la póliza", error: error.message });
    }
});

// ✏️ Actualizar una póliza
router.put('/:id', async (req, res) => {
    const { nombre, tipoCobertura, coberturaId, costo, vigencia, id_seguro } = req.body;

    try {
        const polizaActualizada = await Poliza.findByIdAndUpdate(
            req.params.id,
            { nombre, tipoCobertura, coberturaId, costo, vigencia, id_seguro },
            { new: true }
        );

        if (!polizaActualizada) {
            return res.status(404).json({ mensaje: "Póliza no encontrada." });
        }

        res.json({ mensaje: "Póliza actualizada correctamente.", poliza: polizaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la póliza", error: error.message });
    }
});

// ❌ Eliminar una póliza
router.delete('/:id', async (req, res) => {
    try {
        const polizaEliminada = await Poliza.findByIdAndDelete(req.params.id);

        if (!polizaEliminada) {
            return res.status(404).json({ mensaje: "Póliza no encontrada." });
        }

        res.json({ mensaje: "Póliza eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la póliza", error: error.message });
    }
});

export default router;
