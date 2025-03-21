import express from "express";
import Contacto from "../../models/PaginasEdt/Contacto.js";

const router = express.Router();

// Obtener la información de contacto
router.get("/", async (req, res) => {
  try {
    let contacto = await Contacto.findOne();
    res.json(contacto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la información de contacto" });
  }
});

// Actualizar la información de contacto
router.put("/", async (req, res) => {
  try {
    const { titulo, introduccion, telefono, direccion, correo } = req.body;

    let contacto = await Contacto.findOne();
    // Si no existe, lo creamos; si existe, lo actualizamos
    if (!contacto) {
      contacto = new Contacto({ titulo, introduccion, telefono, direccion, correo });
    } else {
      contacto.titulo = titulo;
      contacto.introduccion = introduccion;
      contacto.telefono = telefono;
      contacto.direccion = direccion;
      contacto.correo = correo;
    }

    await contacto.save();
    res.json(contacto);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la información de contacto" });
  }
});

export default router;
