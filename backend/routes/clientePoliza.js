import express from 'express';
import mongoose from "mongoose";
import Poliza from '../models/Poliza.js';
import Pago from '../models/Pago.js';
import ClientePoliza from '../models/ClientePoliza.js';
import Clientes from '../models/Clientes.js'; // 👈 CORRECTO

const router = express.Router();

/* ──────────────── RUTAS PERSONALIZADAS ──────────────── */

// ✅ Pagar una póliza
router.post('/pagar', async (req, res) => {
    const { cliente_id, poliza_id, monto_pagado } = req.body;

    try {
        const nuevoPago = await Pago.create({
            cliente_id,
            poliza_id,
            pago: monto_pagado,
            estado_pago: 'aceptado',
            fecha_pago: new Date()
        });

        const nuevaFechaVencimiento = new Date();
        nuevaFechaVencimiento.setDate(nuevaFechaVencimiento.getDate() + 30);

        let clientePoliza = await ClientePoliza.findOne({ id_cliente: cliente_id, id_poliza: poliza_id });

        if (!clientePoliza) {
            clientePoliza = await ClientePoliza.create({
                id_cliente: cliente_id,
                id_poliza: poliza_id,
                estado_pago: true,
                fecha_pago: new Date(),
                fecha_vencimiento: nuevaFechaVencimiento
            });
        } else {
            clientePoliza.estado_pago = true;
            clientePoliza.fecha_pago = new Date();
            clientePoliza.fecha_vencimiento = nuevaFechaVencimiento;
            await clientePoliza.save();
        }

        // ✅ También actualizar el cliente en la colección Clientes
        await Clientes.findByIdAndUpdate(cliente_id, {
            estadoPago: true,
            fechaVencimiento: nuevaFechaVencimiento
        });

        res.status(200).json({
            mensaje: "Pago realizado exitosamente.",
            pago: nuevoPago,
            clientePoliza
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al procesar el pago.",
            error: error.message
        });
    }
});

// ✅ Obtener estado de la póliza
router.get('/estado-poliza/:clienteId/:polizaId', async (req, res) => {
    const { clienteId, polizaId } = req.params;

    try {
        const relacion = await ClientePoliza.findOne({
            id_cliente: clienteId,
            id_poliza: polizaId
        });

        if (!relacion) {
            return res.status(200).json({
                estado_pago: false,
                mensaje: "El cliente aún no ha contratado esta póliza."
            });
        }

        const hoy = new Date();
        const vencida = relacion.fecha_vencimiento < hoy;

        res.status(200).json({
            estado_pago: relacion.estado_pago && !vencida,
            vencida,
            fecha_vencimiento: relacion.fecha_vencimiento,
            mensaje: vencida
                ? "La póliza está vencida. Es necesario pagar nuevamente."
                : "La póliza está activa y al día."
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al consultar el estado de la póliza.",
            error: error.message
        });
    }
});

// ✅ Actualizar manualmente el estado
router.put('/actualizar-estado', async (req, res) => {
    const { cliente_id, poliza_id, estado_pago } = req.body;

    if (!cliente_id || !poliza_id) {
        return res.status(400).json({ mensaje: "Faltan datos requeridos." });
    }

    try {
        const relacion = await ClientePoliza.findOne({
            id_cliente: new mongoose.Types.ObjectId(cliente_id),
            id_poliza: new mongoose.Types.ObjectId(poliza_id)
        });

        if (!relacion) {
            return res.status(404).json({ mensaje: "Relación cliente-póliza no encontrada." });
        }

        relacion.estado_pago = estado_pago;

        let nuevaFecha = relacion.fecha_vencimiento;

        if (estado_pago) {
            relacion.fecha_pago = new Date();
            nuevaFecha = new Date();
            nuevaFecha.setDate(nuevaFecha.getDate() + 30);
            relacion.fecha_vencimiento = nuevaFecha;
        }

        await relacion.save();

        // ✅ También sincroniza en la colección Clientes
        await Clientes.findByIdAndUpdate(cliente_id, {
            estadoPago: estado_pago,
            fechaVencimiento: nuevaFecha
        });

        res.status(200).json({ mensaje: "✅ Estado de pago actualizado correctamente." });

    } catch (error) {
        console.error("❌ Error en el backend:", error);
        res.status(500).json({ mensaje: "Error al actualizar el estado de pago.", error: error.message });
    }
});

/* ──────────────── CRUD POLIZAS ──────────────── */

router.post('/', async (req, res) => {
    const { nombre, coberturaId, costo, vigencia, id_seguro } = req.body;

    try {
        const nuevaPoliza = await Poliza.create({
            nombre,
            coberturaId,
            costo,
            vigencia,
            id_seguro
        });
        res.status(201).json({ mensaje: "Póliza creada exitosamente.", poliza: nuevaPoliza });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la póliza", error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const polizas = await Poliza.find()
            .populate('id_seguro')
            .populate('coberturaId');

        const polizasFiltradas = polizas.map(poliza => ({
            _id: poliza._id,
            nombre: poliza.nombre,
            coberturaId: poliza.coberturaId,
            costo: poliza.costo,
            vigencia: poliza.vigencia,
            id_seguro: poliza.id_seguro
        }));

        res.json(polizasFiltradas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las pólizas", error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const poliza = await Poliza.findById(req.params.id)
            .populate('id_seguro')
            .populate('coberturaId');

        if (!poliza) {
            return res.status(404).json({ mensaje: "Póliza no encontrada." });
        }
        res.json(poliza);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la póliza", error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { nombre, tipoCobertura, coberturaId, costo, vigencia, id_seguro } = req.body;

    try {
        const polizaActualizada = await Poliza.findByIdAndUpdate(
            req.params.id,
            { nombre, tipoCobertura, coberturaId, costo, vigencia, id_seguro },
            { new: true }
        );

        if (!polizaActualizada) {
            return res.status(404).json({ mensaje: "Póliza no encontrada." });
        }

        res.json({ mensaje: "Póliza actualizada correctamente.", poliza: polizaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la póliza", error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const polizaEliminada = await Poliza.findByIdAndDelete(req.params.id);

        if (!polizaEliminada) {
            return res.status(404).json({ mensaje: "Póliza no encontrada." });
        }

        res.json({ mensaje: "Póliza eliminada correctamente." });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la póliza", error: error.message });
    }
});

export default router;
