import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    correo: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
    fecha_creacion: { type: Date, default: Date.now },
    estado: { type: Number, default: 0 }, // 1 = Activo, 0 = Inactivo
    rol_id: { type: mongoose.Schema.Types.ObjectId, ref: "Rol" } 
});

const Usuario = mongoose.model("Usuario", UsuarioSchema, "Usuario");
export default Usuario;
