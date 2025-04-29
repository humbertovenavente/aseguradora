// routes/PaginasEdt/subhome1.js
import express from "express";
import Subhome1 from "../../models/PaginasEdt/Subhome1.js";

const router = express.Router();

// 🔹 Obtener la configuración de Subhome1
router.get("/", async (req, res) => {
  try {
    const subhome1Data = await Subhome1.findOne()
      .populate("serviciosDestacados")
      .populate("testimonios");
    if (!subhome1Data) {
      return res.status(404).json({ error: "No existe configuración para Subhome1" });
    }
    res.json(subhome1Data);
  } catch (error) {
    console.error("Error al obtener Subhome1:", error);
    res.status(500).json({ error: "Error al obtener la configuración de Subhome1" });
  }
});

// 🔹 Crear o actualizar la configuración de Subhome1
router.put("/", async (req, res) => {
  try {
    const {
      hero,
      tranquilidad,
      whySection,
      about,
      serviciosDestacados,
      testimonios,
      imagenesSecciones
    } = req.body;

    let subhome1 = await Subhome1.findOne();
    if (!subhome1) {
      subhome1 = new Subhome1({
        hero,
        tranquilidad,
        whySection,
        about,
        serviciosDestacados,
        testimonios,
        imagenesSecciones
      });
    } else {
      subhome1.hero               = hero;
      subhome1.tranquilidad       = tranquilidad;
      subhome1.whySection         = whySection;
      subhome1.about              = about;
      subhome1.serviciosDestacados= serviciosDestacados;
      subhome1.testimonios        = testimonios;
      subhome1.imagenesSecciones  = imagenesSecciones;
    }

    await subhome1.save();

    const updated = await Subhome1.findById(subhome1._id)
      .populate("serviciosDestacados")
      .populate("testimonios");

    res.json(updated);
  } catch (error) {
    console.error("Error al actualizar Subhome1:", error);
    res.status(500).json({ error: "Error al actualizar la configuración de Subhome1" });
  }
});

export default router;
