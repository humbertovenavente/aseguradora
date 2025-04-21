import mongoose from "mongoose";

/**
 * Esquema para empleados del sistema.
 * Incluye datos personales, laborales y de auditoría.
 */
const EmpleadoSchema = new mongoose.Schema({
  /** Nombre del empleado */
  nombre: { type: String, required: true },

  /** Apellido del empleado */
  apellido: { type: String, required: true },

  /** Documento de identificación único */
  documento: { type: String, required: true, unique: true },

  /** Foto del empleado (URL o base64) */
  photo: { type: String, default: "" },

  /** Teléfono del empleado */
  telefono: { type: String, required: true },

  /** Fecha de nacimiento */
  fechaNacimiento: { type: Date, required: true },

  /** Dirección de residencia */
  direccion: { type: String, required: true },

  /** Detalles del trabajo (puesto, sucursal, etc.) */
  detallesTrabajo: {
    puesto: { type: String, required: true },
    sucursal: { type: String, required: true },
    fechaIngreso: { type: Date, required: true, default: Date.now },
    estado: { type: String, enum: ["activo", "inactivo"], default: "activo" }
  },

  /** Auditoría de creación y actualización */
  auditoria: {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }
  },

  /** Usuario asociado en la plataforma */
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }
}, { timestamps: true });

export default mongoose.model("Empleado", EmpleadoSchema);
