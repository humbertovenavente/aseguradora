import mongoose from "mongoose";

const RolSchema = new mongoose.Schema({
    role_name: { type: String, required: true, unique: true }
});

const Rol = mongoose.model("Rol", RolSchema, "Rol"); // 🔥 Asegurar referencia a "Rol"
export default Rol;
