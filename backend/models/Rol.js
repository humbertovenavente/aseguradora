import mongoose from "mongoose";

const RolSchema = new mongoose.Schema({
    role_name: { type: String, required: true, unique: true }
});

const Rol = mongoose.model("Rol", RolSchema);
export default Rol;
