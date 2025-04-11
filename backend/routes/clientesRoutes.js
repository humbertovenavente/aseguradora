import express from 'express';
import mongoose from 'mongoose';
import Cliente from '../models/Clientes.js';
import Usuario from '../models/Usuario.js';
import Hospital from '../models/Hospital.js';
import Servicio from '../models/Servicio.js';
import Poliza from '../models/Poliza.js';

const router = express.Router();
const ROL_CLIENTE_ID = new mongoose.Types.ObjectId("67d652411d30a899ff50a40e");

router.get("/", async (req, res) => {
    try {
        const clientes = await Cliente.find()
            .populate("usuarioId", "correo")
            .populate("historialServicios.hospital", "nombre direccion telefono")
            .populate("historialServicios.servicio", "nombre descripcion precioAseguradora")
            .select("-__v");

        res.status(200).json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los clientes." });
    }
});

  






/**
 *  GET - Obtener un cliente por su ID con historial de servicios
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findById(id)
            .populate('usuarioId', 'correo')
            .populate("historialServicios.hospital", "nombre direccion telefono")
            .populate("historialServicios.servicio", "nombre descripcion precioAseguradora");

        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado." });

        res.status(200).json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el cliente." });
    }
});

/**
 *  POST - Crear un Cliente y Usuario asociado
 */
router.post('/', async (req, res) => {
    try {
        console.log(" Datos recibidos:", req.body); // LOG PARA DEPURACIÓN

        const { nombre, apellido, documento, telefono, fechaNacimiento, direccion, numeroAfiliacion, polizaId, polizaNombre, fechaVencimiento, correo, contrasena } = req.body;
        
        if (!correo || !contrasena) {
            return res.status(400).json({ message: "Correo y contraseña son obligatorios." });
        }

        // Verificar si ya existe un cliente con el mismo documento
        const clienteExistente = await Cliente.findOne({ documento });
        if (clienteExistente) {
            return res.status(400).json({ message: `El documento "${documento}" ya está en uso.` });
        }//el correo debe ser unico sino tira error 

        // Verificar si ya existe un usuario con el mismo correo
        const usuarioExistente = await Usuario.findOne({ correo }); //Evita que se registre dos veces el mismo cliente
        if (usuarioExistente) {
            return res.status(400).json({ message: `El correo "${correo}" ya está en uso.` });
        }

        const nuevoUsuario = new Usuario({
            correo,
            contrasena,
            fecha_creacion: new Date(),
            estado: 1,
            rol_id: ROL_CLIENTE_ID
        });

        const usuarioGuardado = await nuevoUsuario.save();

        const nuevoCliente = new Cliente({
            nombre,
            apellido,
            documento,
            telefono,
            fechaNacimiento,
            direccion,
            numeroAfiliacion,
            polizaId,
            polizaNombre,
            fechaVencimiento,
            estadoPago: false,
            aseguradora: new mongoose.Types.ObjectId(req.body.aseguradora || "67f84c1741019fe432da579c"),
            usuarioId: usuarioGuardado._id // se asocia cliente con el usuario recien creado, dspues se guarda en la base de datos
            
        });

        const clienteGuardado = await nuevoCliente.save();

        console.log(" Cliente y Usuario creados correctamente.");
        return res.status(201).json({ message: "Cliente y Usuario creados exitosamente.", cliente: clienteGuardado });

    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ message: `El valor "${error.keyValue[field]}" ya está en uso en el campo "${field}".` });
        }

        console.error(" Error en el servidor:", error);
        return res.status(500).json({ message: "Error al crear el Cliente y Usuario.", error });
    }
});



