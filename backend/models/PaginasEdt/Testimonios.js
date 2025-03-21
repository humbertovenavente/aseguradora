import mongoose from "mongoose";

const ServicioSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true },  // Ej.: "NUEVO SERVICIO"
  serviceTitle: { type: String, required: true },    // Ej.: "Servicio Destacado"
  tagline: { type: String, required: true },         // Breve descripción del servicio
  serviceImage: { type: String, required: true },    // URL de la imagen representativa del servicio
  learnMoreUrl: { type: String },                    // URL para "Conócenos"
  requestQuoteUrl: { type: String },                 // URL para "Solicitar Cotización"
});

const ReviewSchema = new mongoose.Schema({
  stars: { type: Number, required: true },
  reviewTitle: { type: String, required: true },
  reviewText: { type: String, required: true },
});

const NewsletterSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, required: true },
});

const AboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const TestimoniosSchema = new mongoose.Schema({
  servicio: { type: ServicioSchema, required: true },
  reviews: [ReviewSchema],
  newsletter: { type: NewsletterSchema, required: true },
  about: { type: AboutSchema, required: true },
});

export default mongoose.model("Testimonios", TestimoniosSchema);
