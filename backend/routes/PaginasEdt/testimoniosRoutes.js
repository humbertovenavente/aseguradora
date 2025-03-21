import express from "express";
import Testimonios from "../../models/PaginasEdt/Testimonios.js";

const router = express.Router();

// Obtener la información de testimonios
router.get("/", async (req, res) => {
  try {
    const testimonios = await Testimonios.findOne();
    res.json(testimonios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener testimonios" });
  }
});

// Actualizar la información de testimonios
router.put("/", async (req, res) => {
  try {
    const { servicio, reviews, newsletter, about } = req.body;
    let testimonios = await Testimonios.findOne();
    if (!testimonios) {
      testimonios = new Testimonios({ servicio, reviews, newsletter, about });
    } else {
      testimonios.servicio = servicio;
      testimonios.reviews = reviews;
      testimonios.newsletter = newsletter;
      testimonios.about = about;
    }
    await testimonios.save();
    res.json(testimonios);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar testimonios" });
  }
});

export default router;
