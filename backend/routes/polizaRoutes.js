import express from 'express';
import Poliza from '../models/Poliza.js';

const router = express.Router();

// 📌 Crear una póliza
router.post('/', async (req, res) => {
    try {
        const nuevaPoliza = new Poliza(req.body);
        await nuevaPoliza.save();
        res.status(201).json({ message: '✅ Póliza creada exitosamente', poliza: nuevaPoliza });
    } catch (error) {
        res.status(500).json({ error: '❌ Error al crear la póliza', details: error.message });
    }
});

// 📌 Obtener todas las pólizas
router.get('/', async (req, res) => {
    try {
        const polizas = await Poliza.find();
        res.status(200).json(polizas);
    } catch (error) {
        res.status(500).json({ error: '❌ Error al obtener las pólizas' });
    }
});

// 📌 Obtener una póliza por ID
router.get('/:id', async (req, res) => {
    try {
        const poliza = await Poliza.findById(req.params.id);
        if (!poliza) return res.status(404).json({ message: '❌ Póliza no encontrada' });
        res.status(200).json(poliza);
    } catch (error) {
        res.status(500).json({ error: '❌ Error al obtener la póliza' });
    }
});

// 📌 Modificar una póliza
router.put('/:id', async (req, res) => {
    try {
        const polizaActualizada = await Poliza.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!polizaActualizada) return res.status(404).json({ message: '❌ Póliza no encontrada' });
        res.status(200).json({ message: '✅ Póliza actualizada', poliza: polizaActualizada });
    } catch (error) {
        res.status(500).json({ error: '❌ Error al actualizar la póliza' });
    }
});

// 📌 Eliminar una póliza
router.delete('/:id', async (req, res) => {
    try {
        const polizaEliminada = await Poliza.findByIdAndDelete(req.params.id);
        if (!polizaEliminada) return res.status(404).json({ message: '❌ Póliza no encontrada' });
        res.status(200).json({ message: '✅ Póliza eliminada' });
    } catch (error) {
        res.status(500).json({ error: '❌ Error al eliminar la póliza' });
    }
});

export default router;
