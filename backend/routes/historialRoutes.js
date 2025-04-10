import express from 'express';

// POST /api/clientes/:clienteId/historial
const express = require("express");
const router = express.Router();
const Cliente = require("../models/Cliente");

// Agregar historial de servicios al cliente
router.post("/:clienteId/historial", async (req, res) => {
  try {
    const { clienteId } = req.params;
    const nuevoHistorial = req.body;

    const cliente = await Cliente.findById(clienteId);
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

    cliente.historialServicios.push(nuevoHistorial);
    await cliente.save();

    res.status(200).json({ message: "Historial agregado correctamente", historial: cliente.historialServicios });
  } catch (error) {
    console.error("Error al agregar historial:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
