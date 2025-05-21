import express from "express";
import ServicioFarmacias from "../models/ServicioFarmacias.js";
import { clearDiscoveryCache } from "../utils/discovery.js";

const router = express.Router();

// Listar todas las farmacias
router.get("/", async (req, res) => {
  const docs = await ServicioFarmacias.find().sort("nombre");
  res.json(docs);
});

// Crear nueva farmacia
router.post("/", async (req, res) => {
  const { nombre, baseUrl, tipo = "FARMACIA" } = req.body;
  const nueva = await ServicioFarmacias.create({ nombre, baseUrl, tipo });
  clearDiscoveryCache();
  res.status(201).json(nueva);
});

// Editar farmacia
router.put("/:id", async (req, res) => {
  const { nombre, baseUrl, activo } = req.body;
  const upd = await ServicioFarmacias.findByIdAndUpdate(
    req.params.id,
    { nombre, baseUrl, activo },
    { new: true, runValidators: true }
  );
  if (!upd) return res.status(404).json({ error: "No encontrada" });
  clearDiscoveryCache();
  res.json(upd);
});

// Borrar farmacia
router.delete("/:id", async (req, res) => {
  const del = await ServicioFarmacias.findByIdAndDelete(req.params.id);
  if (!del) return res.status(404).json({ error: "No encontrada" });
  clearDiscoveryCache();
  res.status(204).end();
});

export default router;
