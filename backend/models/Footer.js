import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  contenido: { type: String, required: true }
});

export default mongoose.model("Footer", footerSchema);
