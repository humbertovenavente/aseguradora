import { createSignal, onMount } from "solid-js";
import {
  obtenerTestimonios,
  enviarPropuestaTestimonios,
} from "../../services/PaginasEdt/testimoniosService";

function AdminTestimoniosView() {
  const [servicio, setServicio] = createSignal({
    sectionTitle: "",
    serviceTitle: "",
    tagline: "",
    serviceImage: "",
    learnMoreUrl: "",
    requestQuoteUrl: "",
  });
  const [reviews, setReviews] = createSignal([]);
  const [newsletter, setNewsletter] = createSignal({
    heading: "",
    description: "",
    buttonText: "",
  });
  const [about, setAbout] = createSignal({
    title: "",
    text: "",
    imageUrl: "",
  });

  onMount(async () => {
    try {
      const data = await obtenerTestimonios();
      if (data) {
        setServicio(data.servicio || {});
        setReviews(data.reviews || []);
        setNewsletter(data.newsletter || {});
        setAbout(data.about || {});
      }
    } catch (error) {
      console.error("Error al obtener testimonios:", error);
    }
  });

  const handleServicioChange = (field, value) => {
    setServicio({ ...servicio(), [field]: value });
  };

  const handleNewsletterChange = (field, value) => {
    setNewsletter({ ...newsletter(), [field]: value });
  };

  const handleAboutChange = (field, value) => {
    setAbout({ ...about(), [field]: value });
  };

  const handleReviewChange = (index, field, value) => {
    const updatedReviews = [...reviews()];
    updatedReviews[index] = { ...updatedReviews[index], [field]: value };
    setReviews(updatedReviews);
  };

  const addReview = () => {
    setReviews([...reviews(), { stars: 5, reviewTitle: "", reviewText: "" }]);
  };

  const removeReview = (index) => {
    const updatedReviews = reviews().filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const correo = usuario?.correo;

    if (!correo) {
      alert("⚠️ No se pudo identificar al usuario logueado.");
      return;
    }

    const propuesta = {
      servicio: servicio(),
      reviews: reviews(),
      newsletter: newsletter(),
      about: about(),
    };

    try {
      await enviarPropuestaTestimonios(propuesta, correo);
      alert("✅ Propuesta enviada para revisión");
    } catch (error) {
      console.error("Error al enviar propuesta:", error.response?.data || error.message);
      alert("❌ Error al enviar la propuesta");
    }
  };

  return (
    <div class="container my-5">
      <h2 class="mb-4">Editar Testimonios</h2>
      <form onSubmit={handleSubmit}>
        {/* Aquí permanece todo igual: tarjetas de edición de cada sección */}
        {/* ... todo tu código tal como lo tenías ... */}
        <button type="submit" class="btn btn-primary">
          Enviar Propuesta de Testimonios
        </button>
      </form>
    </div>
  );
}

export default AdminTestimoniosView;
