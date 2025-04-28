import mongoose from "mongoose";

/**
 * Servicio destacado incluido en la sección de testimonios.
 */
const ServicioSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true },
  serviceTitle: { type: String, required: true },
  tagline: { type: String, required: true },
  serviceImage: { type: String, required: true },
  learnMoreUrl: { type: String },
  requestQuoteUrl: { type: String }
});

/**
 * Opinión o reseña de un cliente.
 */
const ReviewSchema = new mongoose.Schema({
  stars: { type: Number, required: true },
  reviewTitle: { type: String, required: true },
  reviewText: { type: String, required: true }
});

/**
 * Sección de newsletter dentro de testimonios.
 */
const NewsletterSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, required: true }
});

/**
 * Sección "About" que aparece en testimonios.
 */
const AboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

/**
 * Esquema general para la sección de testimonios.
 * Contiene un servicio destacado, reseñas, newsletter y sección "about".
 */
const TestimoniosSchema = new mongoose.Schema({
  servicio: { type: ServicioSchema, required: true },
  reviews: [ReviewSchema],
  newsletter: { type: NewsletterSchema, required: true },
  about: { type: AboutSchema, required: true }
});

export default mongoose.model("Testimonios", TestimoniosSchema);