/**
 *  PUT - Actualizar Cliente y Usuario
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, documento, telefono, fechaNacimiento, direccion, numeroAfiliacion, polizaId, polizaNombre, fechaVencimiento, contrasena, estado } = req.body;

        const cliente = await Cliente.findById(id);
        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado." });

        const usuario = await Usuario.findById(cliente.usuarioId);
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado." });

        // Actualizar Cliente
        cliente.nombre = nombre || cliente.nombre;
        cliente.apellido = apellido || cliente.apellido;
        cliente.documento = documento || cliente.documento;
        cliente.telefono = telefono || cliente.telefono;
        cliente.fechaNacimiento = fechaNacimiento || cliente.fechaNacimiento;
        cliente.direccion = direccion || cliente.direccion;
        cliente.numeroAfiliacion = numeroAfiliacion || cliente.numeroAfiliacion;
        cliente.polizaId = polizaId || cliente.polizaId;
        cliente.polizaNombre = polizaNombre || cliente.polizaNombre;
        cliente.fechaVencimiento = fechaVencimiento || cliente.fechaVencimiento;

        // Actualizar Usuario
        usuario.contrasena = contrasena || usuario.contrasena;
        usuario.estado = estado !== undefined ? estado : usuario.estado;

        await cliente.save();
        await usuario.save();

        res.status(200).json({ message: "Cliente y Usuario actualizados correctamente.", cliente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el Cliente y Usuario." });
    }
});


/**
 *  DELETE - Eliminar Cliente y Usuario
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Asegurar que el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido." });
        }

        const cliente = await Cliente.findById(id);
        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado." });

        // Buscar y eliminar el Usuario asociado
        const usuario = await Usuario.findById(cliente.usuarioId);
        if (usuario) {
            await Usuario.findByIdAndDelete(cliente.usuarioId);
        }

        // Eliminar el Cliente
        await Cliente.findByIdAndDelete(id);

        res.status(200).json({ message: "Cliente y Usuario eliminados correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el Cliente y Usuario." });
    }
});

// POST - Crear cliente desde usuario ya existente
router.post('/crear-desde-usuario/:usuarioId', async (req, res) => {
    try {
        const { usuarioId } = req.params;

        const {
            nombre = "Cliente",
            apellido = "Nuevo",
            documento,
            telefono = "",
            direccion = "Dirección por defecto",
            numeroAfiliacion
        } = req.body;

        // Validar usuario existente
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Validar documento único
        if (!documento) {
            return res.status(400).json({ message: "Documento es obligatorio." });
        }

        const existeDocumento = await Cliente.findOne({ documento });
        if (existeDocumento) {
            return res.status(400).json({ message: "Documento ya en uso." });
        }

        // Buscar una póliza válida para asignar automáticamente
        const polizaDefault = await Poliza.findOne();
        if (!polizaDefault) {
            return res.status(400).json({ message: "No hay pólizas disponibles para asignar." });
        }

        const nuevoCliente = new Cliente({
            nombre,
            apellido,
            documento,
            telefono,
            direccion,
            numeroAfiliacion,
            polizaId: polizaDefault._id,
            polizaNombre: polizaDefault.nombre,
            fechaVencimiento: polizaDefault.vigencia,
            usuarioId: usuario._id,
            estadoPago: false,
            aseguradora: new mongoose.Types.ObjectId(req.body.aseguradora || "67f84c1741019fe432da579c")

        });

        await nuevoCliente.save();

        return res.status(201).json({ message: "Cliente creado desde usuario", cliente: nuevoCliente });
    } catch (error) {
        console.error("Error al crear cliente desde usuario:", error);
        return res.status(500).json({ message: "Error interno al crear cliente desde usuario", error: error.message });
    }
});


/////////////////ALERTA




// este es solo para cuadno hospoital envie la informacion con los datos

/**
 *  POST - Agregar un historial de servicio a un cliente
 */
router.post('/:id/historial', async (req, res) => {
    try {
        const { id } = req.params; // ID del cliente
        const { hospitalId, servicioId, fechaServicio, costo, copago, comentarios, resultados } = req.body;

        // Verificar si el cliente existe
        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }

        // Verificar si el hospital existe
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital no encontrado." });
        }

        // Verificar si el servicio existe
        const servicio = await Servicio.findById(servicioId);
        if (!servicio) {
            return res.status(404).json({ message: "Servicio no encontrado." });
        }

        // Crear el nuevo historial de servicio
        const nuevoHistorial = {
            hospital: hospital._id,
            servicio: servicio._id,
            fechaServicio: fechaServicio || new Date(),
            costo: costo || servicio.precioAseguradora,
            copago: copago || 0, // Se puede calcular basado en la cobertura
            comentarios: comentarios || "",
            resultados: resultados || ""
        };

        // Agregar al historial de servicios del cliente
        cliente.historialServicios.push(nuevoHistorial);

        // Guardar el cliente actualizado
        await cliente.save();

        res.status(201).json({ message: "Historial de servicio agregado exitosamente.", historial: nuevoHistorial });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar historial de servicio.", error: error.message });
    }
});

/**
 *  GET - Obtener el historial de servicios de un cliente
 */
router.get('/:id/historial', async (req, res) => {
    try {
        const { id } = req.params;

        const cliente = await Cliente.findById(id)
            .populate("historialServicios.hospital", "nombre direccion telefono")
            .populate("historialServicios.servicio", "nombre descripcion precioAseguradora");

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }

        // Devolver directamente el historial ya poblado
        return res.status(200).json(cliente.historialServicios);
    } catch (error) {
        console.error("Error al obtener el historial de servicios:", error);
        res.status(500).json({ message: "Error al obtener el historial de servicios.", error: error.message });
    }
});


router.delete('/:id/historial', async (req, res) => {
    try {
        const { id } = req.params; // ID del cliente

        // Buscar al cliente
        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }

        // Vaciar el historial de servicios
        cliente.historialServicios = [];

        // Guardar el cliente actualizado
        await cliente.save();

        res.status(200).json({ message: "Historial de servicios eliminado correctamente." });
    } catch (error) {
        console.error(" Error al eliminar el historial de servicios:", error);
        res.status(500).json({ message: "Error al eliminar el historial de servicios.", error: error.message });
    }
});

