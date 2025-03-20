import express from 'express';
import Servicio from '../models/Servicio.js';
import Hospital from '../models/Hospital.js';
import Cobertura from '../models/Cobertura.js';

const router = express.Router();

// Crear un nuevo servicio (puede ser un servicio principal o subservicio)

router.post('/', async (req, res) => {
    const { nombre, descripcion, precioAseguradora, hospitalAprobado, servicioPadre, imagenUrl } = req.body;

    try {
        // Verificar que el hospital exista
        const hospitalExistente = await Hospital.findById(hospitalAprobado);
        if (!hospitalExistente) {
            return res.status(404).json({ mensaje: "Hospital no encontrado." });
        }

        // Crear el nuevo servicio
        const nuevoServicio = await Servicio.create({
            nombre,
            descripcion,
            precioAseguradora,
            hospitalAprobado,
            servicioPadre: servicioPadre || null,
            imagenUrl
        });

        // Si el servicio tiene un padre, actualizarlo para agregar este subservicio
        if (servicioPadre) {
            await Servicio.findByIdAndUpdate(servicioPadre, {
                $push: { subservicios: nuevoServicio._id }
            });
        }

        // Agregar este servicio a TODAS las coberturas
        await Cobertura.updateMany({}, { $push: { servicios: nuevoServicio._id } });

        res.status(201).json({ mensaje: "Servicio creado y agregado a todas las coberturas exitosamente.", servicio: nuevoServicio });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el servicio", error: error.message });
    }
});


// Listar todos los servicios principales con sus subservicios y hospital asociado
// Listar todos los servicios principales con sus subservicios y hospital asociado
router.get('/', async (req, res) => {
    try {
        const servicios = await Servicio.find()
    .populate("servicioPadre", "nombre") // 🔹 Trae el nombre del servicio padre si existe
    .populate("hospitalAprobado", "nombre direccion")
    .select("nombre descripcion precioAseguradora hospitalAprobado servicioPadre imagenUrl"); // 📌 Incluir imagen


        res.json(servicios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los servicios", error: error.message });
    }
});


//  Obtener un servicio por ID con sus subservicios
router.get('/:id', async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id)
            .populate('subservicios', 'nombre descripcion precioAseguradora')
            .populate('hospitalAprobado', 'nombre direccion');

        if (!servicio) {
            return res.status(404).json({ mensaje: "Servicio no encontrado." });
        }

        res.json(servicio);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el servicio", error: error.message });
    }
});

// Actualizar un servicio
router.put('/:id', async (req, res) => {
    const { nombre, descripcion, precioAseguradora, hospitalAprobado, servicioPadre, imagenUrl  } = req.body;

    try {
        if (hospitalAprobado) {
            const hospitalExistente = await Hospital.findById(hospitalAprobado);
            if (!hospitalExistente) {
                return res.status(404).json({ mensaje: "Hospital no encontrado." });
            }
        }

        const servicioActualizado = await Servicio.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, precioAseguradora, hospitalAprobado, servicioPadre, imagenUrl  },
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

// Eliminar un servicio y actualizar su servicio padre
router.delete('/:id', async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);
        if (!servicio) {
            return res.status(404).json({ mensaje: "Servicio no encontrado." });
        }

        // Si el servicio tiene un servicio padre, removerlo de la lista de subservicios
        if (servicio.servicioPadre) {
            await Servicio.findByIdAndUpdate(servicio.servicioPadre, {
                $pull: { subservicios: servicio._id }
            });
        }

        // Eliminar el servicio
        await Servicio.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Servicio eliminado correctamente." });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el servicio", error: error.message });
    }
});

export default router;
