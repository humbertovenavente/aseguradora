import express from "express";
import Usuario from "../models/Usuario.js";
import Rol from "../models/Rol.js";

const router = express.Router();

// Obtener todos los usuarios con sus roles
router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.find().populate("rol_id", "role_name");
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Asignar rol y activar usuario
router.put("/asignar-rol/:id", async (req, res) => {
    const { id } = req.params;
    const { rol_id } = req.body;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        usuario.rol_id = rol_id;
        usuario.estado = 1; // Activamos el usuario
        await usuario.save();

        res.json({ message: "Rol asignado y usuario activado correctamente", usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Desactivar usuario y remover rol
router.put("/desactivar/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        usuario.rol_id = null;
        usuario.estado = 0; // Desactivamos el usuario
        await usuario.save();

        res.json({ message: "Usuario desactivado y rol removido", usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todos los roles disponibles
router.get("/roles", async (req, res) => {
    try {
        const roles = await Rol.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
