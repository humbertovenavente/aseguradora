import mongoose from "mongoose";

const ProveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagenUrl: { type: String, required: true },
});

const RedProveedoresSchema = new mongoose.Schema({
  proveedores: [ProveedorSchema],
});

export default mongoose.model("RedProveedores", RedProveedoresSchema);
