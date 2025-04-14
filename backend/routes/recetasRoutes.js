import express from 'express';
import Receta from '../models/Receta.js';
import Config from '../models/Configuracion.js';
import ClientePoliza from '../models/ClientePoliza.js';
import Cliente from '../models/Clientes.js';

const router = express.Router();

// ✅ Validar receta desde farmacia (clienteId se obtiene internamente)
router.post('/validar', async (req, res) => {
  const { idReceta, farmacia, monto } = req.body;

  try {
    const config = await Config.findOne({ clave: 'montoMinimoReceta' });
    const montoMinimo = config?.valor ?? 250;

    let estado = "rechazada";
    let descuentoAplicado = 0;
    let infoDescuento = "Sin descuento";
    let mensaje = "";

    const recetaExistente = await Receta.findOne({ idReceta });

    if (!recetaExistente || !recetaExistente.cliente) {
      return res.json({
        estado: "rechazada",
        mensaje: "Receta no encontrada o sin cliente vinculado",
        descuento: 0,
        infoDescuento: "No se pudo validar la receta por falta de información"
      });
    }

    const clienteId = recetaExistente.cliente;

    const relacion = await ClientePoliza.findOne({
      id_cliente: clienteId,
      estado_pago: true,
      fecha_vencimiento: { $gt: new Date() }
    }).populate({
      path: "id_poliza",
      populate: { path: "coberturaId" }
    });

    if (!relacion) {
      mensaje = "Cliente sin póliza activa o vencida";
      infoDescuento = "No tiene una relación vigente en clientepolizas";
    } else if (monto < montoMinimo) {
      mensaje = `Monto insuficiente (mínimo requerido: Q${montoMinimo})`;
      infoDescuento = mensaje;
    } else {
      const porcentaje = relacion.id_poliza?.coberturaId?.porcentajeCobertura || 0;
      descuentoAplicado = parseFloat((monto * (porcentaje / 100)).toFixed(2));
      estado = "aprobada";
      mensaje = `Receta aprobada con ${porcentaje}% de cobertura`;
      infoDescuento = `Descuento aplicado: Q${descuentoAplicado}`;
    }

    // 💾 Actualizar receta existente
    recetaExistente.farmacia = farmacia;
    recetaExistente.monto = monto;
    recetaExistente.estado = estado;
    recetaExistente.descuento = descuentoAplicado;
    await recetaExistente.save();

    return res.json({
      estado,
      mensaje,
      descuento: descuentoAplicado,
      infoDescuento
    });

  } catch (error) {
    console.error("Error al validar receta:", error);
    return res.status(500).json({ error: "Error al validar la receta" });
  }
});


// ✅ Guardar receta enviada desde hospital
router.post('/', async (req, res) => {
  try {
    const { idReceta, cliente, medicamentos, estado, fecha, monto } = req.body;

    if (!idReceta || !cliente) {
      return res.status(400).json({ error: "Los campos 'idReceta' y 'cliente' son obligatorios" });
    }

    // Verificar si la receta ya existe
    const existente = await Receta.findOne({ idReceta });
    if (existente) {
      return res.status(409).json({ error: "La receta ya está registrada" });
    }

    const nuevaReceta = new Receta({
      idReceta,
      cliente,
      medicamentos: medicamentos || [],
      estado: estado || 'pendiente',
      fecha: fecha ? new Date(fecha) : new Date(),
      monto: monto || 0,
      descuento: 0
    });

    await nuevaReceta.save();

    return res.status(201).json({ mensaje: "Receta registrada exitosamente" });

  } catch (error) {
    console.error("❌ Error al guardar receta:", error);
    res.status(500).json({ error: "Error interno al registrar receta" });
  }
});



// ✅ Obtener todas las recetas con cliente
router.get('/todas', async (req, res) => {
  try {
    const recetas = await Receta.find()
      .populate({
        path: 'cliente',
        select: 'nombre apellido'
      })
      .sort({ fecha: -1 });

    res.json(recetas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las recetas' });
  }
});

// ✅ Obtener monto mínimo actual
router.get('/configuracion/monto', async (req, res) => {
  const config = await Config.findOne({ clave: 'montoMinimoReceta' });
  res.json({ valor: config?.valor ?? 250 });
});

// ✅ Actualizar monto mínimo y recalcular recetas automáticamente
router.put('/configuracion/monto', async (req, res) => {
  const { valor } = req.body;

  await Config.findOneAndUpdate(
    { clave: 'montoMinimoReceta' },
    { valor },
    { upsert: true }
  );

  // Rechazar las que ya no cumplen
  await Receta.updateMany(
    { monto: { $lt: valor }, estado: 'aprobada' },
    { $set: { estado: 'rechazada', descuento: 0 } }
  );

  // Volver a aprobar las que ahora cumplen
  const recetasAActualizar = await Receta.find({
    monto: { $gte: valor },
    estado: 'rechazada',
    cliente: { $ne: null },
  });

  for (const receta of recetasAActualizar) {
    const relacion = await ClientePoliza.findOne({
      id_cliente: receta.cliente,
      estado_pago: true,
      fecha_vencimiento: { $gt: new Date() }
    }).populate({
      path: "id_poliza",
      populate: { path: "coberturaId" }
    });

    if (relacion) {
      const porcentaje = relacion.id_poliza?.coberturaId?.porcentajeCobertura || 0;
      const descuento = parseFloat((receta.monto * (porcentaje / 100)).toFixed(2));
      receta.estado = "aprobada";
      receta.descuento = descuento;
      await receta.save();
    }
  }

  res.json({ mensaje: 'Monto y recetas actualizados correctamente con lógica de descuento' });
});

export default router;
