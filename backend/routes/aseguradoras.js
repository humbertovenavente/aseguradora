import express from 'express';
import Aseguradora from '../models/Aseguradora.js';

const router = express.Router();

/**
 * @route POST /api/aseguradoras
 * @description Crea una nueva aseguradora en la base de datos.
 * @access Público (puede agregarse middleware de autenticación si se requiere)
 * @param {Object} req.body - Objeto con los datos de la aseguradora a registrar
 * @returns {Object} 201 - Objeto JSON con la aseguradora creada
 * @returns {Object} 500 - Mensaje de error si ocurre un fallo
 */
router.post('/', async (req, res) => {
  try {
    const nueva = await Aseguradora.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear aseguradora", error: error.message });
  }
});

/**
 * @route GET /api/aseguradoras
 * @description Obtiene todas las aseguradoras registradas.
 * @access Público
 * @returns {Object[]} 200 - Lista de aseguradoras en formato JSON
 * @returns {Object} 500 - Mensaje de error si ocurre un fallo
 */
router.get('/', async (req, res) => {
  try {
    const aseguradoras = await Aseguradora.find();
    res.json(aseguradoras);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener aseguradoras", error: error.message });
  }
});

export default router;
