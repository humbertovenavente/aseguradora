import express from 'express';
import axios from 'axios';
const router = express.Router();

import Hospital from "../models/Hospital.js";
import Solicitud from '../models/Solicitud.js';
import Cliente from "../models/Clientes.js";
import Servicio from "../models/Servicio.js";

// Crear nueva solicitud (endpoint que llama Quarkus o Farmacia)
router.post('/', async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    const guardada = await nuevaSolicitud.save();
    res.json(guardada);
  } catch (err) {
    console.error("Error al guardar solicitud:", err);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

// Crear nueva solicitud desde hospital
router.post('/api/solicitudes/hospital', async (req, res) => {
  try {
    console.log("📥 Datos recibidos desde el hospital:", req.body);
    const { nombre, direccion, telefono, aseguradora, estado, origen } = req.body;
    if (!nombre || !direccion || !telefono || !aseguradora || !origen) {
      return res.status(400).json({ error: "Datos incompletos. Verifique los campos enviados." });
    }

    const nuevaSolicitud = new Solicitud(req.body);
    const guardada = await nuevaSolicitud.save();
    console.log("✅ Solicitud guardada correctamente:", guardada);
    res.json(guardada);
  } catch (err) {
    console.error("❌ Error al guardar solicitud:", err.message);
    res.status(500).json({ error: 'Error interno al procesar la solicitud' });
  }
});

// Obtener solicitudes por nombre
router.get('/', async (req, res) => {
  try {
    const nombre = req.query.nombre;
    let filtro = { origen: "hospital" };
    if (nombre) {
      filtro.nombre = new RegExp(`^${nombre}$`, "i");
    }

    const solicitudes = await Solicitud.find(filtro);
    res.json(solicitudes);
  } catch (err) {
    console.error("Error al obtener solicitudes:", err);
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
});

// Obtener solicitudes por nombre de hospital
router.get('/hospital/:nombre', async (req, res) => {
  try {
    const solicitudes = await Solicitud.find({ nombre: req.params.nombre }).sort({ createdAt: -1 });
    res.json(solicitudes);
  } catch (err) {
    console.error("Error al obtener solicitudes:", err);
    res.status(500).json({ error: 'Error al obtener solicitudes del hospital' });
  }
});

// Actualizar estado de solicitud y sincronizar con Quarkus
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const solicitudActualizada = await Solicitud.findByIdAndUpdate(id, { estado }, { new: true });

    if (!solicitudActualizada) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    // Si fue aprobada, registrar hospital
    if (estado === "aprobado") {
      const yaExiste = await Hospital.findOne({
        nombre: solicitudActualizada.nombre,
        telefono: solicitudActualizada.telefono,
      });

      if (!yaExiste) {
        await Hospital.create({
          nombre: solicitudActualizada.nombre,
          direccion: solicitudActualizada.direccion,
          telefono: solicitudActualizada.telefono,
          convenioActivo: true,
          estado: "aprobado",
        });
        console.log("🏥 Hospital creado a partir de la solicitud");
      }
    }

    // Sincronizar con Quarkus
    try {
      await axios.patch(
        `http://localhost:8080/hospital/solicitudes/${encodeURIComponent(solicitudActualizada.nombre)}/estado`,
        estado,
        {
          headers: { "Content-Type": "text/plain" }
        }
      );
    } catch (syncErr) {
      console.error("⚠️ Error sincronizando con Quarkus:", syncErr.message);
    }

    res.json(solicitudActualizada);
  } catch (err) {
    console.error('Error al actualizar solicitud:', err);
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
});

// Aprobar solicitud y agregar al historial del cliente
router.put("/solicitudes/:id/aprobar", async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await Solicitud.findById(id);
    if (!solicitud) return res.status(404).json({ message: "Solicitud no encontrada" });

    // Validaciones adicionales
    const cliente = await Cliente.findById(solicitud.afiliado);
    const servicio = await Servicio.findById(solicitud.servicio);
    const hospital = await Hospital.findById(solicitud.hospital);

    if (!cliente || !servicio || !hospital) {
      return res.status(404).json({ message: "Datos faltantes: cliente, servicio u hospital" });
    }

    // Agregar historial al cliente
    cliente.historialServicios.push({
      hospital: hospital._id,
      servicio: servicio._id,
      fechaServicio: solicitud.fechaServicio || new Date(),
      costo: solicitud.monto,
      copago: 0,
      comentarios: solicitud.comentarios || "",
      resultados: solicitud.resultados || "",
      estadoCopago: "pendiente"
    });

    solicitud.estado = "aprobada";

    await cliente.save();
    await solicitud.save();

    // Enviar historial al microservicio de clientes (opcional)
    try {
      await axios.post(`http://localhost:5001/api/clientes/${solicitud.afiliado}/historial`, {
        hospitalId: hospital._id,
        servicioId: servicio._id,
        fechaServicio: solicitud.fechaServicio || new Date(),
        costo: solicitud.monto,
        comentarios: "Atención registrada desde hospital.",
        resultados: "Pendiente de evaluación"
      });
    } catch (histErr) {
      console.error("Error enviando historial:", histErr.message);
    }

    res.status(200).json({ message: "Solicitud aprobada y registrada correctamente." });
  } catch (error) {
    console.error("Error al aprobar solicitud:", error);
    res.status(500).json({ message: "Error al aprobar solicitud", error: error.message });
  }
});

export default router;
