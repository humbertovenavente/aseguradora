import express from 'express';
import mongoose from 'mongoose';
import Cliente from '../models/Clientes.js';
import Usuario from '../models/Usuario.js';

const router = express.Router();
const ROL_CLIENTE_ID = new mongoose.Types.ObjectId("67d652411d30a899ff50a40e");

/**
 *  GET - Obtener todos los clientes con sus correos desde Usuario
 */
router.get("/", async (req, res) => {
    try {
      const clientes = await Cliente.find()
        .populate("usuarioId", "correo contrasena")
        .select("-__v");
  
      // Asegurar que historialServicios siempre sea un array
      const clientesConHistorial = clientes.map(cliente => ({
        ...cliente._doc,
        historialServicios: cliente.historialServicios || []  // Si es undefined, lo convierte en []
      }));
  
      res.status(200).json(clientesConHistorial);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los clientes." });
    }
  });
  


/**
 *  GET - Obtener un cliente por su ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findById(id).populate('usuarioId', 'correo contrasena rol_id fecha_creacion estado');
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
        console.log("🔹 Datos recibidos:", req.body); // LOG PARA DEPURACIÓN

        const { nombre, apellido, documento, telefono, fechaNacimiento, direccion, numeroAfiliacion, polizaId, polizaNombre, fechaVencimiento, correo, contrasena } = req.body;
        
        if (!correo || !contrasena) {
            return res.status(400).json({ message: "Correo y contraseña son obligatorios." });
        }

        // Verificar si ya existe un cliente con el mismo documento
        const clienteExistente = await Cliente.findOne({ documento });
        if (clienteExistente) {
            return res.status(400).json({ message: `El documento "${documento}" ya está en uso.` });
        }

        // Verificar si ya existe un usuario con el mismo correo
        const usuarioExistente = await Usuario.findOne({ correo });
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
            usuarioId: usuarioGuardado._id
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


export default router;
