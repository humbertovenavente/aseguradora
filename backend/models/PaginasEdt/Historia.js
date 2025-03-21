import mongoose from "mongoose";

const HistoriaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  imagenUrl: { type: String, required: true },
  parrafos: [{ type: String }]  // Array de strings para cada párrafo
});


export default mongoose.model("Historia", HistoriaSchema);