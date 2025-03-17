import express from 'express';
import Pago from '../models/Pago.js';
import Cliente from '../models/Clientes.js';
import Poliza from '../models/Poliza.js';

const router = express.Router();

/**
 * ✅ Crear un nuevo pago
 */
router.post('/', async (req, res) => {
    const { cliente_id, poliza_id, monto } = req.body;
    
    try {
        // Validar cliente
        const cliente = await Cliente.findById(cliente_id);
        if (!cliente || !cliente.estadoPago) {
            return res.status(400).json({ mensaje: "Cliente no activo o no encontrado." });
        }

        // Validar póliza
        const poliza = await Poliza.findById(poliza_id);
        if (!poliza || new Date(poliza.vigencia) < new Date()) {
            return res.status(400).json({ mensaje: "Póliza vencida o no válida." });
        }

        // Validar monto mínimo
        if (monto < cliente.montoMinimoCobertura) {
            const pagoRechazado = await Pago.create({
                cliente_id,
                poliza_id,
                monto,
                estado_pago: 'rechazado',
                motivo_rechazo: 'Monto inferior al mínimo de cobertura.'
            });
            return res.status(400).json({ mensaje: "Pago rechazado por monto inferior al mínimo requerido.", pago: pagoRechazado });
        }

        // Registrar el pago aceptado
        const pagoAceptado = await Pago.create({
            cliente_id,
            poliza_id,
            monto,
            estado_pago: 'aceptado'
        });

        res.status(201).json({ mensaje: "Pago registrado y aceptado correctamente.", pago: pagoAceptado });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al procesar el pago", error: error.message });
    }
});

/**
 * 📄 Listar todos los pagos
 */
router.get('/', async (req, res) => {
    try {
        const pagos = await Pago.find()
            .populate({
                path: 'cliente_id',
                model: 'Cliente',
                select: 'nombre apellido documento'
            })
            .populate({
                path: 'poliza_id',
                model: 'Poliza',
                select: 'nombre tipoCobertura'
            });

        res.json(pagos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los pagos", error: error.message });
    }
});


/**
 * 🔍 Obtener un pago por ID
 */
router.get('/:id', async (req, res) => {
    try {
        const pago = await Pago.findById(req.params.id)
            .populate('cliente_id', 'nombre documento')
            .populate('poliza_id', 'nombre tipoCobertura');
        if (!pago) {
            return res.status(404).json({ mensaje: "Pago no encontrado" });
        }
        res.json(pago);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el pago", error: error.message });
    }
});

/**
 * 🔄 Filtrar pagos por cliente
 */
router.get('/cliente/:clienteId', async (req, res) => {
    try {
        const pagos = await Pago.find({ cliente_id: req.params.clienteId })
            .populate({ path: 'cliente_id', select: 'nombre apellido documento'})
            .populate('poliza_id', 'nombre tipoCobertura');
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener pagos del cliente", error: error.message });
    }
});



/**
 * 📅 Filtrar pagos por rango de fechas
 */
router.get('/fecha', async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
    try {
        const pagos = await Pago.find({
            fecha_pago: {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin)
            }
        })
        .populate('cliente_id', 'nombre documento')
        .populate('poliza_id', 'nombre tipoCobertura');
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al filtrar pagos por fecha", error: error.message });
    }
});

/**
 * ✏️ Actualizar un pago
 */
router.put('/:id', async (req, res) => {
    try {
        const pagoActualizado = await Pago.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pagoActualizado) {
            return res.status(404).json({ mensaje: "Pago no encontrado" });
        }
        res.json({ mensaje: "Pago actualizado correctamente", pago: pagoActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el pago", error: error.message });
    }
});

/**
 * ❌ Eliminar un pago
 */
router.delete('/:id', async (req, res) => {
    try {
        const pagoEliminado = await Pago.findByIdAndDelete(req.params.id);
        if (!pagoEliminado) {
            return res.status(404).json({ mensaje: "Pago no encontrado" });
        }
        res.json({ mensaje: "Pago eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el pago", error: error.message });
    }
});

export default router;
