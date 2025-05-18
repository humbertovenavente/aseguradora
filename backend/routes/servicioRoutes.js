import express from 'express';
import Servicio from '../models/Servicio.js';
import Hospital from '../models/Hospital.js';
import Cobertura from '../models/Cobertura.js';

const router = express.Router();

// Crear un nuevo servicio
// Crear un nuevo servicio
router.post('/', async (req, res) => {
    let {
      nombre,
      descripcion,
      precioAseguradora,
      hospitalesAprobados,
      servicioPadre,
      imagenUrl
    } = req.body;
  
    try {
      if (!hospitalesAprobados || hospitalesAprobados.length === 0) {
        const hospitales = await Hospital.find({ convenioActivo: true });
        hospitalesAprobados = hospitales.map(h => h._id);
      } else {
        hospitalesAprobados = hospitalesAprobados.map(h => typeof h === 'string' ? h : h._id);
      }
  
      const hospitalesExistentes = await Hospital.find({ _id: { $in: hospitalesAprobados } });
      if (hospitalesExistentes.length !== hospitalesAprobados.length) {
        return res.status(404).json({ mensaje: "Uno o más hospitales no existen." });
      }
  
      const nuevoServicio = await Servicio.create({
        nombre,
        descripcion,
        precioAseguradora,
        hospitalesAprobados,
        servicioPadre: servicioPadre || null,
        imagenUrl
      });
  
      res.status(201).json({ mensaje: "Servicio creado exitosamente.", servicio: nuevoServicio });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al crear el servicio", error: error.message });
    }
  });
  
  

// Listar todos los servicios
router.get('/', async (req, res) => {
  try {
    const servicios = await Servicio.find()
      .populate("servicioPadre", "nombre")
      .populate("hospitalesAprobados", "nombre direccion")
      .select("nombre descripcion precioAseguradora hospitalesAprobados servicioPadre imagenUrl");

    res.json(servicios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los servicios", error: error.message });
  }
});

// Obtener un servicio por ID
router.get('/:id', async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id)
      .populate('hospitalesAprobados', 'nombre direccion')
      .populate('servicioPadre', 'nombre');

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
  let {
    nombre,
    descripcion,
    precioAseguradora,
    hospitalesAprobados,
    servicioPadre,
    imagenUrl
  } = req.body;

  try {
    // Normalizar hospitales
    hospitalesAprobados = (hospitalesAprobados || []).map(h => typeof h === 'string' ? h : h._id);

    // Validar existencia
    const hospitalesExistentes = await Hospital.find({ _id: { $in: hospitalesAprobados } });
    if (hospitalesExistentes.length !== hospitalesAprobados.length) {
      return res.status(404).json({ mensaje: "Uno o más hospitales no existen." });
    }

    const servicioActualizado = await Servicio.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        descripcion,
        precioAseguradora,
        hospitalesAprobados,
        servicioPadre: servicioPadre || null,
        imagenUrl
      },
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

// Eliminar un servicio
router.delete('/:id', async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) {
      return res.status(404).json({ mensaje: "Servicio no encontrado." });
    }

    // Eliminar y limpiar referencia si tenía padre
    if (servicio.servicioPadre) {
      await Servicio.findByIdAndUpdate(servicio.servicioPadre, {
        $pull: { subservicios: servicio._id }
      });
    }

    await Servicio.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Servicio eliminado correctamente." });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el servicio", error: error.message });
  }
});

// Obtener servicios aprobados por hospital ID
router.get('/hospital/:hospitalId', async (req, res) => {
  try {
    const servicios = await Servicio.find({
      hospitalesAprobados: req.params.hospitalId
    }).select("nombre descripcion precioAseguradora");

    res.json(servicios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener servicios por hospital", error: error.message });
  }
});

export default router;
