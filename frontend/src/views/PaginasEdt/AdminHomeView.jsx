import { createSignal, onMount } from "solid-js";
import { obtenerHome, actualizarHome } from "../../services/PaginasEdt/homeService.js";

// Objeto por defecto (basado en los datos de Postman)
const defaultHome = {
  hero: {
    backgroundImage: "https://example.com/bg.jpg",
    title: "Bienvenido a Mi Aseguradora",
    subtitle: "Protege lo que más importa",
    cta_1: { text: "Conócenos", link: "https://example.com/conocenos" },
    cta_2: { text: "Cotiza Ahora", link: "https://example.com/cotizar" },
  },
  tranquilidad: {
    imageUrl: "https://example.com/tranquilidad.jpg",
    title: "Encuentra tu Tranquilidad",
    leadText: "Protege a tu familia",
    description: "Con nuestros planes de seguro, tendrás la paz que mereces.",
    buttonText: "Conoce más",
    buttonLink: "https://example.com/tranquilidad",
  },
  whySection: {
    sectionTitle: "¿Por qué elegirnos?",
    cards: [
      {
        cardTitle: "Cobertura Ampliada",
        cardText: "Planes que cubren tus necesidades.",
        imageUrl: "https://example.com/card1.jpg",
        buttonText: "Ver más",
        buttonLink: "https://example.com/card1",
      },
      {
        cardTitle: "Atención Personalizada",
        cardText: "Estamos contigo en cada paso.",
        imageUrl: "https://example.com/card2.jpg",
        buttonText: "Contactar",
        buttonLink: "https://example.com/card2",
      },
    ],
  },
  about: {
    title: "Sobre Nuestra Aseguradora",
    text: "Con años de experiencia, ofrecemos soluciones integrales para proteger a tu familia y patrimonio.",
    imageUrl: "https://example.com/about.jpg",
    buttonText: "Conócenos",
    buttonLink: "https://example.com/about",
  },
};