//recalcula copagos
/**
 *  PUT - Recalcular Copago de un Cliente
 */
router.put('/:id/recalcular-copago', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Buscar al cliente
        const cliente = await Cliente.findById(id).populate("polizaId");
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }

        // Obtener la póliza y la cobertura
        const poliza = await Poliza.findById(cliente.polizaId).populate("coberturaId");
        if (!poliza || !poliza.coberturaId) {
            return res.status(404).json({ message: "Cobertura no encontrada para la póliza del cliente." });
        }

        const porcentajeCobertura = poliza.coberturaId.porcentajeCobertura || 0;

        // Recorrer historial de servicios y actualizar copagos
        for (let i = 0; i < cliente.historialServicios.length; i++) {
            const servicio = await Servicio.findById(cliente.historialServicios[i].servicio);

            if (!servicio) {
                console.log(`No se encontró el servicio con ID: ${cliente.historialServicios[i].servicio}`);
                continue;
            }

            // Recalcular copago basado en el precioAseguradora del servicio
            const nuevoCopago = (servicio.precioAseguradora * (1 - (porcentajeCobertura / 100))).toFixed(2);
            cliente.historialServicios[i].copago = parseFloat(nuevoCopago);
        }

        await cliente.save();

        res.status(200).json({ message: "Copagos actualizados correctamente.", historialServicios: cliente.historialServicios });

    } catch (error) {
        console.error(" Error al recalcular copagos:", error);
        res.status(500).json({ message: "Error al recalcular copagos.", error: error.message });
    }
});

// PUT - Marcar como pagado un servicio del historial
router.put('/:clienteId/historial/:historialId/pagar', async (req, res) => {
    try {
        console.log("Entrando a la ruta de pago de copago");
        const { clienteId, historialId } = req.params;

        const cliente = await Cliente.findById(clienteId);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }

        console.log("Cliente encontrado");
        console.log("IDs de historial existentes:");
        cliente.historialServicios.forEach(h => {
            console.log("   -", h._id.toString());
        });

        //  CORRECCIÓN AQUÍ
        const historial = cliente.historialServicios.find(h =>
            new mongoose.Types.ObjectId(h._id).equals(historialId)
        );

        console.log("📌 Resultado de búsqueda del historial:", historial);

        if (!historial) {
            return res.status(404).json({ message: "Historial no encontrado." });
        }

        historial.estadoCopago = "pagado";
        await cliente.save();

        return res.status(200).json({
            message: "Copago pagado correctamente.",
            historialActualizado: historial
        });

    } catch (error) {
        console.error("❌ Error interno:", error);
        return res.status(500).json({ message: "Error al procesar el copago.", error: error.message });
    }
});


// Obtener clientes filtrados por hospital y aseguradora
router.get('/hospital/:hospitalId/aseguradora/:aseguradoraId', async (req, res) => {
    try {
      const { hospitalId, aseguradoraId } = req.params;
  
      const clientes = await Cliente.find({
        aseguradora: aseguradoraId,
        hospitalesAutorizados: { $in: [hospitalId] }
      });
  
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener clientes filtrados' });
    }
  });
  

  // routes/clientesRoutes.js
router.get('/hospital/:hospitalId', async (req, res) => {
    try {
      const clientes = await Cliente.find({
        hospitalesAutorizados: req.params.hospitalId
      });
      res.json(clientes);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener clientes por hospital' });
    }
  });

  // Buscar cliente por número de afiliación, hospital y aseguradora
// Buscar cliente por número de afiliación SIN necesidad de aseguradora ni hospital
// Buscar cliente por documento (DPI)
router.get('/buscar-por-documento/:documento', async (req, res) => {
    try {
      const { documento } = req.params;
      const cliente = await Cliente.findOne({ documento });
  
      if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado con ese DPI." });
      }
  
      res.status(200).json(cliente);
    } catch (error) {
      console.error("Error al buscar cliente:", error);
      res.status(500).json({ message: "Error al buscar el cliente por documento." });
    }
  });
  
  
  // CONEXION con Hospital para buscar Historial por Documento y Aseguradora 

  // GET 
router.get('/historial/buscar', async (req, res) => {
    try {
      const { documento, aseguradoraId } = req.query;
  
      if (!documento || !aseguradoraId) {
        return res.status(400).json({ message: "Faltan datos: documento o aseguradoraId." });
      }
  
      const cliente = await Cliente.findOne({ documento, aseguradora: aseguradoraId })
        .populate("historialServicios.hospital", "nombre direccion telefono")
        .populate("historialServicios.servicio", "nombre descripcion precioAseguradora");
  
      if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado con ese DPI y aseguradora." });
      }
  
      res.status(200).json({ cliente, historial: cliente.historialServicios });
    } catch (error) {
      console.error("Error al buscar historial:", error);
      res.status(500).json({ message: "Error interno", error: error.message });
    }
  });
  
  


export default router;
