import { createSignal, onMount } from "solid-js";
import { obtenerTestimonios, actualizarTestimonios } from "../../services/PaginasEdt/testimoniosService";

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
    try {
      await actualizarTestimonios({
        servicio: servicio(),
        reviews: reviews(),
        newsletter: newsletter(),
        about: about(),
      });
      alert("Testimonios actualizados con éxito!");
    } catch (error) {
      console.error("Error al actualizar testimonios:", error);
      alert("Error al actualizar testimonios");
    }
  };

  return (
    <div class="container my-5">
      <h2 class="mb-4">Editar Testimonios</h2>
      <form onSubmit={handleSubmit}>
        {/* Sección Servicio */}
        <div class="card mb-3">
          <div class="card-header">
            <h5>Servicio Destacado</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Section Title</label>
              <input
                type="text"
                class="form-control"
                value={servicio().sectionTitle}
                onInput={(e) => handleServicioChange("sectionTitle", e.currentTarget.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Service Title</label>
              <input
                type="text"
                class="form-control"
                value={servicio().serviceTitle}
                onInput={(e) => handleServicioChange("serviceTitle", e.currentTarget.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Tagline</label>
              <input
                type="text"
                class="form-control"
                value={servicio().tagline}
                onInput={(e) => handleServicioChange("tagline", e.currentTarget.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Service Image URL</label>
              <input
                type="text"
                class="form-control"
                value={servicio().serviceImage}
                onInput={(e) => handleServicioChange("serviceImage", e.currentTarget.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Learn More URL</label>
              <input
                type="text"
                class="form-control"
                value={servicio().learnMoreUrl}
                onInput={(e) => handleServicioChange("learnMoreUrl", e.currentTarget.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Request Quote URL</label>
              <input
                type="text"
                class="form-control"
                value={servicio().requestQuoteUrl}
                onInput={(e) => handleServicioChange("requestQuoteUrl", e.currentTarget.value)}
              />
            </div>
          </div>
        </div>

        {/* Sección Reviews */}
        <div class="card mb-3">
          <div class="card-header">
            <h5>Opiniones</h5>
          </div>
          <div class="card-body">
            {reviews().map((review, index) => (
              <div class="mb-3" key={index}>
                <h6>Review {index + 1}</h6>
                <div class="mb-2">
                  <label class="form-label">Stars</label>
                  <input
                    type="number"
                    class="form-control"
                    value={review.stars}
                    onInput={(e) =>
                      handleReviewChange(index, "stars", parseFloat(e.currentTarget.value))
                    }
                  />
                </div>
                <div class="mb-2">
                  <label class="form-label">Review Title</label>
                  <input
                    type="text"
                    class="form-control"
                    value={review.reviewTitle}
                    onInput={(e) =>
                      handleReviewChange(index, "reviewTitle", e.currentTarget.value)
                    }
                  />
                </div>
                <div class="mb-2">
                  <label class="form-label">Review Text</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    value={review.reviewText}
                    onInput={(e) =>
                      handleReviewChange(index, "reviewText", e.currentTarget.value)
                    }
                  ></textarea>
                </div>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => removeReview(index)}
                >
                  Eliminar Review
                </button>
              </div>
            ))}
            <button type="button" class="btn btn-secondary" onClick={addReview}>
              Agregar Review
            </button>
          </div>
        </div>

        {/* Sección Newsletter */}
        <div class="card mb-3">
          <div class="card-header">
            <h5>Newsletter</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Heading</label>
              <input
                type="text"
                class="form-control"
                value={newsletter().heading}
                onInput={(e) => handleNewsletterChange("heading", e.currentTarget.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea
                class="form-control"
                rows="3"
                value={newsletter().description}
                onInput={(e) => handleNewsletterChange("description", e.currentTarget.value)}
              ></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Button Text</label>
              <input
                type="text"
                class="form-control"
                value={newsletter().buttonText}
                onInput={(e) => handleNewsletterChange("buttonText", e.currentTarget.value)}
              />
            </div>
          </div>
        </div>

        {/* Sección About */}
        <div class="card mb-3">
          <div class="card-header">
            <h5>About</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input
                type="text"
                class="form-control"
                value={about().title}
                onInput={(e) => handleAboutChange("title", e.currentTarget.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Text</label>
              <textarea
                class="form-control"
                rows="3"
                value={about().text}
                onInput={(e) => handleAboutChange("text", e.currentTarget.value)}
              ></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Image URL</label>
              <input
                type="text"
                class="form-control"
                value={about().imageUrl}
                onInput={(e) => handleAboutChange("imageUrl", e.currentTarget.value)}
              />
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          Guardar Testimonios
        </button>
      </form>
    </div>
  );
}

export default AdminTestimoniosView;