function AdminHomeView() {
  // Inicializamos con el objeto por defecto para que el formulario se muestre
  const [homeData, setHomeData] = createSignal(defaultHome);
  const [mensaje, setMensaje] = createSignal("");

  onMount(async () => {
    try {
      const data = await obtenerHome();
      console.log("Home recibido:", data);
      // Si el backend retorna datos válidos y con la propiedad hero, actualizamos
      if (data && data.hero) {
        setHomeData(data);
      } else {
        console.log("No se recibió data válida, se mantendrá el objeto por defecto.");
      }
      console.log("homeData() después de asignar:", homeData());
    } catch (error) {
      console.error("Error al obtener Home:", error);
    }
  });

  // Función para manejar cambios en secciones simples (hero, tranquilidad, about, whySection)
  const handleChange = (section, field, value) => {
    setHomeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Función para manejar cambios en cta_1 o cta_2 dentro de hero
  const handleCTAChange = (ctaKey, field, value) => {
    setHomeData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [ctaKey]: {
          ...prev.hero[ctaKey],
          [field]: value,
        },
      },
    }));
  };

  // Función para manejar cambios en las tarjetas de whySection
  const handleCardChange = (index, field, value) => {
    setHomeData((prev) => {
      const newCards = [...prev.whySection.cards];
      newCards[index] = { ...newCards[index], [field]: value };
      return {
        ...prev,
        whySection: {
          ...prev.whySection,
          cards: newCards,
        },
      };
    });
  };

  // Agrega una nueva tarjeta vacía a whySection.cards
  const addWhyCard = () => {
    setHomeData((prev) => ({
      ...prev,
      whySection: {
        ...prev.whySection,
        cards: [
          ...prev.whySection.cards,
          {
            cardTitle: "",
            cardText: "",
            imageUrl: "",
            buttonText: "",
            buttonLink: "",
          },
        ],
      },
    }));
  };

  // Enviar la actualización al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    try {
      console.log("Enviando datos al backend:", homeData());
      await actualizarHome(homeData());
      setMensaje("¡Home actualizado correctamente!");
    } catch (error) {
      console.error("Error al actualizar el Home:", error);
      setMensaje("Hubo un error al actualizar el Home.");
    }
  };

  if (!homeData() || !homeData().hero) {
    return <div class="container my-5 text-center">Cargando formulario...</div>;
  }

  return (
    <div class="container my-5">
      <h1>Panel de Administración - Home</h1>
      {mensaje() && <div class="alert alert-info my-3">{mensaje()}</div>}
      <form onSubmit={handleSubmit}>
        {/* ---------- Sección Hero ---------- */}
        <h2>Hero Section</h2>
        <div class="mb-3">
          <label class="form-label">Background Image</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.backgroundImage}
            onInput={(e) => handleChange("hero", "backgroundImage", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.title}
            onInput={(e) => handleChange("hero", "title", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Subtítulo</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.subtitle}
            onInput={(e) => handleChange("hero", "subtitle", e.currentTarget.value)}
          />
        </div>
        {/* CTA 1 */}
        <div class="mb-3">
          <label class="form-label">CTA 1 Text</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.cta_1.text}
            onInput={(e) => handleCTAChange("cta_1", "text", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">CTA 1 Link</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.cta_1.link}
            onInput={(e) => handleCTAChange("cta_1", "link", e.currentTarget.value)}
          />
        </div>
        {/* CTA 2 */}
        <div class="mb-3">
          <label class="form-label">CTA 2 Text</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.cta_2.text}
            onInput={(e) => handleCTAChange("cta_2", "text", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">CTA 2 Link</label>
          <input
            type="text"
            class="form-control"
            value={homeData().hero.cta_2.link}
            onInput={(e) => handleCTAChange("cta_2", "link", e.currentTarget.value)}
          />
        </div>

        <hr />

        {/* ---------- Sección Tranquilidad ---------- */}
        <h2>Tranquilidad Section</h2>
        <div class="mb-3">
          <label class="form-label">Image URL</label>
          <input
            type="text"
            class="form-control"
            value={homeData().tranquilidad.imageUrl}
            onInput={(e) => handleChange("tranquilidad", "imageUrl", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input
            type="text"
            class="form-control"
            value={homeData().tranquilidad.title}
            onInput={(e) => handleChange("tranquilidad", "title", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Lead Text</label>
          <input
            type="text"
            class="form-control"
            value={homeData().tranquilidad.leadText}
            onInput={(e) => handleChange("tranquilidad", "leadText", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea
            class="form-control"
            rows="3"
            value={homeData().tranquilidad.description}
            onInput={(e) => handleChange("tranquilidad", "description", e.currentTarget.value)}
          ></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Button Text</label>
          <input
            type="text"
            class="form-control"
            value={homeData().tranquilidad.buttonText}
            onInput={(e) => handleChange("tranquilidad", "buttonText", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Button Link</label>
          <input
            type="text"
            class="form-control"
            value={homeData().tranquilidad.buttonLink}
            onInput={(e) => handleChange("tranquilidad", "buttonLink", e.currentTarget.value)}
          />
        </div>

        <hr />

        {/* ---------- Sección Why ---------- */}
        <h2>Why Section</h2>
        <div class="mb-3">
          <label class="form-label">Section Title</label>
          <input
            type="text"
            class="form-control"
            value={homeData().whySection.sectionTitle}
            onInput={(e) => handleChange("whySection", "sectionTitle", e.currentTarget.value)}
          />
        </div>
        <button type="button" class="btn btn-secondary mb-3" onClick={addWhyCard}>
          Agregar Tarjeta
        </button>
        {homeData().whySection.cards.map((card, index) => (
          <div key={index} class="mb-3 border p-3">
            <h5>Tarjeta {index + 1}</h5>
            <div class="mb-2">
              <label class="form-label">Título</label>
              <input
                type="text"
                class="form-control"
                value={card.cardTitle}
                onInput={(e) => handleCardChange(index, "cardTitle", e.currentTarget.value)}
              />
            </div>
            <div class="mb-2">
              <label class="form-label">Texto</label>
              <textarea
                class="form-control"
                rows="2"
                value={card.cardText}
                onInput={(e) => handleCardChange(index, "cardText", e.currentTarget.value)}
              ></textarea>
            </div>
            <div class="mb-2">
              <label class="form-label">Imagen URL</label>
              <input
                type="text"
                class="form-control"
                value={card.imageUrl}
                onInput={(e) => handleCardChange(index, "imageUrl", e.currentTarget.value)}
              />
            </div>
            <div class="mb-2">
              <label class="form-label">Button Text</label>
              <input
                type="text"
                class="form-control"
                value={card.buttonText}
                onInput={(e) => handleCardChange(index, "buttonText", e.currentTarget.value)}
              />
            </div>
            <div class="mb-2">
              <label class="form-label">Button Link</label>
              <input
                type="text"
                class="form-control"
                value={card.buttonLink}
                onInput={(e) => handleCardChange(index, "buttonLink", e.currentTarget.value)}
              />
            </div>
          </div>
        ))}

        <hr />

        {/* ---------- Sección About ---------- */}
        <h2>About Section</h2>
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input
            type="text"
            class="form-control"
            value={homeData().about.title}
            onInput={(e) => handleChange("about", "title", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Texto</label>
          <textarea
            class="form-control"
            rows="3"
            value={homeData().about.text}
            onInput={(e) => handleChange("about", "text", e.currentTarget.value)}
          ></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Imagen URL</label>
          <input
            type="text"
            class="form-control"
            value={homeData().about.imageUrl}
            onInput={(e) => handleChange("about", "imageUrl", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Button Text</label>
          <input
            type="text"
            class="form-control"
            value={homeData().about.buttonText}
            onInput={(e) => handleChange("about", "buttonText", e.currentTarget.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Button Link</label>
          <input
            type="text"
            class="form-control"
            value={homeData().about.buttonLink}
            onInput={(e) => handleChange("about", "buttonLink", e.currentTarget.value)}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
      {mensaje() && <div class="alert alert-success mt-3">{mensaje()}</div>}
    </div>
  );
}

export default AdminHomeView;
