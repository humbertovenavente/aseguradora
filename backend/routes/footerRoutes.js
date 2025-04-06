import express from 'express';
import Footer from '../models/Footer.js';

const router = express.Router();

// Obtener el contenido del footer
router.get("/", async (req, res) => {
  try {
    const footer = await Footer.findOne();
    res.json(footer);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el footer" });
  }
});

// Actualizar o crear el contenido del footer
router.put("/", async (req, res) => {
  try {
    const actualizado = await Footer.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true,
    });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el footer", message: err.message });
  }
});

export default router;
