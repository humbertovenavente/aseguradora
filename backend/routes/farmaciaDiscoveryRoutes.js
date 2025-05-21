import express from "express";
import axios from "axios";
import { getFarmaciaUrls } from "../utils/discovery.js";

const router = express.Router();

router.get("/solicitudes-descuento", async (req, res) => {
  try {
    const farmacias = await getFarmaciaUrls();
    let resultados = [];
    for (const url of farmacias) {
      try {
        const { data } = await axios.get(`${url}/discount/listar`);
        resultados.push(...data.map(sol => ({
          ...sol,
          farmaciaBaseUrl: url
        })));
      } catch (err) {
        // Ignora farmacias que no respondan
      }
    }
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: "Error consultando farmacias" });
  }
});

export default router;
