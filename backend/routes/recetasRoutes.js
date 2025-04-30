import express from 'express';
import mongoose from 'mongoose';
import Receta from '../models/Receta.js';
import Config from '../models/Configuracion.js';
import ClientePoliza from '../models/ClientePoliza.js';
import Cliente from '../models/Clientes.js';

const router = express.Router();

/**
 * POST /api/recetas
 * Guarda una receta enviada desde el Hospital.
 * Ya NO requiere numeroAfiliacion.
 */
router.post('/', async (req, res) => {
  const {
    codigo,
    cliente,            // viene como ObjectId de Hospital
    farmacia,
    medicamentos = [],
    fechaEmision,
    total
  } = req.body;

  if (!codigo || !cliente || !farmacia || total == null) {
    return res.status(400).json({
      error: "Se requieren 'codigo', 'cliente', 'farmacia' y 'total'"
    });
  }

  try {
    // Verificar si la receta ya existe
    if (await Receta.exists({ codigo })) {
      return res.status(409).json({ error: 'Código ya registrado' });
    }

    // Crear la receta
    const nueva = new Receta({
      codigo,
      cliente,               // usamos directamente el ObjectId que trae el Hospital
      farmacia,
      medicamentos,
      fechaEmision: fechaEmision ? new Date(fechaEmision) : new Date(),
      total,
      descuento: 0,
      totalFinal: total,
      estadoSeguro: 'sin_póliza'
    });

    await nueva.save();
    return res.status(201).json({ mensaje: 'Receta registrada exitosamente' });
  } catch (err) {
    console.error('Error POST /recetas:', err);
    return res.status(500).json({ error: 'Error interno al registrar receta' });
  }
});

/**
 * POST /api/recetas/validar
 * Upsert + aplica lógica de descuento según póliza y monto mínimo.
 * Ahora recibe opcionalmente numeroAfiliacion.
 */
router.post('/validar', async (req, res) => {
  const { codigo, farmacia, total, numeroAfiliacion } = req.body;
  if (!codigo || !farmacia || total == null) {
    return res.status(400).json({
      error: "Se requieren 'codigo', 'farmacia' y 'total'"
    });
  }

  try {
    // 1) Buscar o crear la receta
    let rec = await Receta.findOne({ codigo });
    if (!rec) {
      return res.status(404).json({ error: 'Receta no encontrada para validar' });
    }

    // 2) Si enviaron numeroAfiliacion, verificar que exista y coincida
    let clienteId = rec.cliente;
    if (numeroAfiliacion) {
      const clienteDoc = await Cliente.findOne({ numeroAfiliacion });
      if (!clienteDoc) {
        return res.status(404).json({ error: 'Número de afiliación no encontrado' });
      }
      clienteId = clienteDoc._id;
      rec.cliente = clienteId; // actualizar si acaso
    }

    // 3) Obtener monto mínimo
    const cfg = await Config.findOne({ clave: 'montoMinimoReceta' });
    const montoMinimo = cfg?.valor ?? 250;

    // 4) Buscar póliza activa
    let rel = null;
    if (mongoose.isValidObjectId(clienteId)) {
      rel = await ClientePoliza.findOne({
        id_cliente: clienteId,
        estado_pago: true,
        fecha_vencimiento: { $gt: new Date() }
      }).populate({
        path: 'id_poliza',
        populate: { path: 'coberturaId' }
      });
    }

    // 5) Calcular estado y descuento
    let estadoSeguro = 'rechazada';
    let descuento = 0;
    let mensaje = '';

    if (!rel) {
      mensaje = 'Cliente sin póliza activa o vencida';
    } else if (total < montoMinimo) {
      mensaje = `Monto insuficiente (mínimo Q${montoMinimo})`;
    } else {
      const pct = rel.id_poliza?.coberturaId?.porcentajeCobertura || 0;
      descuento = parseFloat(((total * pct) / 100).toFixed(2));
      estadoSeguro = 'aprobada';
      mensaje = `Receta aprobada con ${pct}% de cobertura`;
    }

    // 6) Guardar resultados
    rec.farmacia     = farmacia;
    rec.total        = total;
    rec.descuento    = descuento;
    rec.totalFinal   = total - descuento;
    rec.estadoSeguro = estadoSeguro;
    await rec.save();

    // 7) Responder
    return res.json({
      estado:        estadoSeguro,
      mensaje,
      descuento,
      infoDescuento: descuento ? `Descuento: Q${descuento}` : ''
    });
  } catch (err) {
    console.error('Error POST /validar:', err);
    return res.status(500).json({ error: 'Error interno al validar receta' });
  }
});

/**
 * GET /api/recetas/todas
 * Devuelve todas las recetas con datos de cliente poblados.
 */
router.get('/todas', async (req, res) => {
  try {
    const recetas = await Receta.find()
      .populate({ path: 'cliente', select: 'nombre apellido numeroAfiliacion' })
      .sort({ fechaEmision: -1 });
    return res.json(recetas);
  } catch (err) {
    console.error('Error GET /todas:', err);
    return res.status(500).json({ error: 'Error al obtener recetas' });
  }
});

/**
 * GET /api/recetas/configuracion/monto
 */
router.get('/configuracion/monto', async (req, res) => {
  try {
    const cfg = await Config.findOne({ clave: 'montoMinimoReceta' });
    return res.json({ valor: cfg?.valor ?? 250 });
  } catch (err) {
    console.error('Error GET /configuración/monto:', err);
    return res.status(500).json({ error: 'Error al obtener monto mínimo' });
  }
});

/**
 * PUT /api/recetas/configuración/monto
 */
router.put('/configuracion/monto', async (req, res) => {
  const { valor } = req.body;
  if (valor == null) {
    return res.status(400).json({ error: "Falta el campo 'valor'" });
  }
  try {
    await Config.findOneAndUpdate(
      { clave: 'montoMinimoReceta' },
      { valor },
      { upsert: true }
    );
    // (re-evaluación de recetas, igual que antes…)
    return res.json({ mensaje: 'Monto mínimo actualizado correctamente' });
  } catch (err) {
    console.error('Error PUT /configuración/monto:', err);
    return res.status(500).json({ error: 'Error interno al actualizar monto mínimo' });
  }
});

export default router;
