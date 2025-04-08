import express from 'express';
import Receta from '../models/Receta.js';
import Config from '../models/Configuracion.js';
import Cliente from '../models/Clientes.js';

const router = express.Router();

// ✅ Validar receta desde farmacia
router.post('/validar', async (req, res) => {
  const { idReceta, farmacia, monto, clienteId } = req.body;

  try {
    const config = await Config.findOne({ clave: 'montoMinimoReceta' });
    const montoMinimo = config?.valor ?? 250;

    const estado = monto >= montoMinimo ? 'aprobada' : 'rechazada';

    let descuentoAplicado = 0;
    let infoDescuento = "No aplica descuento";

    if (clienteId && estado === 'aprobada') {
      const cliente = await Cliente.findById(clienteId).populate({
        path: 'polizaId',
        populate: {
          path: 'coberturaId'
        }
      });

      if (cliente && cliente.estadoPago && cliente.fechaVencimiento > new Date()) {
        const porcentaje = cliente.polizaId?.coberturaId?.porcentajeCobertura || 0;
        descuentoAplicado = parseFloat((monto * (porcentaje / 100)).toFixed(2));
        infoDescuento = `Descuento aplicado (${porcentaje}%): Q${descuentoAplicado}`;
      } else {
        infoDescuento = "Cliente sin póliza activa o vencida";
      }
    }

    const receta = new Receta({
      idReceta,
      farmacia,
      monto,
      estado,
      cliente: clienteId || null,
      descuento: descuentoAplicado
    });

    await receta.save();

    res.json({
      estado,
      mensaje: `Receta ${estado}`,
      descuento: descuentoAplicado,
      infoDescuento
    });

  } catch (error) {
    console.error("Error al validar receta:", error);
    res.status(500).json({ error: "Error al validar la receta" });
  }
});

// ✅ Obtener todas las recetas con cliente y póliza
router.get('/todas', async (req, res) => {
  try {
    const recetas = await Receta.find()
      .populate({
        path: 'cliente',
        select: 'nombre apellido polizaNombre'
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
  }).populate({
    path: "cliente",
    populate: {
      path: "polizaId",
      populate: {
        path: "coberturaId",
      },
    },
  });

  for (const receta of recetasAActualizar) {
    let descuento = 0;

    if (
      receta.cliente &&
      receta.cliente.estadoPago &&
      receta.cliente.fechaVencimiento > new Date()
    ) {
      const porcentaje =
        receta.cliente.polizaId?.coberturaId?.porcentajeCobertura || 0;
      descuento = parseFloat((receta.monto * porcentaje / 100).toFixed(2));
    }

    receta.estado = "aprobada";
    receta.descuento = descuento;
    await receta.save();
  }

  res.json({ mensaje: 'Monto y recetas actualizados correctamente con lógica de descuento' });
});

export default router;
