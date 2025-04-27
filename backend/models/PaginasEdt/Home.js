import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema({
  hero: { 
    backgroundImage: { type: String, default: "" },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    cta_1: { text: { type: String, default: "" }, link: { type: String, default: "" }},
    cta_2: { text: { type: String, default: "" }, link: { type: String, default: "" }}
  },
  tranquilidad: {
    imageUrl: { type: String, default: "" },
    title: { type: String, default: "" },
    leadText: { type: String, default: "" },
    description: { type: String, default: "" },
    buttonText: { type: String, default: "" },
    buttonLink: { type: String, default: "" }
  },
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
  about: {
    title: { type: String, default: "" },
    text: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    buttonText: { type: String, default: "" },
    buttonLink: { type: String, default: "" }
  },
  // 🔥🔥🔥 FALTA LA COMA AQUÍ ANTES 🔥🔥🔥
  imagenesSecciones: {
    imagenTopCoberturas: { type: String, default: "" },
    imagenTopPolizas: { type: String, default: "" },
    imagenTopServiciosSolicitados: { type: String, default: "" },
    imagenUltimosServicios: { type: String, default: "" },
    imagenProximasCitas: { type: String, default: "" }
  },
  serviciosDestacados: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Servicio" }
  ],
  testimonios: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Testimonios"
  }
});


export default mongoose.model("Home", HomeSchema);
