import express from 'express';
import Servicio from '../models/Servicio.js';
import Hospital from '../models/Hospital.js';

const router = express.Router();

// ✅ Crear un nuevo servicio
router.post('/', async (req, res) => {
    const { nombre, descripcion, categoria, subcategoria, precio, hospital } = req.body;

    try {
        // Verificar que el hospital exista
        const hospitalExistente = await Hospital.findById(hospital);
        if (!hospitalExistente) {
            return res.status(404).json({ mensaje: "Hospital no encontrado." });
        }

        const nuevoServicio = await Servicio.create({
            nombre,
            descripcion,
            categoria,
            subcategoria,
            precio,
            hospital
        });

        res.status(201).json({ mensaje: "Servicio creado exitosamente.", servicio: nuevoServicio });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el servicio", error: error.message });
    }
});

// 📄 Listar todos los servicios con información del hospital
router.get('/', async (req, res) => {
    try {
        const servicios = await Servicio.find().populate('hospital', 'nombre direccion');
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los servicios", error: error.message });
    }
});

// 🔍 Obtener un servicio por ID
router.get('/:id', async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id).populate('hospital', 'nombre direccion');
        if (!servicio) {
            return res.status(404).json({ mensaje: "Servicio no encontrado." });
        }
        res.json(servicio);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el servicio", error: error.message });
    }
});

// ✏️ Actualizar un servicio
router.put('/:id', async (req, res) => {
    const { nombre, descripcion, categoria, subcategoria, precio, hospital } = req.body;

    try {
        if (hospital) {
            const hospitalExistente = await Hospital.findById(hospital);
            if (!hospitalExistente) {
                return res.status(404).json({ mensaje: "Hospital no encontrado." });
            }
        }

        const servicioActualizado = await Servicio.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, categoria, subcategoria, precio, hospital },
            { new: true }
        );

        if (!servicioActualizado) {
            return res.status(404).json({ mensaje: "Servicio no encontrado." });
        }

        res.json({ mensaje: "Servicio actualizado correctamente.", servicio: servicioActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el servicio", error: error.message });
    }
});

// ❌ Eliminar un servicio
router.delete('/:id', async (req, res) => {
    try {
        const servicioEliminado = await Servicio.findByIdAndDelete(req.params.id);
        if (!servicioEliminado) {
            return res.status(404).json({ mensaje: "Servicio no encontrado." });
        }
        res.json({ mensaje: "Servicio eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el servicio", error: error.message });
    }
});

export default router;
