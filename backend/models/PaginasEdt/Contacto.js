import mongoose from "mongoose";

const ContactoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  introduccion: { type: String },
  telefono: { type: String },
  direccion: { type: String },
  correo: { type: String },
});

export default mongoose.model("Contacto", ContactoSchema);
