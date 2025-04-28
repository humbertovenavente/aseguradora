import express from "express";
import Home from "../../models/PaginasEdt/Home.js";

const router = express.Router();

// 🔹 Obtener la configuración del Home
router.get("/", async (req, res) => {
  try {
    const homeData = await Home.findOne()
      .populate("serviciosDestacados")
      .populate("testimonios");
    res.json(homeData);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la configuración del Home" });
  }
});

// 🔹 Actualizar la configuración del Home (incluyendo nuevas imágenes de secciones)
router.put("/", async (req, res) => {
  try {
    const { 
      hero, 
      tranquilidad, 
      whySection, 
      about, 
      serviciosDestacados, 
      testimonios,
      imagenesSecciones // ✅ AGREGADO
    } = req.body;

    let home = await Home.findOne();
    if (!home) {
      home = new Home({
        hero,
        tranquilidad,
        whySection,
        about,
        serviciosDestacados,
        testimonios,
        imagenesSecciones // ✅ Nuevo
      });
    } else {
      home.hero = hero;
      home.tranquilidad = tranquilidad;
      home.whySection = whySection;
      home.about = about;
      home.serviciosDestacados = serviciosDestacados;
      home.testimonios = testimonios;
      home.imagenesSecciones = imagenesSecciones; // ✅ Nuevo
    }

    await home.save();

    const homeUpdated = await Home.findById(home._id)
      .populate("serviciosDestacados")
      .populate("testimonios");

    res.json(homeUpdated);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la configuración del Home" });
  }
});

export default router;
