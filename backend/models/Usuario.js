import mongoose from "mongoose";

/**
 * Esquema de usuario del sistema (cliente, administrador, etc).
 * Contiene correo, contraseña, rol y estado.
 */
const UsuarioSchema = new mongoose.Schema({
  /** Correo electrónico único del usuario */
  correo: { type: String, required: true, unique: true },

  /** Contraseña encriptada del usuario */
  contrasena: { type: String, required: true },

  /** Fecha de creación del usuario */
  fecha_creacion: { type: Date, default: Date.now },

  /** Estado del usuario (1 = activo, 0 = inactivo) */
  estado: { type: Number, default: 0 },

  /** Rol del usuario (cliente, empleado, admin, etc.) */
  rol_id: { type: mongoose.Schema.Types.ObjectId, ref: "Rol" }
});

const Usuario = mongoose.model("Usuario", UsuarioSchema, "Usuario");
export default Usuario;
