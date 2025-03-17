import express from 'express';
import Hospital from '../models/Hospital.js';
import Servicio from '../models/Servicio.js';


const router = express.Router();

// ✅ Crear un nuevo hospital
router.post('/', async (req, res) => {
    const { nombre, direccion, telefono, serviciosAprobados, convenioActivo } = req.body;

    try {
        const nuevoHospital = await Hospital.create({
            nombre,
            direccion,
            telefono,
            serviciosAprobados,
            convenioActivo
        });
        res.status(201).json({ mensaje: "Hospital creado exitosamente.", hospital: nuevoHospital });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el hospital", error: error.message });
    }
});

// 📄 Listar todos los hospitales
router.get('/', async (req, res) => {
    try {
        const hospitales = await Hospital.find().populate('serviciosAprobados');
        res.json(hospitales);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los hospitales", error: error.message });
    }
});

// 🔍 Obtener un hospital por ID
router.get('/:id', async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id).populate('serviciosAprobados');
        if (!hospital) {
            return res.status(404).json({ mensaje: "Hospital no encontrado." });
        }
        res.json(hospital);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el hospital", error: error.message });
    }
});

// ✏️ Actualizar un hospital
router.put('/:id', async (req, res) => {
    const { nombre, direccion, telefono, serviciosAprobados, convenioActivo } = req.body;

    try {
        const hospitalActualizado = await Hospital.findByIdAndUpdate(
            req.params.id,
            { nombre, direccion, telefono, serviciosAprobados, convenioActivo },
            { new: true }
        );

        if (!hospitalActualizado) {
            return res.status(404).json({ mensaje: "Hospital no encontrado." });
        }

        res.json({ mensaje: "Hospital actualizado correctamente.", hospital: hospitalActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el hospital", error: error.message });
    }
});

// ❌ Eliminar un hospital
router.delete('/:id', async (req, res) => {
    try {
        const hospitalEliminado = await Hospital.findByIdAndDelete(req.params.id);

        if (!hospitalEliminado) {
            return res.status(404).json({ mensaje: "Hospital no encontrado." });
        }

        res.json({ mensaje: "Hospital eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el hospital", error: error.message });
    }
});

export default router;
