import { createSignal, onMount } from "solid-js";
import { obtenerTestimonios } from "../services/PaginasEdt/testimoniosService.js";

function TestimoniosView() {
  const [testimoniosData, setTestimoniosData] = createSignal(null);

  onMount(async () => {
    try {
      const data = await obtenerTestimonios();
      setTestimoniosData(data);
    } catch (error) {
      console.error("Error al obtener testimonios:", error);
    }
  });

  return (
    <>
      {/* Estilos locales para esta sección */}
      <style>
        {`
          .card:hover {
            transform: translateY(-5px);
            transition: transform 0.3s ease;
          }
          .service-section {
            padding: 3rem 1rem;
            background-color: #fff;
          }
          .reviews-section {
            background-color: #f7f7f7;
            padding: 2rem 1rem;
          }
          .newsletter-section {
            background-color: #fff;
            padding: 2rem 1rem;
            text-align: center;
          }
          .about-section {
            background-color: #f0f0f0;
            padding: 2rem 1rem;
          }
        `}
      </style>

      <div class="container my-5">
        <h2 class="text-center mb-5">Testimonios</h2>
        {testimoniosData() ? (
          <>
            {/* SECCIÓN: Servicio Destacado */}
            <div class="service-section">
              <div class="row align-items-center">
                <div class="col-md-4 text-center">
                  <p class="section-title">{testimoniosData().servicio.sectionTitle}</p>
                  <img
                    src={testimoniosData().servicio.serviceImage}
                    alt="Imagen del servicio"
                    class="img-fluid"
                  />
                </div>
                <div class="col-md-8">
                  <h1 class="service-title">{testimoniosData().servicio.serviceTitle}</h1>
                  <p class="tagline">{testimoniosData().servicio.tagline}</p>
                  <div>
                    {testimoniosData().servicio.learnMoreUrl && (
                      <button class="btn btn-dark action-btn">Conócenos</button>
                    )}
                    {testimoniosData().servicio.requestQuoteUrl && (
                      <button class="btn btn-outline-dark action-btn">Solicitar Cotización</button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN: Opiniones */}
            <div class="reviews-section">
              <div class="row">
                {testimoniosData().reviews.map((review, index) => (
                  <div class="col-md-4 mb-4" key={index}>
                    <div class="card p-3 text-center">
                      <div class="mb-2 review-stars">
                        {[...Array(Math.floor(review.stars))].map((_, i) => (
                          <i class="bi bi-star-fill text-warning" key={i}></i>
                        ))}
                        {review.stars % 1 !== 0 && (
                          <i class="bi bi-star-half text-warning"></i>
                        )}
                      </div>
                      <h5 class="review-title">{review.reviewTitle}</h5>
                      <p>{review.reviewText}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN: Newsletter */}
            <div class="newsletter-section">
              <h3>{testimoniosData().newsletter.heading}</h3>
              <p>{testimoniosData().newsletter.description}</p>
              <button class="btn btn-dark">
                {testimoniosData().newsletter.buttonText}
              </button>
            </div>

            {/* SECCIÓN: About */}
            <div class="about-section">
              <div class="row align-items-center">
                <div class="col-md-4 text-center">
                  <img
                    src={testimoniosData().about.imageUrl}
                    alt="Imagen de la empresa"
                    class="img-fluid"
                  />
                </div>
                <div class="col-md-8">
                  <h2>{testimoniosData().about.title}</h2>
                  <p>{testimoniosData().about.text}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div class="text-center">Cargando testimonios...</div>
        )}
      </div>
    </>
  );
}

export default TestimoniosView;
