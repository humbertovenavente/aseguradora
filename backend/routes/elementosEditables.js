import express from 'express';
import Cliente from '../models/Clientes.js';
import Servicio from '../models/Servicio.js';
import Empleado from '../models/Empleados.js'; 
import Poliza from '../models/Poliza.js';
import Cobertura from '../models/Cobertura.js';
import Cita from '../models/Cita.js';

const router = express.Router();

/* 📌 1. Top 10 Servicios Más Vendidos */
router.get('/top-vendidos', async (req, res) => {
  try {
    const clientes = await Cliente.find({})
      .select('historialServicios')
      .populate('historialServicios.servicio');

    const conteoServicios = {};

    clientes.forEach(cliente => {
      cliente.historialServicios.forEach(h => {
        if (h.servicio) {
          const nombreServicio = h.servicio.nombre;
          if (!conteoServicios[nombreServicio]) {
            conteoServicios[nombreServicio] = {
              vecesVendido: 0,
              precioAseguradora: h.servicio.precioAseguradora,
              imagenUrl: h.servicio.imagenUrl || 'https://via.placeholder.com/150'
            };
          }
          conteoServicios[nombreServicio].vecesVendido++;
        }
      });
    });

    const topServicios = Object.entries(conteoServicios)
      .sort((a, b) => b[1].vecesVendido - a[1].vecesVendido)
      .slice(0, 10)
      .map(([nombre, datos]) => ({
        nombre,
        vecesVendido: datos.vecesVendido,
        precioAseguradora: datos.precioAseguradora,
        imagenUrl: datos.imagenUrl
      }));

    res.json(topServicios);
  } catch (error) {
    console.error('Error al obtener top servicios vendidos:', error);
    res.status(500).json({ message: 'Error interno al obtener top servicios vendidos' });
  }
});

/* 📌 2. Top Coberturas Más Usadas */
router.get('/top-coberturas', async (req, res) => {
  try {
    const clientes = await Cliente.find({}).populate('polizaId');
    const conteoCoberturas = {};

    clientes.forEach(cliente => {
      const cobertura = cliente.polizaId?.coberturaId;
      if (cobertura) {
        const id = cobertura.toString();
        conteoCoberturas[id] = (conteoCoberturas[id] || 0) + 1;
      }
    });

    const coberturas = await Cobertura.find({ _id: { $in: Object.keys(conteoCoberturas) } });

    const resultado = coberturas.map(cob => ({
      nombre: cob.nombre,
      porcentaje: cob.porcentajeCobertura,
      vecesUsada: conteoCoberturas[cob._id.toString()]
    })).sort((a, b) => b.vecesUsada - a.vecesUsada).slice(0, 10);

    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener top coberturas:', error);
    res.status(500).json({ message: 'Error interno al obtener top coberturas' });
  }
});

/* 📌 3. Top Pólizas Más Contratadas */
router.get('/top-polizas', async (req, res) => {
  try {
    const clientes = await Cliente.find({});
    const conteoPolizas = {};

    clientes.forEach(cliente => {
      const poliza = cliente.polizaId;
      if (poliza) {
        const id = poliza.toString();
        conteoPolizas[id] = (conteoPolizas[id] || 0) + 1;
      }
    });

    const polizas = await Poliza.find({ _id: { $in: Object.keys(conteoPolizas) } });

    const resultado = polizas.map(pol => ({
      nombre: pol.nombre,
      tipo: pol.tipoPoliza || "General",
      vecesContratada: conteoPolizas[pol._id.toString()]
    })).sort((a, b) => b.vecesContratada - a.vecesContratada).slice(0, 10);

    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener top polizas:', error);
    res.status(500).json({ message: 'Error interno al obtener top polizas' });
  }
});

/* 📌 4. Top Servicios Solicitados (en Citas) */
router.get('/top-servicios-solicitados', async (req, res) => {
  try {
    const clientes = await Cliente.find({}).select('historialServicios').populate('historialServicios.servicio');

    const conteoServicios = {};

    clientes.forEach(cliente => {
      cliente.historialServicios.forEach(h => {
        if (h.servicio) {
          const nombre = h.servicio.nombre;
          conteoServicios[nombre] = (conteoServicios[nombre] || 0) + 1;
        }
      });
    });

    const resultado = Object.entries(conteoServicios)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([nombre, vecesSolicitado]) => ({ nombre, vecesSolicitado }));

    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener top servicios solicitados:', error);
    res.status(500).json({ message: 'Error interno al obtener top servicios solicitados' });
  }
});

/* 📌 5. Empleados Destacados (más antiguos) */
router.get('/top-empleados', async (req, res) => {
    try {
      const empleados = await Empleado.find({}).sort({ createdAt: 1 }).limit(10);
  
      const resultado = empleados.map(emp => ({
        nombre: emp.nombre,
        puesto: emp.puesto || "Empleado",
        fechaIngreso: emp.createdAt
      }));
  
      res.json(resultado);
    } catch (error) {
      console.error('Error al obtener top empleados:', error);
      res.status(500).json({ message: 'Error interno al obtener top empleados' });
    }
  });
  

/* 📌 6. Próximas Citas Médicas */
router.get('/proximas-citas', async (req, res) => {
  try {
    const hoy = new Date();
    const citas = await Cita.find({ fechaCita: { $gte: hoy } }).sort({ fechaCita: 1 }).limit(10);

    const resultado = citas.map(cita => ({
      paciente: cita.nombrePaciente || "Paciente",
      fechaCita: cita.fechaCita,
      hospital: cita.hospitalNombre || "Hospital",
      servicio: cita.servicioNombre || "Servicio"
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener próximas citas:', error);
    res.status(500).json({ message: 'Error interno al obtener próximas citas' });
  }
});

/* 📌 7. Últimas Solicitudes de Servicios */
router.get('/ultimos-servicios', async (req, res) => {
    try {
      const servicios = await Servicio.find({}).sort({ createdAt: -1 }).limit(10);
  
      const resultado = servicios.map(servicio => ({
        nombre: servicio.nombre,
        descripcion: servicio.descripcion || "Sin descripción",
        precio: servicio.precioAseguradora || 0,
        imagenUrl: servicio.imagenUrl || 'https://via.placeholder.com/150'
      }));
  
      res.json(resultado);
    } catch (error) {
      console.error('Error al obtener últimos servicios:', error);
      res.status(500).json({ message: 'Error interno al obtener últimos servicios' });
    }
  });
  

export default router;
