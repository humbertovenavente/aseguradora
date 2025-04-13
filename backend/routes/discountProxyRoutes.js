import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const FARMACIA_API_URL = process.env.FARMACIA_API_URL || "http://localhost:5000";

// Endpoint para solicitar un descuento
router.post("/solicitar", async (req, res) => {
  try {
    const farmaciaResponse = await fetch(`${FARMACIA_API_URL}/discount/solicitar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const status = farmaciaResponse.status;
    const data = await farmaciaResponse.json();
    res.status(status).json(data);
  } catch (error) {
    console.error("Error en solicitud de descuento proxy:", error);
    res.status(500).json({ error: "Error interno en el servidor" });
  }
});

// Endpoint para procesar (aprobar/rechazar) descuento
router.post("/procesar/:id", async (req, res) => {
  try {
    const farmaciaResponse = await fetch(`${FARMACIA_API_URL}/discount/procesar/${req.params.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const status = farmaciaResponse.status;
    const data = await farmaciaResponse.json();
    res.status(status).json(data);
  } catch (error) {
    console.error("Error procesando descuento proxy:", error);
    res.status(500).json({ error: "Error interno en el servidor" });
  }
});

// Nuevo endpoint para listar medicamentos
router.get("/medicamentos/listar", async (req, res) => {
  try {
    const farmaciaResponse = await fetch(`${FARMACIA_API_URL}/discount/listar`);
    const status = farmaciaResponse.status;
    const data = await farmaciaResponse.json();
    res.status(status).json(data);
  } catch (error) {
    console.error("Error en proxy de solicitudes:", error);
    res.status(500).json({ error: "Error interno en el servidor" });
  }
});

export default router;