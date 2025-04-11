import express from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import SolicitudAtencion from '../models/SolicitudAtencion.js';
import Cliente from '../models/Clientes.js';
import Servicio from '../models/Servicio.js';
import Hospital from '../models/Hospital.js';
import Poliza from '../models/Poliza.js';

const router = express.Router();

// POST - Crear nueva solicitud con validación y número de autorización
router.post('/', async (req, res) => {
    try {
      const { afiliado, servicio, hospital, monto, comentarios, resultados } = req.body;
  
      const cliente = await Cliente.findById(afiliado).populate('polizaId');
      if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
  
      if (!cliente.estadoPago) {
        return res.status(400).json({ message: 'El cliente no está al día con sus pagos.' });
      }
  
      const servicioObj = await Servicio.findById(servicio);
      if (!servicioObj) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
  
      const numeroAutorizacion = uuidv4(); // Generar código único
      const nueva = new SolicitudAtencion({
        afiliado,
        servicio,
        hospital,
        monto,
        comentarios,
        resultados,
        estado: 'aprobada',
        numeroAutorizacion
      });
  
      const guardada = await nueva.save();
  
      cliente.historialServicios.push({
        hospital,
        servicio,
        fechaServicio: nueva.fechaServicio,
        costo: monto,
        copago: 0,
        comentarios,
        resultados,
        estadoCopago: 'pendiente'
      });
  
      await cliente.save();
  
      res.status(201).json({
        message: ' Solicitud aprobada automáticamente',
        numeroAutorizacion,
        solicitud: guardada
      });
    } catch (error) {
      console.error('Error al procesar solicitud:', error);
      res.status(500).json({ message: 'Error al procesar solicitud de atención' });
    }
  });
  

// GET - Obtener todas las solicitudes con datos poblados
router.get('/', async (req, res) => {
    try {
      const solicitudes = await SolicitudAtencion.find()
        .populate('afiliado', 'nombre apellido')
        .populate('servicio', 'nombre descripcion')
        .populate('hospital', 'nombre direccion telefono'); 
  
      res.json(solicitudes);
    } catch (error) {
      console.error('❌ Error al obtener solicitudes:', error);
      res.status(500).json({ message: 'Error al obtener solicitudes' });
    }
  });
  
  
  

// PUT - Aprobar manualmente (ya no necesario si POST hace la validación)
// PUT - Aprobar solicitud y agregarla al historial del cliente con número de autorización
router.put('/:id/aprobar', async (req, res) => {
    try {
      const solicitud = await SolicitudAtencion.findById(req.params.id);
      if (!solicitud) return res.status(404).json({ message: 'Solicitud no encontrada' });
  
      const cliente = await Cliente.findById(solicitud.afiliado);
      if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
  
      // Verificar si está al día en sus pagos
      if (!cliente.estadoPago) {
        return res.status(400).json({ message: 'Cliente tiene pagos pendientes' });
      }
  
      // Verificar si la póliza está vigente
      if (new Date(cliente.fechaVencimiento) < new Date()) {
        return res.status(400).json({ message: 'La póliza ha vencido' });
      }
  
      // Generar número de autorización aleatorio
      const numeroAutorizacion = Math.random().toString(36).substring(2, 10).toUpperCase();
  
      // Actualizar solicitud
      solicitud.estado = 'aprobada';
      solicitud.resultados = `Autorización: ${numeroAutorizacion}`;
      await solicitud.save();
  
      // Agregar al historial del cliente
      cliente.historialServicios.push({
        hospital: solicitud.hospital,
        servicio: solicitud.servicio,
        fechaServicio: solicitud.fechaServicio,
        costo: solicitud.monto,
        copago: 0,
        comentarios: solicitud.comentarios || "",
        resultados: `Autorización: ${numeroAutorizacion}`,
        estadoCopago: 'pendiente'
      });
  
      await cliente.save();
  
      res.json({
        message: 'Solicitud aprobada con autorización',
        numeroAutorizacion
      });
    } catch (error) {
      console.error(' Error al aprobar solicitud:', error);
      res.status(500).json({ message: 'Error al aprobar solicitud' });
    }
  });
  

export default router;
