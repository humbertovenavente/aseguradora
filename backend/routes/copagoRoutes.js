import express from 'express';
import Copago from '../models/Copago.js';
import Cliente from '../models/Clientes.js';
import Hospital from '../models/Hospital.js';
import Servicio from '../models/Servicio.js';
import Poliza from '../models/Poliza.js';
import Cobertura from '../models/Cobertura.js';

const router = express.Router();

/**
 *  GET - Obtener todos los copagos
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

router.post('/generar', async (req, res) => {
    try {
      const { clienteId, servicioId, hospitalId } = req.body;
  
      if (!clienteId || !servicioId || !hospitalId) {
        return res.status(400).json({ message: "Faltan datos obligatorios (clienteId, servicioId, hospitalId)." });
      }
  
      const cliente = await Cliente.findById(clienteId);
      if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado.' });
  
      const poliza = await Poliza.findById(cliente.polizaId).populate('coberturaId');
      if (!poliza) return res.status(404).json({ message: 'Póliza no encontrada.' });
  
      const cobertura = poliza.coberturaId;
      if (!cobertura) return res.status(404).json({ message: 'Cobertura no encontrada.' });
  
      const servicio = await Servicio.findById(servicioId);
      if (!servicio) return res.status(404).json({ message: 'Servicio no encontrado.' });
  
      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) return res.status(404).json({ message: 'Hospital no encontrado.' });
  
      // Validar que el servicio está cubierto
      const cubierto = cobertura.servicios.some(s => s.toString() === servicio._id.toString());
      if (!cubierto) return res.status(400).json({ message: 'El servicio no está cubierto por la póliza.' });
  
      const porcentaje = cobertura.porcentajeCobertura;
      const copagoCalculado = servicio.precioAseguradora * (1 - porcentaje / 100);
  
      const nuevoCopago = new Copago({
        cliente: cliente._id,
        hospital: hospital._id,
        servicio: servicio._id,
        poliza: poliza._id,
        cobertura: cobertura._id,
        porcentajeCobertura: porcentaje,
        costoRealServicio: servicio.precioAseguradora,
        montoCopago: copagoCalculado,
        estado: 'pendiente',
      });
  
      await nuevoCopago.save();
  
      return res.status(201).json({ message: 'Copago generado.', copago: nuevoCopago });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al generar el copago.', error: error.message });
    }
  });
  
  export default router;