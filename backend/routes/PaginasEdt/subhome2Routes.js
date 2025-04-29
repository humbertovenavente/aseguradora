// routes/PaginasEdt/subhome2Routes.js
import express from "express";
import Subhome2 from "../../models/PaginasEdt/Subhome2.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let doc = await Subhome2.findOne()
      .populate("serviciosDestacados")
      .populate("testimonios");
    if (!doc) {
      doc = new Subhome2();  // opcional: devuelve un esqueleto en vez de 404
    }
    res.json(doc);
  } catch (error) {
    console.error("Error al obtener Subhome2:", error);
    res.status(500).json({ error: "Error al obtener Subhome2" });
  }
});

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

    // Usamos un nombre distinto para el documento existente:
    let doc = await Subhome2.findOne();

    if (!doc) {
      // Si no existía, creamos uno nuevo
      doc = new Subhome2({
        hero,
        tranquilidad,
        whySection,
        about,
        serviciosDestacados,
        testimonios,
        imagenesSecciones
      });
    } else {
      // Si ya existía, simplemente actualizamos sus campos
      doc.hero                = hero;
      doc.tranquilidad        = tranquilidad;
      doc.whySection          = whySection;
      doc.about               = about;
      doc.serviciosDestacados = serviciosDestacados;
      doc.testimonios         = testimonios;
      doc.imagenesSecciones   = imagenesSecciones;
    }

    await doc.save();

    const updated = await Subhome2.findById(doc._id)
      .populate("serviciosDestacados")
      .populate("testimonios");

    res.json(updated);
  } catch (error) {
    console.error("Error al actualizar Subhome2:", error);
    res.status(500).json({ error: "Error al actualizar Subhome2" });
  }
});

export default router;
