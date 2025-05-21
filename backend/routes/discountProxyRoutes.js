import express from "express";
import axios   from "axios";
import { getFarmaciaUrls } from "../utils/discovery.js";

const router = express.Router();

// GET /api/discount/medicamentos/listar
router.get("/medicamentos/listar", async (_req, res) => {
  try {
    const urls = await getFarmaciaUrls();    // ['http://f1:5000', 'http://f2:5000', ...]
    const promesas = urls.map(async base => {
      try {
        const { data } = await axios.get(`${base}/discount/listar`);
        return data.map(sol => ({ ...sol, farmaciaBaseUrl: base }));
      } catch {
        return [];
      }
    });
    const listas = await Promise.all(promesas);
    res.json(listas.flat());
  } catch (err) {
    console.error("Error proxy listar:", err);
    res.status(500).json({ error: "Error interno en proxy listar" });
  }
});

// POST /api/discount/procesar/:id
router.post("/procesar/:id", async (req, res) => {
  try {
    const { aprobar, farmaciaBaseUrl, nuevoDescuento } = req.body;
    if (!farmaciaBaseUrl) return res.status(400).json({ error: "farmaciaBaseUrl requerido" });

    const base = farmaciaBaseUrl.replace(/\/+$/, "");
    const resp = await axios.post(
      `${base}/discount/procesar/${req.params.id}`,
      { aprobar, nuevoDescuento }
    );
    res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error("Error proxy procesar:", err);
    res.status(500).json({ error: "Error interno en proxy procesar" });
  }
});

export default router;
