import express from 'express';
import Seguro from '../models/Seguro.js';

const router = express.Router();

// ✅ Crear un nuevo seguro
router.post('/', async (req, res) => {
    const { nombre, tipoCobertura, coberturaId, costo, vigencia, id_seguro } = req.body;

    // Verifica lo que llega al backend
    console.log('Datos recibidos:', req.body);

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
        console.error("Error al crear la póliza:", error); // Más detalles del error
        res.status(500).json({ mensaje: "Error al crear la póliza", error: error.message });
    }
});


// 📄 Listar todos los seguros
router.get('/', async (req, res) => {
    try {
        const seguros = await Seguro.find();
        res.json(seguros);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los seguros", error: error.message });
    }
});

// 🔍 Obtener un seguro por ID
router.get('/:id', async (req, res) => {
    try {
        const seguro = await Seguro.findById(req.params.id);
        if (!seguro) {
            return res.status(404).json({ mensaje: "Seguro no encontrado." });
        }
        res.json(seguro);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el seguro", error: error.message });
    }
});

// ✏️ Actualizar un seguro
router.put('/:id', async (req, res) => {
    const { nombre, codigo, direccion, telefono, correo } = req.body;

    try {
        const seguroActualizado = await Seguro.findByIdAndUpdate(
            req.params.id,
            { nombre, codigo, direccion, telefono, correo },
            { new: true }
        );

        if (!seguroActualizado) {
            return res.status(404).json({ mensaje: "Seguro no encontrado." });
        }

        res.json({ mensaje: "Seguro actualizado correctamente.", seguro: seguroActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el seguro", error: error.message });
    }
});

// ❌ Eliminar un seguro
router.delete('/:id', async (req, res) => {
    try {
        const seguroEliminado = await Seguro.findByIdAndDelete(req.params.id);

        if (!seguroEliminado) {
            return res.status(404).json({ mensaje: "Seguro no encontrado." });
        }

        res.json({ mensaje: "Seguro eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el seguro", error: error.message });
    }
});

export default router;
