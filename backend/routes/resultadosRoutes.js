import express from "express";
import Resultado from "../models/Resultado.js";

const router = express.Router();

// POST: Guardar resultado desde hospital (sin campo cliente)
router.post("/", async (req, res) => {
  try {
    console.log(" Datos recibidos desde el hospital:", req.body);
    const { idCita, diagnostico, resultados, fecha, documento, nombre, apellido, doctor } = req.body;

    const nuevoResultado = new Resultado({
      idCita,
      diagnostico,
      resultados,
      fecha,
      documento,
      nombre,
      apellido,
      doctor,
    });

    const guardado = await nuevoResultado.save();
    res.status(201).json(guardado);
  } catch (error) {
    console.error("❌ Error al guardar resultado:", error);
    res.status(500).json({ message: "Error al guardar resultado", error: error.message });
  }
});

// GET: Obtener todos los resultados simples
router.get("/", async (req, res) => {
  try {
    const resultados = await Resultado.find();
    res.json(resultados);
  } catch (err) {
    console.error("❌ Error al obtener resultados:", err);
    res.status(500).json({ message: "Error al obtener resultados" });
  }
});

export default router;
