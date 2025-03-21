import express from "express";
import Faq from "../../models/PaginasEdt/Faq.js";

const router = express.Router();

// Obtener la FAQ (se asume un único documento)
router.get("/", async (req, res) => {
  try {
    const faq = await Faq.findOne();
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener FAQ" });
  }
});

// Actualizar la FAQ
router.put("/", async (req, res) => {
  try {
    const { items } = req.body; // items es un arreglo de { pregunta, respuesta }
    let faq = await Faq.findOne();
    if (!faq) {
      faq = new Faq({ items });
    } else {
      faq.items = items;
    }
    await faq.save();
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar FAQ" });
  }
});

export default router;
