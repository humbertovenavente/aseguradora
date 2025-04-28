import mongoose from "mongoose";

/**
 * Subdocumento para cada proveedor dentro de la red.
 */
const ProveedorSchema = new mongoose.Schema({
  /** Nombre del proveedor */
  nombre: { type: String, required: true },

  /** Descripción del proveedor o sus servicios */
  descripcion: { type: String, required: true },

  /** URL de la imagen del proveedor */
  imagenUrl: { type: String, required: true }
});

/**
 * Esquema que representa la red de proveedores del sistema.
 */
const RedProveedoresSchema = new mongoose.Schema({
  /** Lista de proveedores disponibles */
  proveedores: [ProveedorSchema]
});

export default mongoose.model("RedProveedores", RedProveedoresSchema);
