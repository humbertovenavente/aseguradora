    import express from "express";
    import Rol from "../models/Rol.js";

    const router = express.Router();

    // Obtener todos los roles
    router.get("/", async (req, res) => {
        try {
            const roles = await Rol.find();
            res.json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    //  Crear un nuevo rol
    router.post("/", async (req, res) => {
        const { role_name } = req.body;

        try {
            if (!role_name) {
                return res.status(400).json({ message: "El nombre del rol es obligatorio" });
            }

            const nuevoRol = new Rol({ role_name });
            await nuevoRol.save();

            res.status(201).json({ message: "Rol creado exitosamente", rol: nuevoRol });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    //  Eliminar un rol por ID
    router.delete("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            await Rol.findByIdAndDelete(id);
            res.json({ message: "Rol eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    export default router;
