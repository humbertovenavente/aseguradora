import express from "express";
import mongoose from "mongoose";
import Empleado from "../models/Empleados.js";
import Usuario from "../models/Usuario.js";

const router = express.Router();
const ROL_EMPLEADO_ID = new mongoose.Types.ObjectId("67d652351d30a899ff50a40c");

/**
 *  POST - Crear un Empleado y Usuario asociado
 */
router.post("/", async (req, res) => {
  try {
    console.log("📤 Datos recibidos:", req.body);

    const {
      nombre,
      apellido,
      documento,
      telefono,
      fechaNacimiento,
      direccion,
      puesto,
      sucursal,
      fechaIngreso,
      estado,
      correo,
      contrasena
    } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ message: "Correo y contraseña son obligatorios." });
    }

    if (!puesto || !sucursal || !fechaIngreso) {
      return res.status(400).json({ message: "Puesto, sucursal y fecha de ingreso son obligatorios." });
    }

    // Verificar si ya existe un usuario con el mismo correo
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ message: `El correo "${correo}" ya está en uso.` });
    }

    //  Crear el usuario
    const nuevoUsuario = new Usuario({
      correo,
      contrasena,
      fecha_creacion: new Date(),
      estado: 1,
      rol_id: ROL_EMPLEADO_ID,
    });

    const usuarioGuardado = await nuevoUsuario.save();
    console.log("✅ Usuario guardado correctamente:", usuarioGuardado);

    //  Crear el empleado
    const nuevoEmpleado = new Empleado({
      nombre,
      apellido,
      documento,
      telefono,
      fechaNacimiento,
      direccion,
      detallesTrabajo: {
        puesto,
        sucursal,
        fechaIngreso: new Date(fechaIngreso),
        estado: estado || "activo",
      },
      auditoria: {
        createdBy: usuarioGuardado._id,
        updatedBy: usuarioGuardado._id,
      },
      usuarioId: usuarioGuardado._id,
    });

    const empleadoGuardado = await nuevoEmpleado.save();
    console.log(" Empleado guardado correctamente:", empleadoGuardado);

    return res.status(201).json({
      message: "Empleado y Usuario creados exitosamente.",
      empleado: empleadoGuardado
    });

  } catch (error) {
    console.error(" Error en el servidor:", error);

    // Capturamos errores de validación de Mongoose
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Error de validación.",
        errors: error.errors
      });
    }

    return res.status(500).json({ message: "Error al crear el Empleado y Usuario.", error });
  }
});


router.get("/", async (req, res) => {
 try {
   const empleados = await Empleado.find()
     .populate("usuarioId", "correo")
     .select("-__v");

   res.status(200).json(empleados);
 } catch (error) {
   console.error("Error al obtener empleados:", error);
   res.status(500).json({ message: "Error al obtener los empleados." });
 }
});

/**
*  GET - Obtener un empleado por su ID
*/
router.get("/:id", async (req, res) => {
 try {
   const { id } = req.params;
   const empleado = await Empleado.findById(id).populate(
     "usuarioId",
     "correo rol_id fecha_creacion estado"
   );
   if (!empleado) return res.status(404).json({ message: "Empleado no encontrado." });
   res.status(200).json(empleado);
 } catch (error) {
   console.error("Error al obtener el empleado:", error);
   res.status(500).json({ message: "Error al obtener el empleado." });
 }
});

/**
*  PUT - Actualizar un Empleado y su Usuario asociado
*/
router.put("/:id", async (req, res) => {
 try {
   const { id } = req.params;
   const {
     nombre,
     apellido,
     documento,
     telefono,
     fechaNacimiento,
     direccion,
     puesto,
     sucursal,
     fechaIngreso,
     estado,
     contrasena
   } = req.body;

   const empleado = await Empleado.findById(id);
   if (!empleado) return res.status(404).json({ message: "Empleado no encontrado." });

   const usuario = await Usuario.findById(empleado.usuarioId);
   if (!usuario) return res.status(404).json({ message: "Usuario no encontrado." });

   // Actualizar Empleado
   empleado.nombre = nombre || empleado.nombre;
   empleado.apellido = apellido || empleado.apellido;
   empleado.documento = documento || empleado.documento;
   empleado.telefono = telefono || empleado.telefono;
   empleado.fechaNacimiento = fechaNacimiento || empleado.fechaNacimiento;
   empleado.direccion = direccion || empleado.direccion;
   empleado.detallesTrabajo.puesto = puesto || empleado.detallesTrabajo.puesto;
   empleado.detallesTrabajo.sucursal = sucursal || empleado.detallesTrabajo.sucursal;
   empleado.detallesTrabajo.fechaIngreso = fechaIngreso || empleado.detallesTrabajo.fechaIngreso;
   empleado.detallesTrabajo.estado = estado || empleado.detallesTrabajo.estado;

   // Actualizar Usuario
   if (contrasena) usuario.contrasena = contrasena;

   await empleado.save();
   await usuario.save();

   res.status(200).json({ message: "Empleado y Usuario actualizados correctamente.", empleado });
 } catch (error) {
   console.error(" Error al actualizar el empleado:", error);
   res.status(500).json({ message: "Error al actualizar el Empleado y Usuario." });
 }
});

/**
*  DELETE - Eliminar Empleado y Usuario
*/
router.delete("/:id", async (req, res) => {
 try {
   const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id)) {
     return res.status(400).json({ message: "ID inválido." });
   }

   const empleado = await Empleado.findById(id);
   if (!empleado) return res.status(404).json({ message: "Empleado no encontrado." });

   await Usuario.findByIdAndDelete(empleado.usuarioId);
   await Empleado.findByIdAndDelete(id);

   res.status(200).json({ message: "Empleado y Usuario eliminados correctamente." });
 } catch (error) {
   console.error(" Error al eliminar el empleado:", error);
   res.status(500).json({ message: "Error al eliminar el Empleado y Usuario." });
 }
});

// POST - Crear empleado desde usuario existente
router.post('/crear-desde-usuario/:usuarioId', async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const {
      nombre = "Empleado",
      apellido = "Nuevo",
      documento,
      telefono,
      direccion,
      fechaNacimiento,
      puesto,
      sucursal,
      fechaIngreso = new Date(),
      estado = "activo"
    } = req.body;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (!documento || !telefono || !direccion || !fechaNacimiento || !puesto || !sucursal) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    const documentoExistente = await Empleado.findOne({ documento });
    if (documentoExistente) {
      return res.status(400).json({ message: "Documento ya está registrado." });
    }

    const nuevoEmpleado = new Empleado({
      nombre,
      apellido,
      documento,
      telefono,
      direccion,
      fechaNacimiento,
      detallesTrabajo: {
        puesto,
        sucursal,
        fechaIngreso,
        estado
      },
      auditoria: {
        createdBy: usuario._id,
        updatedBy: usuario._id
      },
      usuarioId: usuario._id
    });

    await nuevoEmpleado.save();

    res.status(201).json({ message: "Empleado creado exitosamente.", empleado: nuevoEmpleado });
  } catch (error) {
    console.error("Error al crear empleado desde usuario:", error);
    res.status(500).json({ message: "Error al crear empleado desde usuario.", error: error.message });
  }
});

export default router;
