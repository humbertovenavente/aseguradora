import express from "express";
import Cita from "../models/Cita.js";
import Cliente from "../models/Clientes.js";
import Hospital from "../models/Hospital.js";
import Servicio from "../models/Servicio.js";
import Seguro from "../models/Seguro.js";
import mongoose from "mongoose";  


const router = express.Router();

// ** Crear una nueva cita (sin doctor asignado inicialmente)**
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

        // Validar si existen los datos referenciados
        const pacienteExiste = await Cliente.findById(idPaciente);
        const hospitalExiste = await Hospital.findById(idHospital);
        const servicioExiste = await Servicio.findById(idServicio);
        const aseguradoraExiste = idAseguradora ? await Seguro.findById(idAseguradora) : null;

        if (!pacienteExiste || !hospitalExiste || !servicioExiste) {
            return res.status(404).json({ mensaje: "Paciente, hospital o servicio no encontrados." });
        }

        //  Verificar si ya existe una cita para esa fecha y hora
        const citaExistente = await Cita.findOne({
            fecha: new Date(fecha),
            horaInicio,
            idHospital,
            idServicio
        });

        if (citaExistente) {
            return res.status(409).json({ mensaje: "Ya existe una cita agendada en esa fecha y hora." });
        }

        // Crear nueva cita
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


// **Obtener todas las citas**
router.get("/", async (req, res) => {
    try {
        console.log("🔍 Buscando todas las citas...");

        const citas = await Cita.find()
            .populate({ path: "idPaciente", select: "nombre apellido documento" })
            .populate({ path: "idHospital", select: "nombre direccion" })
            .populate({ path: "idServicio", select: "nombre descripcion" })
            .populate({ path: "idAseguradora", select: "nombre" });

        if (!citas || citas.length === 0) {
            return res.status(404).json({ mensaje: "No hay citas registradas en la base de datos." });
        }

        console.log("Citas encontradas:", citas.length);
        res.status(200).json(citas);
    } catch (error) {
        console.error(" Error en GET /citas:", error);
        res.status(500).json({ mensaje: "Error al obtener las citas.", error: error.message });
    }
});


// **Obtener una cita por ID**
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

        res.status(200).json(cita); //  Ahora devuelve un objeto, no un array
    } catch (error) {
        console.error(" Error en GET /citas/:id:", error);
        res.status(500).json({ mensaje: "Error al buscar la cita.", error: error.message });
    }
});



// ** Eliminar una cita**
router.delete("/:id", async (req, res) => {
    try {
        const citaEliminada = await Cita.findByIdAndDelete(req.params.id);
        if (!citaEliminada) return res.status(404).json({ mensaje: "Cita no encontrada." });
        res.status(200).json({ mensaje: "Cita eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la cita.", error });
    }
});

router.put("/:id", async (req, res) => {
    try {
      const {
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
  
      // Si se quiere confirmar la cita, verificar conflictos
      if (estado === "Confirmada") {
        const conflicto = await Cita.findOne({
          _id: { $ne: req.params.id },
          fecha: new Date(fecha || citaActual.fecha),
          horaInicio: horaInicio || citaActual.horaInicio,
          idHospital: idHospital || citaActual.idHospital,
          idServicio: idServicio || citaActual.idServicio,
          estado: "Confirmada",
        });
  
        if (conflicto) {
          return res.status(409).json({
            mensaje: "Ya existe una cita confirmada en esa fecha y hora para ese hospital y servicio.",
          });
        }
      }
  
      // Actualizar los datos válidos
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
      
     
      // Filtrar los campos definidos
      Object.keys(camposPermitidos).forEach((key) => {
        if (camposPermitidos[key] === undefined) delete camposPermitidos[key];
      });
  
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
