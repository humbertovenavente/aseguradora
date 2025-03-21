import mongoose from "mongoose";

const FaqItemSchema = new mongoose.Schema({
  pregunta: { type: String, required: true },
  respuesta: { type: String, required: true },
});

const FaqSchema = new mongoose.Schema({
  items: [FaqItemSchema],
});

export default mongoose.model("Faq", FaqSchema);
