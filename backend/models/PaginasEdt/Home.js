import mongoose from "mongoose";

/**
 * Esquema para la página principal del sitio web.
 * Contiene secciones como héroe, tranquilidad, why, about, servicios y testimonios.
 */
const HomeSchema = new mongoose.Schema({
  /** Sección principal tipo "hero" */
  hero: {
    backgroundImage: { type: String, default: "" },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    cta_1: { text: { type: String, default: "" }, link: { type: String, default: "" }},
    cta_2: { text: { type: String, default: "" }, link: { type: String, default: "" }}
  },

  /** Sección "Encuentra tu Tranquilidad" */
  tranquilidad: {
    imageUrl: { type: String, default: "" },
    title: { type: String, default: "" },
    leadText: { type: String, default: "" },
    description: { type: String, default: "" },
    buttonText: { type: String, default: "" },
    buttonLink: { type: String, default: "" }
  },

  /** Sección "Why" con tarjetas de razones */
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

  /** Sección "About" */
  about: {
    title: { type: String, default: "" },
    text: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    buttonText: { type: String, default: "" },
    buttonLink: { type: String, default: "" }
  },

  /** 🔥 Agregado: Imagenes para las secciones especiales */
  imagenesSecciones: {
    imagenTopCoberturas: { type: String, default: "" },
    imagenTopPolizas: { type: String, default: "" },
    imagenTopServiciosSolicitados: { type: String, default: "" },
    imagenUltimosServicios: { type: String, default: "" },
    imagenProximasCitas: { type: String, default: "" },
    imagenTopEmpleados: { type: String, default: "" }
  },

  /** Servicios destacados seleccionados */
  serviciosDestacados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servicio"
  }],

  /** Referencia a documento de testimonios */
  testimonios: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Testimonios"
  }
});

export default mongoose.model("Home", HomeSchema);
