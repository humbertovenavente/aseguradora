import express from 'express';

import Clientes from '../models/Clientes.js';
import ClientePoliza from '../models/ClientePoliza.js';
import Poliza from '../models/Poliza.js';
import Cobertura from '../models/Cobertura.js';
import Pago from '../models/Pago.js';
import Cita from '../models/Cita.js';
import Hospital from '../models/Hospital.js';
import Servicio from '../models/Servicio.js';

const router = express.Router();

/* ──────────────── DASHBOARD PARA TRABAJADOR ──────────────── */

// GET dashboard del cliente para trabajador
router.get('/dashboard-trabajador/:idCliente', async (req, res) => {
    const { idCliente } = req.params;

    try {
        const cliente = await Clientes.findById(idCliente);
        const relacion = await ClientePoliza.findOne({ id_cliente: idCliente });

        const poliza = relacion
            ? await Poliza.findById(relacion.id_poliza)
            : null;

        const cobertura = poliza
            ? await Cobertura.findById(poliza.coberturaId)
            : null;

        const pagos = await Pago.find({ cliente_id: idCliente });

        const citas = await Cita.find({ idPaciente: idCliente })
            .populate("idHospital")
            .populate("idServicio");

        const hospitales = await Hospital.find({ convenioActivo: true });
        const servicios = await Servicio.find({});

        res.status(200).json({
            cliente,
            poliza,
            cobertura,
            pagos,
            citas,
            hospitales,
            servicios
        });

    } catch (error) {
        console.error("❌ Error al obtener dashboard del trabajador:", error);
        res.status(500).json({
            mensaje: "Error al cargar el dashboard.",
            error: error.message
        });
    }
});

export default router;
