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
        <h4>🛠 Servicio</h4>
        <div class="mb-3">
          <label>Título de la Sección</label>
          <input class="form-control" value={servicio().sectionTitle} onInput={(e) => handleServicioChange("sectionTitle", e.currentTarget.value)} />
        </div>
        <div class="mb-3">
          <label>Título del Servicio</label>
          <input class="form-control" value={servicio().serviceTitle} onInput={(e) => handleServicioChange("serviceTitle", e.currentTarget.value)} />
        </div>
        <div class="mb-3">
          <label>Tagline</label>
          <input class="form-control" value={servicio().tagline} onInput={(e) => handleServicioChange("tagline", e.currentTarget.value)} />
        </div>
        <div class="mb-3">
          <label>URL de la Imagen del Servicio</label>
          <input class="form-control" value={servicio().serviceImage} onInput={(e) => handleServicioChange("serviceImage", e.currentTarget.value)} />
        </div>
        <div class="mb-3">
          <label>URL de Aprende Más</label>
          <input class="form-control" value={servicio().learnMoreUrl} onInput={(e) => handleServicioChange("learnMoreUrl", e.currentTarget.value)} />
        </div>
        <div class="mb-3">
          <label>URL de Cotizar</label>
          <input class="form-control" value={servicio().requestQuoteUrl} onInput={(e) => handleServicioChange("requestQuoteUrl", e.currentTarget.value)} />
        </div>

        <h4 class="mt-4">💬 Testimonios</h4>
        {reviews().map((review, index) => (
          <div class="mb-4 border p-3 rounded" key={index}>
            <div class="mb-2">
              <label>Título del Testimonio</label>
              <input class="form-control" value={review.reviewTitle} onInput={(e) => handleReviewChange(index, "reviewTitle", e.currentTarget.value)} />
            </div>
            <div class="mb-2">
              <label>Texto</label>
              <textarea class="form-control" rows="2" value={review.reviewText} onInput={(e) => handleReviewChange(index, "reviewText", e.currentTarget.value)} />
            </div>
            <button type="button" class="btn btn-danger" onClick={() => removeReview(index)}>Eliminar</button>
          </div>
        ))}
        <button type="button" class="btn btn-secondary mb-3" onClick={addReview}>Agregar Testimonio</button>

        <h4 class="mt-4">📬 Newsletter</h4>
        <div class="mb-3">
          <label>Título</label>
          <input class="form-control" value={newsletter().heading} onInput={(e) => handleNewsletterChange("heading", e.currentTarget.value)} />
        </div>
        <div class="mb-3">
          <label>Descripción</label>
          <textarea class="form-control" value={newsletter().description} onInput={(e) => handleNewsletterChange("description", e.currentTarget.value)} />
        </div>
        <div class="mb-3">
          <label>Texto del Botón</label>
          <input class="form-control" value={newsletter().buttonText} onInput={(e) => handleNewsletterChange("buttonText", e.currentTarget.value)} />
        </div>

        <h4 class="mt-4">ℹ️ About</h4>
        <div class="mb-3">
          <label>Título</label>
          <input class="form-control" value={about().title} onInput={(e) => handleAboutChange("title", e.currentTarget.value)} />
        </div>
        <div class="mb-3">
          <label>Texto</label>
          <textarea class="form-control" value={about().text} onInput={(e) => handleAboutChange("text", e.currentTarget.value)} />
        </div>
        <div class="mb-3">
          <label>URL de la Imagen</label>
          <input class="form-control" value={about().imageUrl} onInput={(e) => handleAboutChange("imageUrl", e.currentTarget.value)} />
        </div>

        <button type="submit" class="btn btn-primary">Enviar Propuesta de Testimonios</button>
      </form>
    </div>
  );
}

export default AdminTestimoniosView;
