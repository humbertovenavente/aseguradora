import mongoose from "mongoose";

const moderacionSchema = new mongoose.Schema(
  {
    pagina: {
      type: String,
      required: true, // ejemplo: 'historia', 'faq', 'contacto', etc.
    },
    contenido: {
      type: Object,
      required: true, // puede variar según el tipo de página
    },
    estado: {
      type: String,
      enum: ["pendiente", "aprobado", "rechazado"],
      default: "pendiente",
    },
    comentarioRechazo: {
      type: String,
      default: "",
    },
    creadoPor: {
        type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Moderacion", moderacionSchema);
