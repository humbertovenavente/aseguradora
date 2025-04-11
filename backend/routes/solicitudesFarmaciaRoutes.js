import express from "express";
import Solicitud from "../models/Solicitud.js";

const router = express.Router();

// Crear nueva solicitud proveniente de Farmacia
router.post("/", async (req, res) => {
  try {
    // Se agrega explícitamente el campo "origen" para identificar la solicitud de farmacia
    const solicitudData = {
      ...req.body,
      origen: "farmacia"
    };

    const nuevaSolicitud = new Solicitud(solicitudData);
    const guardada = await nuevaSolicitud.save();
    res.status(201).json(guardada);
  } catch (err) {
    console.error("Error al guardar solicitud de farmacia:", err);
    res.status(500).json({ error: "Error al procesar la solicitud de farmacia" });
  }
});

// Obtener solicitudes de farmacia
router.get("/", async (req, res) => {
  try {
    const nombre = req.query.nombre;
    let solicitudes = [];
    const filtro = { origen: "farmacia" };
    
    if (nombre) {
      filtro.nombre = new RegExp(`^${nombre}$`, "i");
    }
    
    solicitudes = await Solicitud.find(filtro);
    res.json(solicitudes);
  } catch (err) {
    console.error("Error al obtener solicitudes de farmacia:", err);
    res.status(500).json({ error: "Error al obtener solicitudes" });
  }
});

// Actualizar el estado de la solicitud de farmacia
router.put("/:id", async (req, res) => {
  try {
    const updatedSolicitud = await Solicitud.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSolicitud) {
      return res.status(404).json({ error: "Solicitud de farmacia no encontrada" });
    }

    res.json(updatedSolicitud);
  } catch (err) {
    console.error("Error actualizando solicitud de farmacia:", err);
    res.status(500).json({ error: "Error al actualizar solicitud de farmacia" });
  }
});

export default router;
