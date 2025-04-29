// src/views/AdminSubhomeView.jsx
import { createSignal, onMount } from "solid-js";
import { obtenerSubhome1 } from "../../services/PaginasEdt/subhome1Service.js";
import { crearPropuesta } from "../../services/moderacionService.js";

const defaultSubhome1 = {
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
    imagenTopCoberturas:           "",
    imagenTopPolizas:              "",
    imagenTopServiciosSolicitados: "",
    imagenUltimosServicios:        "",
    imagenProximasCitas:           "",
    imagenTopEmpleados:            ""
  },
  serviciosDestacados: [],
  testimonios: null
};

function AdminSubhomeView() {
  const [data, setData]       = createSignal(defaultSubhome1);
  const [mensaje, setMensaje] = createSignal("");

  onMount(async () => {
    try {
      const resp = await obtenerSubhome1();
      if (resp && resp.hero) {
        setData(resp);
      }
    } catch (err) {
      console.error("Error al obtener Subhome1:", err);
    }
  });

  const handleChange = (section, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCTAChange = (ctaKey, field, value) => {
    setData(prev => ({
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

  const handleCardChange = (i, field, value) => {
    setData(prev => {
      const cards = [...prev.whySection.cards];
      cards[i] = { ...cards[i], [field]: value };
      return {
        ...prev,
        whySection: {
          ...prev.whySection,
          cards
        }
      };
    });
  };

  const addCard = () => {
    setData(prev => ({
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
    setData(prev => ({
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
      const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
      const correo  = usuario.correo;
      if (!correo) throw new Error("Usuario no identificado");

      await crearPropuesta({
        pagina:    "subhome1",
        contenido: data(),
        creadoPor: correo
      });

      setMensaje("✅ Tu propuesta fue enviada a moderación");
    } catch (err) {
      console.error("Error al enviar propuesta:", err);
      setMensaje("❌ No se pudo enviar la propuesta");
    }
  };

  if (!data().hero) {
    return <div class="container my-5 text-center">Cargando formulario...</div>;
  }

  return (
    <div class="container my-5">
      <h1>Panel de Administración – Subhome 1</h1>
      {mensaje() && <div class="alert alert-info my-3">{mensaje()}</div>}

      <form onSubmit={handleSubmit}>

        {/* Hero Section */}
        <h2>Hero Section</h2>
        <div class="mb-3">
          <label class="form-label">Background Image</label>
          <input
            class="form-control"
            type="text"
            value={data().hero.backgroundImage}
            onInput={e => handleChange("hero", "backgroundImage", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input
            class="form-control"
            type="text"
            value={data().hero.title}
            onInput={e => handleChange("hero", "title", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Subtítulo</label>
          <input
            class="form-control"
            type="text"
            value={data().hero.subtitle}
            onInput={e => handleChange("hero", "subtitle", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">CTA 1 Text</label>
          <input
            class="form-control"
            type="text"
            value={data().hero.cta_1.text}
            onInput={e => handleCTAChange("cta_1", "text", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">CTA 1 Link</label>
          <input
            class="form-control"
            type="text"
            value={data().hero.cta_1.link}
            onInput={e => handleCTAChange("cta_1", "link", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">CTA 2 Text</label>
          <input
            class="form-control"
            type="text"
            value={data().hero.cta_2.text}
            onInput={e => handleCTAChange("cta_2", "text", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">CTA 2 Link</label>
          <input
            class="form-control"
            type="text"
            value={data().hero.cta_2.link}
            onInput={e => handleCTAChange("cta_2", "link", e.currentTarget.value)}
          />
        </div>

        <hr />

        {/* Tranquilidad Section */}
        <h2>Tranquilidad Section</h2>
        <div class="mb-3">
          <label class="form-label">Image URL</label>
          <input
            class="form-control"
            type="text"
            value={data().tranquilidad.imageUrl}
            onInput={e => handleChange("tranquilidad", "imageUrl", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input
            class="form-control"
            type="text"
            value={data().tranquilidad.title}
            onInput={e => handleChange("tranquilidad", "title", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Lead Text</label>
          <input
            class="form-control"
            type="text"
            value={data().tranquilidad.leadText}
            onInput={e => handleChange("tranquilidad", "leadText", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea
            class="form-control"
            rows="3"
            value={data().tranquilidad.description}
            onInput={e => handleChange("tranquilidad", "description", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Button Text</label>
          <input
            class="form-control"
            type="text"
            value={data().tranquilidad.buttonText}
            onInput={e => handleChange("tranquilidad", "buttonText", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Button Link</label>
          <input
            class="form-control"
            type="text"
            value={data().tranquilidad.buttonLink}
            onInput={e => handleChange("tranquilidad", "buttonLink", e.currentTarget.value)}
          />
        </div>

        <hr />

        {/* Why Section */}
        <h2>Why Section</h2>
        <div class="mb-3">
          <label class="form-label">Section Title</label>
          <input
            class="form-control"
            type="text"
            value={data().whySection.sectionTitle}
            onInput={e => handleChange("whySection", "sectionTitle", e.currentTarget.value)}
          />
        </div>
        <button type="button" class="btn btn-secondary mb-3" onClick={addCard}>
          Agregar Tarjeta
        </button>
        {data().whySection.cards.map((card, i) => (
          <div key={i} class="mb-3 border p-3">
            {/* Tarjeta fields... */}
          </div>
        ))}

        <hr />

        {/* About Section */}
        <h2>About Section</h2>
        {/* About inputs... */}

        <hr />

        {/* Imágenes de Secciones */}
        <h2>Imágenes de Secciones</h2>
        {Object.entries(data().imagenesSecciones).map(([key, val]) => (
          <div class="mb-3" key={key}>
            <label class="form-label">{key}</label>
            <input
              class="form-control"
              type="text"
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

export default AdminSubhomeView;
