import express from 'express';
import Usuario from '../models/Usuario.js'; 
import Rol from "../models/Rol.js";  
const router = express.Router();

// Registrar usuario (Signup)
import mongoose from 'mongoose';

router.post('/signup', async (req, res) => {
    try {
        const { correo, contrasena, rol_id } = req.body;
        
        // Convertir rol_id a ObjectId si existe
        const rolObjectId = rol_id ? new mongoose.Types.ObjectId(rol_id) : null;

        const nuevoUsuario = new Usuario({ correo, contrasena, rol_id: rolObjectId });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error en el registro', error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        // Buscar usuario sin populate para verificar si rol_id está presente
        const usuarioSinPopulate = await Usuario.findOne({ correo });
        console.log("Usuario sin populate:", usuarioSinPopulate);

        // Hacer populate con estructura completa
        const usuario = await Usuario.findOne({ correo })
            .populate({
                path: "rol_id", // Referencia al modelo Rol
                select: "role_name" // Solo traer el nombre del rol
            })
            .exec();

        console.log("Usuario con populate:", usuario);

        if (!usuario) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }

        if (usuario.contrasena !== contrasena) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        if (usuario.estado === 0) {
            return res.status(403).json({ mensaje: "Cuenta inactiva, espera activación" });
        }

        res.json({
            mensaje: "Login exitoso",
            usuario: {
                id: usuario._id,
                correo: usuario.correo,
                estado: usuario.estado,
                rol_id: usuario.rol_id ? usuario.rol_id._id : null, // 
                rol_nombre: usuario.rol_id ? usuario.rol_id.role_name : "Sin rol" 
            }
        });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ mensaje: "Error en el login", error });
    }
});


export default router;