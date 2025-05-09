// src/views/AdminHomeView.jsx
import { createSignal, onMount } from "solid-js";
import { obtenerHome } from "../../services/PaginasEdt/homeService.js";
import { crearPropuesta } from "../../services/moderacionService.js";

const defaultHome = {
  hero: {
    backgroundImage: "",
    title: "",
    subtitle: "",
    cta_1: { text: "", link: "" },
    cta_2: { text: "", link: "" }
  },
  tranquilidad: {
    imageUrl: "",
    title: "",
    leadText: "",
    description: "",
    buttonText: "",
    buttonLink: ""
  },
  whySection: {
    sectionTitle: "",
    cards: []
  },
  about: {
    title: "",
    text: "",
    imageUrl: "",
    buttonText: "",
    buttonLink: ""
  },
  imagenesSecciones: {
    imagenTopCoberturas: "",
    imagenTopPolizas: "",
    imagenTopServiciosSolicitados: "",
    imagenUltimosServicios: "",
    imagenProximasCitas: ""
  },
  serviciosDestacados: [],
  testimonios: null
};

function AdminHomeView() {
  const [homeData, setHomeData] = createSignal(defaultHome);
  const [mensaje, setMensaje]   = createSignal("");

  onMount(async () => {
    try {
      const data = await obtenerHome();
      if (data && data.hero) {
        setHomeData(data);
      }
    } catch (error) {
      console.error("Error al obtener Home:", error);
    }
  });

  const handleChange = (section, field, value) => {
    setHomeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCTAChange = (ctaKey, field, value) => {
    setHomeData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [ctaKey]: {
          ...prev.hero[ctaKey],
          [field]: value
        }
      }
    }));
  };

  const handleCardChange = (index, field, value) => {
    setHomeData(prev => {
      const cards = [...prev.whySection.cards];
      cards[index] = { ...cards[index], [field]: value };
      return {
        ...prev,
        whySection: {
          ...prev.whySection,
          cards
        }
      };
    });
  };

  const addWhyCard = () => {
    setHomeData(prev => ({
      ...prev,
      whySection: {
        ...prev.whySection,
        cards: [
          ...prev.whySection.cards,
          { cardTitle: "", cardText: "", imageUrl: "", buttonText: "", buttonLink: "" }
        ]
      }
    }));
  };

  const handleImagenSeccionChange = (key, value) => {
    setHomeData(prev => ({
      ...prev,
      imagenesSecciones: {
        ...prev.imagenesSecciones,
        [key]: value
      }
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje("");
    try {
      // Obtén el correo del usuario desde localStorage
      const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
      const correo  = usuario.correo;
      if (!correo) throw new Error("Usuario no identificado");

      // Envía la propuesta a moderación
      await crearPropuesta({
        pagina:    "home",
        contenido: homeData(),
        creadoPor: correo
      });

      setMensaje("✅ Tu propuesta fue enviada a moderación");
    } catch (error) {
      console.error("Error al enviar propuesta:", error);
      setMensaje("❌ No se pudo enviar la propuesta");
    }
  };

  if (!homeData().hero) {
    return <div class="container my-5 text-center">Cargando formulario...</div>;
  }

  return (
    <div class="container my-5">
      <h1>Panel de Administración – Home</h1>
      {mensaje() && <div class="alert alert-info my-3">{mensaje()}</div>}
      <form onSubmit={handleSubmit}>

        {/* Hero Section */}
        <h2>Hero Section</h2>
        <div class="mb-3">
          <label class="form-label">Background Image</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.backgroundImage}
            onInput={e => handleChange("hero", "backgroundImage", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.title}
            onInput={e => handleChange("hero", "title", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Subtítulo</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.subtitle}
            onInput={e => handleChange("hero", "subtitle", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">CTA 1 Text</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.cta_1.text}
            onInput={e => handleCTAChange("cta_1", "text", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">CTA 1 Link</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.cta_1.link}
            onInput={e => handleCTAChange("cta_1", "link", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">CTA 2 Text</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.cta_2.text}
            onInput={e => handleCTAChange("cta_2", "text", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">CTA 2 Link</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.cta_2.link}
            onInput={e => handleCTAChange("cta_2", "link", e.currentTarget.value)}
          />
        </div>

        <hr />

        {/* Tranquilidad Section */}
        <h2>Tranquilidad Section</h2>
        <div class="mb-3">
          <label class="form-label">Image URL</label>
          <input
            type="text"
            class="form-control"
            value={homeData().tranquilidad.imageUrl}
            onInput={e => handleChange("tranquilidad", "imageUrl", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input
            type="text"
            class="form-control"
            value={homeData().tranquilidad.title}
            onInput={e => handleChange("tranquilidad", "title", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Lead Text</label>
          <input
            type="text"
            class="form-control"
            value={homeData().tranquilidad.leadText}
            onInput={e => handleChange("tranquilidad", "leadText", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea
            class="form-control"
            rows="3"
            value={homeData().tranquilidad.description}
            onInput={e => handleChange("tranquilidad", "description", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Button Text</label>
          <input
            type="text"
            class="form-control"
            value={homeData().tranquilidad.buttonText}
            onInput={e => handleChange("tranquilidad", "buttonText", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Button Link</label>
          <input
            type="text"
            class="form-control"
            value={homeData().tranquilidad.buttonLink}
            onInput={e => handleChange("tranquilidad", "buttonLink", e.currentTarget.value)}
          />
        </div>

        <hr />

        {/* Why Section */}
        <h2>Why Section</h2>
        <div class="mb-3">
          <label class="form-label">Section Title</label>
          <input
            type="text"
            class="form-control"
            value={homeData().whySection.sectionTitle}
            onInput={e => handleChange("whySection", "sectionTitle", e.currentTarget.value)}
          />
        </div>
        <button type="button" class="btn btn-secondary mb-3" onClick={addWhyCard}>
          Agregar Tarjeta
        </button>
        {homeData().whySection.cards.map((card, i) => (
          <div key={i} class="mb-3 border p-3">
            <h5>Tarjeta {i + 1}</h5>
            <div class="mb-2">
              <label class="form-label">Título</label>
              <input
                type="text"
                class="form-control"
                value={card.cardTitle}
                onInput={e => handleCardChange(i, "cardTitle", e.currentTarget.value)}
              />
            </div>
            <div class="mb-2">
              <label class="form-label">Texto</label>
              <textarea
                class="form-control"
                rows="2"
                value={card.cardText}
                onInput={e => handleCardChange(i, "cardText", e.currentTarget.value)}
              />
            </div>
            <div class="mb-2">
              <label class="form-label">Imagen URL</label>
              <input
                type="text"
                class="form-control"
                value={card.imageUrl}
                onInput={e => handleCardChange(i, "imageUrl", e.currentTarget.value)}
              />
            </div>
            <div class="mb-2">
              <label class="form-label">Button Text</label>
              <input
                type="text"
                class="form-control"
                value={card.buttonText}
                onInput={e => handleCardChange(i, "buttonText", e.currentTarget.value)}
              />
            </div>
            <div class="mb-2">
              <label class="form-label">Button Link</label>
              <input
                type="text"
                class="form-control"
                value={card.buttonLink}
                onInput={e => handleCardChange(i, "buttonLink", e.currentTarget.value)}
              />
            </div>
          </div>
        ))}

        <hr />

        {/* About Section */}
        <h2>About Section</h2>
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input
            type="text"
            class="form-control"
            value={homeData().about.title}
            onInput={e => handleChange("about", "title", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Texto</label>
          <textarea
            class="form-control"
            rows="3"
            value={homeData().about.text}
            onInput={e => handleChange("about", "text", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Imagen URL</label>
          <input
            type="text"
            class="form-control"
            value={homeData().about.imageUrl}
            onInput={e => handleChange("about", "imageUrl", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Button Text</label>
          <input
            type="text"
            class="form-control"
            value={homeData().about.buttonText}
            onInput={e => handleChange("about", "buttonText", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Button Link</label>
          <input
            type="text"
            class="form-control"
            value={homeData().about.buttonLink}
            onInput={e => handleChange("about", "buttonLink", e.currentTarget.value)}
          />
        </div>

        <hr />

        {/* Imágenes de Secciones */}
        <h2>Imágenes de Secciones</h2>
        {Object.entries(homeData().imagenesSecciones).map(([key, val]) => (
          <div class="mb-3" key={key}>
            <label class="form-label">{key}</label>
            <input
              type="text"
              class="form-control"
              value={val}
              onInput={e => handleImagenSeccionChange(key, e.currentTarget.value)}
            />
          </div>
        ))}

        <button type="submit" class="btn btn-primary mt-4">
          Enviar propuesta
        </button>
      </form>
    </div>
  );
}

export default AdminHomeView;
