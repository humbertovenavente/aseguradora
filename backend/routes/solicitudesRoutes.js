import express from 'express';
import axios from 'axios'; // Para comunicarte con Quarkus
const router = express.Router();

import Solicitud from '../models/Solicitud.js';

// Crear nueva solicitud (endpoint que llama Quarkus)
router.post('/', async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    const guardada = await nuevaSolicitud.save();
    res.json(guardada);
  } catch (err) {
    console.error("Error al guardar solicitud:", err);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

// Obtener solicitudes por nombre (por ejemplo: ?nombre=UNIS)
router.get('/', async (req, res) => {
  try {
    const nombre = req.query.nombre;
    let solicitudes = [];

    if (nombre) {
      solicitudes = await Solicitud.find({ nombre: new RegExp(`^${nombre}$`, "i") });
    } else {
      solicitudes = await Solicitud.find();
    }

    res.json(solicitudes);
  } catch (err) {
    console.error(" Error al obtener solicitudes:", err);
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
});

// Obtener todas las solicitudes por nombre de hospital
router.get('/hospital/:nombre', async (req, res) => {
  try {
    const solicitudes = await Solicitud.find({ nombre: req.params.nombre }).sort({ createdAt: -1 });
    res.json(solicitudes);
  } catch (err) {
    console.error(" Error al obtener solicitudes:", err);
    res.status(500).json({ error: 'Error al obtener solicitudes del hospital' });
  }
});

// ✅ Actualizar estado de solicitud y sincronizar con Oracle (Quarkus)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const solicitudActualizada = await Solicitud.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!solicitudActualizada) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    // Enviar PATCH a Quarkus para actualizar estado en Oracle
    try {
      await axios.patch(
        `http://localhost:8080/hospital/solicitudes/${encodeURIComponent(solicitudActualizada.nombre)}/estado`,
        estado,
        {
          headers: { "Content-Type": "text/plain" }
        }
      );
    } catch (syncErr) {
      console.error("⚠️ Error sincronizando con Quarkus:", syncErr.message);
    }

    res.json(solicitudActualizada);
  } catch (err) {
    console.error('Error al actualizar solicitud:', err);
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
});

export default router;
