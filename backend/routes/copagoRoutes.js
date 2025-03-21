import express from 'express';
import Copago from '../models/Copago.js';

const router = express.Router();

/**
 *  🔍 GET - Obtener todos los copagos con datos completos
 */
router.get('/', async (req, res) => {
    try {
        const copagos = await Copago.find()
            .populate('cliente', 'nombre apellido documento')
            .populate('hospital', 'nombre direccion telefono')
            .populate('servicio', 'nombre descripcion precioAseguradora')
            .populate('poliza', 'nombre')
            .populate('cobertura', 'nombre porcentajeCobertura');

        res.status(200).json(copagos);
    } catch (error) {
        console.error("Error al obtener copagos:", error);
        res.status(500).json({ message: "Error al obtener copagos." });
    }
});

/**
 * ✅ Confirmar pago del copago
 */
router.put('/pagar/:id', async (req, res) => {
    try {
        const copago = await Copago.findByIdAndUpdate(
            req.params.id,
            { estado: "pagado" },
            { new: true }
        );

        if (!copago) {
            return res.status(404).json({ message: "Copago no encontrado." });
        }

        res.json({ message: "Copago pagado correctamente.", copago });
    } catch (error) {
        res.status(500).json({ message: "Error al procesar el pago.", error: error.message });
    }
});

export default router;
