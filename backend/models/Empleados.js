import mongoose from "mongoose";

const EmpleadoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    documento: { type: String, required: true, unique: true },
    photo: { type: String, default: "" },

    telefono: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    direccion: { type: String, required: true },

    detallesTrabajo: {
      puesto: { type: String, required: true },
      sucursal: { type: String, required: true },
      fechaIngreso: { type: Date, required: true, default: Date.now },
      estado: { type: String, enum: ["activo", "inactivo"], default: "activo" },
    },

    auditoria: {
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    },

    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Empleado", EmpleadoSchema);
