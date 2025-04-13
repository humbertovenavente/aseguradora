import express from "express";
import Cita from "../models/Cita.js";
import Cliente from "../models/Clientes.js";
import Hospital from "../models/Hospital.js";
import Servicio from "../models/Servicio.js";
import Seguro from "../models/Seguro.js";
import mongoose from "mongoose";

const router = express.Router();

// Crear nueva cita
router.post("/", async (req, res) => {
  try {
    const {
      fecha,
      idPaciente,
      motivo,
      idHospital,
      idServicio,
      horaInicio,
      horaFin,
      idAseguradora,
      diagnostico,
      resultados
    } = req.body;

    const pacienteExiste = await Cliente.findById(idPaciente);
    const hospitalExiste = await Hospital.findById(idHospital);
    const servicioExiste = await Servicio.findById(idServicio);
    const aseguradoraExiste = idAseguradora ? await Seguro.findById(idAseguradora) : null;

    if (!pacienteExiste || !hospitalExiste || !servicioExiste) {
      return res.status(404).json({ mensaje: "Paciente, hospital o servicio no encontrados." });
    }

    const citaExistente = await Cita.findOne({
      fecha: new Date(fecha),
      horaInicio,
      idHospital,
      idServicio
    });

    if (citaExistente) {
      return res.status(409).json({ mensaje: "Ya existe una cita agendada en esa fecha y hora." });
    }

    const nuevaCita = new Cita({
      fecha,
      idPaciente,
      idDoctor: null,
      motivo,
      idHospital,
      idServicio,
      horaInicio,
      horaFin,
      idAseguradora,
      diagnostico,
      resultados
    });

    await nuevaCita.save();
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la cita.", error });
  }
});

// Obtener todas las citas
router.get("/", async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate({ path: "idPaciente", select: "nombre apellido documento" })
      .populate({ path: "idHospital", select: "nombre direccion" })
      .populate({ path: "idServicio", select: "nombre descripcion" })
      .populate({ path: "idAseguradora", select: "nombre" });

    if (!citas.length) {
      return res.status(404).json({ mensaje: "No hay citas registradas." });
    }

    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las citas.", error: error.message });
  }
});

// Obtener cita por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: "ID de cita inválido." });
    }

    const cita = await Cita.findById(id)
      .populate("idPaciente", "nombre apellido documento")
      .populate("idHospital", "nombre direccion")
      .populate("idServicio", "nombre descripcion")
      .populate("idAseguradora", "nombre");

    if (!cita) return res.status(404).json({ mensaje: "Cita no encontrada." });

    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar la cita.", error: error.message });
  }
});

// Eliminar cita
router.delete("/:id", async (req, res) => {
  try {
    const citaEliminada = await Cita.findByIdAndDelete(req.params.id);
    if (!citaEliminada) return res.status(404).json({ mensaje: "Cita no encontrada." });
    res.status(200).json({ mensaje: "Cita eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la cita.", error });
  }
});

// Actualizar/confirmar cita
// Actualizar/confirmar cita
// Actualizar/confirmar cita
router.put("/:id", async (req, res) => {
    try {
      let {
        fecha,
        horaInicio,
        horaFin,
        motivo,
        idHospital,
        idServicio,
        estado,
        numeroAutorizacion,
        diagnostico,
        resultados,
      } = req.body;
  
      const citaActual = await Cita.findById(req.params.id);
      if (!citaActual) return res.status(404).json({ mensaje: "Cita no encontrada." });
  
      //  Validar y convertir la fecha correctamente
      if (fecha) {
        try {
          const [year, month, day] = fecha.split("-");
          const fechaDate = new Date(Date.UTC(+year, +month - 1, +day));
          if (isNaN(fechaDate.getTime())) {
            return res.status(400).json({ mensaje: "⚠️ Fecha inválida al actualizar cita." });
          }
          fecha = fechaDate;
        } catch (e) {
          return res.status(400).json({ mensaje: "⚠️ Formato de fecha inválido." });
        }
      }
      
      // Validar formato y orden de horaInicio y horaFin
      if (horaInicio && horaFin) {
        const [hiH, hiM] = horaInicio.split(":").map(Number);
        const [hfH, hfM] = horaFin.split(":").map(Number);
      
        const minutosInicio = hiH * 60 + hiM;
        const minutosFin = hfH * 60 + hfM;
      
        if (minutosInicio < 480) {
          return res.status(400).json({ mensaje: "La hora de inicio debe ser a partir de las 08:00." });
        }
      
        if (minutosInicio >= minutosFin) {
          return res.status(400).json({ mensaje: "La hora de inicio debe ser menor que la hora de fin." });
        }
      }
      
      
      // ✅ Verificar conflicto si se va a confirmar
      if (estado === "Confirmada") {
        const conflicto = await Cita.findOne({
          _id: { $ne: req.params.id },
          fecha,
          horaInicio,
          idHospital,
          idServicio,
          estado: "Confirmada"
        });
  
        if (conflicto) {
          return res.status(409).json({
            mensaje: "Ya existe una cita confirmada en esa fecha y hora para ese hospital y servicio.",
          });
        }
  
        // ✅ Enviar al sistema del hospital
        const citaConfirmada = await Cita.findById(req.params.id)
          .populate("idPaciente")
          .populate("idHospital")
          .populate("idServicio")
          .populate("idAseguradora");
  
        const payload = {
          dpi: citaConfirmada.idPaciente.documento,
          nombre: citaConfirmada.idPaciente.nombre,
          apellido: citaConfirmada.idPaciente.apellido,
          fecha: citaConfirmada.fecha,
          horaInicio: citaConfirmada.horaInicio,
          horaFin: citaConfirmada.horaFin,
          motivo: citaConfirmada.motivo,
          idHospital: citaConfirmada.idHospital?._id,
          idServicio: citaConfirmada.idServicio?._id,
          idAseguradora: citaConfirmada.idAseguradora?._id || null,
          numeroAutorizacion: citaConfirmada.numeroAutorizacion || "GEN-AUTO",
        };
  
        try {
          const axios = await import("axios");
          const response = await axios.default.post("http://localhost:8080/api/citas/external", payload);
          console.log("✅ Cita enviada al hospital:", response.data);
        } catch (err) {
          console.error("❌ Error al enviar cita al hospital:", err.response?.data || err.message);
        }
      }
  
      // ✅ Campos a actualizar
      const camposPermitidos = {
        fecha,
        horaInicio,
        horaFin,
        motivo,
        idHospital,
        idServicio,
        estado,
        numeroAutorizacion,
        diagnostico,
        resultados,
      };
  
      for (const key in camposPermitidos) {
        if (
          camposPermitidos[key] === undefined ||
          camposPermitidos[key] === null ||
          camposPermitidos[key] === ""
        ) {
          delete camposPermitidos[key];
        }
      }
  
      const citaActualizada = await Cita.findByIdAndUpdate(req.params.id, camposPermitidos, {
        new: true,
      });
  
      res.status(200).json(citaActualizada);
    } catch (error) {
      console.error("Error actualizando cita:", error);
      res.status(500).json({ mensaje: "Error al actualizar la cita.", error });
    }
  });
  

export default router;
