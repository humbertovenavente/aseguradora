import express from 'express';
import Aseguradora from '../models/Aseguradora.js';

const router = express.Router();

// 🔹 Crear una nueva aseguradora
router.post('/', async (req, res) => {
  try {
    const nueva = await Aseguradora.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear aseguradora", error: error.message });
  }
});

// 🔹 Obtener todas las aseguradoras
router.get('/', async (req, res) => {
  try {
    const aseguradoras = await Aseguradora.find();
    res.json(aseguradoras);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener aseguradoras", error: error.message });
  }
});

export default router;
