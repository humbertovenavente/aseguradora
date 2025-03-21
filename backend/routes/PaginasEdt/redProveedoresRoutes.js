import express from "express";
import RedProveedores from "../../models/PaginasEdt/RedProveedores.js";

const router = express.Router();

// Obtener la lista de proveedores
router.get("/", async (req, res) => {
  try {
    const redProveedores = await RedProveedores.findOne();
    res.json(redProveedores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los proveedores" });
  }
});

// Actualizar la lista de proveedores
router.put("/", async (req, res) => {
  try {
    const { proveedores } = req.body; // proveedores: array de { nombre, descripcion, imagenUrl }
    let redProveedores = await RedProveedores.findOne();
    if (!redProveedores) {
      redProveedores = new RedProveedores({ proveedores });
    } else {
      redProveedores.proveedores = proveedores;
    }
    await redProveedores.save();
    res.json(redProveedores);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar los proveedores" });
  }
});

export default router;
