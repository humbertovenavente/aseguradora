import mongoose from "mongoose";

/**
 * Esquema para roles del sistema (admin, cliente, empleado, etc).
 */
const RolSchema = new mongoose.Schema({
  /** Nombre único del rol */
  role_name: { type: String, required: true, unique: true }
});

const Rol = mongoose.model("Rol", RolSchema, "Rol");
export default Rol;
