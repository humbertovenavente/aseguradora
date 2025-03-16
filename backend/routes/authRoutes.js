import express from 'express';
import Usuario from '../models/Usuario.js'; 
import Rol from "../models/Rol.js";  
const router = express.Router();

// Registrar usuario (Signup)
router.post('/signup', async (req, res) => {
    try {
        const { correo, contrasena, rol_id = null } = req.body;
        
        const nuevoUsuario = new Usuario({ correo, contrasena, rol_id });
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error en el registro', error });
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        const usuario = await Usuario.findOne({ correo }).populate("rol_id");

        if (!usuario) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }

        if (usuario.contrasena !== contrasena) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        // Devolver datos del usuario sin generar token
        res.json({
            mensaje: "Login exitoso",
            usuario: {
                id: usuario._id,
                correo: usuario.correo,
                estado: usuario.estado,
                rol_id: usuario.rol_id
            }
        });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ mensaje: "Error en el login", error });
    }
});

export default router;