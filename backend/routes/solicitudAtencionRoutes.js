// ✅ solicitudAtencionRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import SolicitudAtencion from '../models/SolicitudAtencion.js';
import Cliente from '../models/Clientes.js';
import Servicio from '../models/Servicio.js';
import Hospital from '../models/Hospital.js';

const router = express.Router();

// POST - Crear nueva solicitud de atención hospitalaria
router.post('/', async (req, res) => {
  try {
    const nueva = new SolicitudAtencion(req.body);
    const guardada = await nueva.save();
    res.status(201).json(guardada);
  } catch (error) {
    console.error('❌ Error al guardar solicitud:', error);
    res.status(500).json({ message: 'Error al procesar solicitud de atención' });
  }
});

// GET - Obtener todas las solicitudes con datos poblados
router.get('/', async (req, res) => {
  try {
    const solicitudes = await SolicitudAtencion.find()
      .populate('afiliado', 'nombre apellido')
      .populate('servicio', 'nombre descripcion')
      .populate('hospital', 'nombre');

    res.json(solicitudes);
  } catch (error) {
    console.error('❌ Error al obtener solicitudes:', error);
    res.status(500).json({ message: 'Error al obtener solicitudes' });
  }
});

// PUT - Aprobar solicitud y agregarla al historial del cliente
router.put('/:id/aprobar', async (req, res) => {
  try {
    const solicitud = await SolicitudAtencion.findById(req.params.id);
    if (!solicitud) return res.status(404).json({ message: 'Solicitud no encontrada' });

    solicitud.estado = 'aprobada';
    await solicitud.save();

    const cliente = await Cliente.findById(solicitud.afiliado);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

    cliente.historialServicios.push({
      hospital: solicitud.hospital,
      servicio: solicitud.servicio,
      fechaServicio: solicitud.fechaServicio,
      costo: solicitud.monto,
      copago: 0,
      comentarios: solicitud.comentarios,
      resultados: solicitud.resultados,
      estadoCopago: 'pendiente'
    });

    await cliente.save();

    res.json({ message: '✅ Solicitud aprobada y agregada al historial del cliente' });
  } catch (error) {
    console.error('❌ Error al aprobar solicitud:', error);
    res.status(500).json({ message: 'Error al aprobar solicitud' });
  }
});

// PUT - Rechazar solicitud
router.put('/:id/rechazar', async (req, res) => {
  try {
    const solicitud = await SolicitudAtencion.findById(req.params.id);
    if (!solicitud) return res.status(404).json({ message: 'Solicitud no encontrada' });

    solicitud.estado = 'rechazada';
    await solicitud.save();

    res.json({ message: '❌ Solicitud rechazada correctamente' });
  } catch (error) {
    console.error('❌ Error al rechazar solicitud:', error);
    res.status(500).json({ message: 'Error al rechazar solicitud' });
  }
});

export default router;