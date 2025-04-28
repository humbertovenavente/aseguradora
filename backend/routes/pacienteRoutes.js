import express from "express";
import Cliente from "../models/Clientes.js";
import Cita from "../models/Cita.js";
import Receta from "../models/Receta.js";
import mongoose from "mongoose";

const router = express.Router();

/**
 * Validar que el id recibido sea un ObjectId válido
 */
const validarObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * Obtener historial de servicios de un paciente
 */
router.get("/historial-servicios/:idCliente", async (req, res) => {
  try {
    const { idCliente } = req.params;
    if (!validarObjectId(idCliente)) {
      return res.status(400).json({ mensaje: "ID de cliente inválido." });
    }

    const cliente = await Cliente.findById(idCliente)
      .populate("historialServicios.hospital", "nombre direccion telefono")
      .populate("historialServicios.servicio", "nombre descripcion precioAseguradora");

    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado." });
    }

    res.status(200).json(cliente.historialServicios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener historial de servicios", error });
  }
});

/**
 * Obtener citas de un paciente
 */
router.get("/citas/:idPaciente", async (req, res) => {
  try {
    const { idPaciente } = req.params;
    if (!validarObjectId(idPaciente)) {
      return res.status(400).json({ mensaje: "ID de paciente inválido." });
    }

    const citas = await Cita.find({ idPaciente })
      .populate("idHospital", "nombre direccion")
      .populate("idServicio", "nombre descripcion")
      .sort({ fecha: -1 });

    res.status(200).json(citas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener citas", error });
  }
});

/**
 * Obtener recetas de un paciente
 */
router.get("/recetas/:idCliente", async (req, res) => {
  try {
    const { idCliente } = req.params;
    if (!validarObjectId(idCliente)) {
      return res.status(400).json({ mensaje: "ID de cliente inválido." });
    }

    const recetas = await Receta.find({ cliente: idCliente })
      .select("idReceta farmacia monto estado descuento fecha")
      .sort({ fecha: -1 });

    res.status(200).json(recetas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener recetas", error });
  }
});


  

export default router;
