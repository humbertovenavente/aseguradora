import express from 'express';
import Pago from '../models/Pago.js';
import Cliente from '../models/Clientes.js';
import Poliza from '../models/Poliza.js';
import Servicio from '../models/Servicio.js';
import Hospital from '../models/Hospital.js';

const router = express.Router();

/**
 * ✅ Registrar pago y calcular copago dinámicamente
 */
router.post('/', async (req, res) => {
    const { clienteCorreo, polizaNombre, servicioId, hospitalId, monto } = req.body;

    try {
        // 🔍 Buscar cliente por correo del usuario asociado
        let cliente = await Cliente.findOne({})
            .populate({ path: "usuarioId", select: "correo" })
            .exec();

        // Verificar si el cliente coincide con el correo recibido
        cliente = cliente && cliente.usuarioId?.correo === clienteCorreo ? cliente : null;

        if (!cliente) {
            return res.status(400).json({ mensaje: "Cliente no encontrado. Verifique el correo." });
        }

        // 🔍 Buscar la póliza del cliente por nombre
        const poliza = await Poliza.findOne({ nombre: polizaNombre }).populate("coberturaId");

        if (!poliza) {
            return res.status(400).json({ mensaje: "Póliza no válida o no encontrada." });
        }

        // 🔍 Buscar el servicio a facturar
        const servicio = await Servicio.findById(servicioId);
        if (!servicio) {
            return res.status(400).json({ mensaje: "Servicio no encontrado." });
        }

        // 🔍 Buscar el hospital
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(400).json({ mensaje: "Hospital no encontrado." });
        }

        // 🔍 Obtener el porcentaje de cobertura de la póliza
        const porcentajeCobertura = poliza.coberturaId.porcentajeCobertura;

        // 🔹 Calcular copago basado en la cobertura
        const copagoCalculado = servicio.precioAseguradora * (1 - porcentajeCobertura / 100);

        // 🔍 Validar monto mínimo requerido
        if (monto < cliente.montoMinimoCobertura) {
            const pagoRechazado = await Pago.create({
                cliente_id: cliente._id,
                poliza_id: poliza._id,
                pago: monto,
                copago: copagoCalculado,
                estado_pago: 'rechazado',
                motivo_rechazo: 'Monto inferior al mínimo de cobertura.'
            });

            return res.status(400).json({ mensaje: "Pago rechazado por monto inferior al mínimo requerido.", pago: pagoRechazado });
        }

        // ✅ Registrar el pago aceptado
        const pagoAceptado = await Pago.create({
            cliente_id: cliente._id,
            poliza_id: poliza._id,
            pago: monto,
            copago: copagoCalculado,
            estado_pago: 'aceptado'
        });

        // ✅ Guardar en historialServicios del cliente
        cliente.historialServicios.push({
            hospital: hospital._id,
            servicio: servicio._id,
            fechaServicio: new Date(),
            costo: servicio.precioAseguradora,
            copago: pagoAceptado._id, // Relacionar con el pago
            comentarios: "Pago registrado con éxito",
            resultados: "Servicio procesado correctamente"
        });

        await cliente.save();

        res.status(201).json({ 
            mensaje: "Pago registrado correctamente.", 
            pago: pagoAceptado,
            copago: copagoCalculado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al procesar el pago", error: error.message });
    }
});

export default router;
