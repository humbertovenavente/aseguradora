import express from "express";
import Historia from "../../models/PaginasEdt/Historia.js";


const router = express.Router();

// Obtener la información de la historia
router.get('/', async (req, res) => {
  try {
    // Asumiendo que solo tienes un registro de "Historia"
    const historia = await Historia.findOne();
    res.json(historia);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la historia' });
  }
});

// Actualizar la información de la historia
router.put('/', async (req, res) => {
  try {
    const { titulo, imagenUrl, parrafos } = req.body;

    // Buscamos el único documento (siempre y cuando solo exista uno)
    let historia = await Historia.findOne();
    if (!historia) {
      // Si no existe, lo creamos
      historia = new Historia({ titulo, imagenUrl, parrafos });
    } else {
      // Si existe, actualizamos
      historia.titulo = titulo;
      historia.imagenUrl = imagenUrl;
      historia.parrafos = parrafos;
    }
    await historia.save();

    res.json(historia);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la historia' });
  }
});

export default router;

