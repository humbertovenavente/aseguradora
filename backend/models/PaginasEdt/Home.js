import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema({
  // Ejemplo de una sección "hero"
  hero: {
    backgroundImage: { type: String, default: "" },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    cta_1: {
      text: { type: String, default: "" },
      link: { type: String, default: "" }
    },
    cta_2: {
      text: { type: String, default: "" },
      link: { type: String, default: "" }
    }
  },

  // Ejemplo de otra sección: "Encuentra tu Tranquilidad"
  tranquilidad: {
    imageUrl: { type: String, default: "" },
    title: { type: String, default: "" },
    leadText: { type: String, default: "" },
    description: { type: String, default: "" },
    buttonText: { type: String, default: "" },
    buttonLink: { type: String, default: "" }
  },

  // Sección "Why" con un arreglo de tarjetas
  whySection: {
    sectionTitle: { type: String, default: "" },
    cards: [
      {
        cardTitle: { type: String, default: "" },
        cardText: { type: String, default: "" },
        imageUrl: { type: String, default: "" },
        buttonText: { type: String, default: "" },
        buttonLink: { type: String, default: "" }
      }
    ]
  },

  // Sección "About"
  about: {
    title: { type: String, default: "" },
    text: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    buttonText: { type: String, default: "" },
    buttonLink: { type: String, default: "" }
  },

  // Referencia a la colección de servicios para mostrar servicios destacados
  serviciosDestacados: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Servicio" // Nombre del modelo que usas para servicios
    }
  ],

  // Referencia a la colección de testimonios (un documento o varios)
  // En este ejemplo, asumimos que guardas un solo documento "Testimonios"
  // que agrupa todo lo que necesitas. Si tienes varios, puedes usar un array.
  testimonios: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Testimonios"
  }
});

export default mongoose.model("Home", HomeSchema);
