import { createSignal, onMount } from "solid-js";
import { obtenerHome } from "../services/PaginasEdt/homeService.js";

function Subhome2View() {
  const [homeData, setHomeData] = createSignal(null);

  onMount(async () => {
    try {
      const data = await obtenerHome();
      setHomeData(data);
    } catch (error) {
      console.error("Error al obtener el Home:", error);
    }
  });

  return (
    <>
      {/* Estilos locales para esta vista */}
      <style>
        {`
          /* Efecto hover para tarjetas (similar a TestimoniosView) */
          .card:hover {
            transform: translateY(-5px);
            transition: transform 0.3s ease;
          }

          /* Sección Hero */
          .hero-section {
            background-size: cover;
            position: relative;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 90vh; /* Ajusta la altura al gusto */
          }
          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.5);
          }
          .hero-content {
            position: relative;
            z-index: 2;
            max-width: 600px;
          }
          .hero-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }
          .hero-subtitle {
            font-size: 1.2rem;
            margin-bottom: 2rem;
          }
          .hero-btn {
            border-radius: 50px;
            padding: 0.75rem 2rem;
            margin: 0 0.5rem;
            font-weight: 600;
          }

          /* Sección Tranquilidad */
          .tranquilidad-section img {
            border-radius: 1rem;
          }

          /* Sección Why */
          .why-section .card {
            border: none;
            border-radius: 1rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }
          .why-section .card:hover {
            transform: translateY(-5px);
          }
          .why-section .card-body {
            text-align: center;
          }

          /* Sección About */
          .about-section img {
            border-radius: 1rem;
          }
        `}
      </style>

      <div >

        {/* Verificamos si homeData() ya está cargado */}
        {homeData() ? (
          (() => {
            // Extraemos las secciones de homeData
            const { hero, tranquilidad, whySection, about } = homeData();

            // Imagen de fondo para el hero
            const heroBg =
              hero.backgroundImage ||
              "https://gustavomirabalcastro.com/wp-content/uploads/2020/10/Gustavo-Mirabal-Castro-que-es-un-asesor-financiero.jpg";

            return (
              <>
                {/* HERO SECTION */}
                <div
                  class="hero-section"
                  style={{
                    background: `url("${heroBg}") no-repeat center center`,
                    backgroundSize: "cover",
                  }}
                >
                  <div class="hero-overlay"></div>
                  <div class="hero-content">
                    <h1 class="hero-title">
                      {hero.title || "Bienvenido a Mi Aseguradora"}
                    </h1>
                    <p class="hero-subtitle">
                      {hero.subtitle ||
                        "Protege tu futuro y el de los tuyos con nuestras soluciones de seguros a tu medida."}
                    </p>
                    <div>
                      <button class="btn btn-warning hero-btn">
                        {hero.cta_1?.text || "Conócenos"}
                      </button>
                      <button class="btn btn-outline-light hero-btn">
                        {hero.cta_2?.text || "Cotiza Ahora"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN: Tranquilidad */}
                <div class="tranquilidad-section my-5">
                  <div class="row align-items-center">
                    <div class="col-md-6 mb-4 mb-md-0">
                      <img
                        src={
                          tranquilidad.imageUrl ||
                          "https://example.com/tranquilidad.jpg"
                        }
                        alt="Tranquilidad"
                        class="img-fluid"
                      />
                    </div>
                    <div class="col-md-6">
                      <h2>
                        {tranquilidad.title || "Encuentra tu Tranquilidad"}
                      </h2>
                      <p class="lead">
                        {tranquilidad.leadText || "Protege a tu familia"}
                      </p>
                      <p>
                        {tranquilidad.description ||
                          "Con nuestros planes de seguro, tendrás la paz que mereces."}
                      </p>
                      <button class="btn btn-primary">
                        {tranquilidad.buttonText || "Conoce más"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN: Why */}
                <div class="why-section my-5">
                  <h2 class="text-center mb-5">
                    {whySection.sectionTitle || "¿Por qué elegirnos?"}
                  </h2>
                  <div class="row g-4">
                    {whySection.cards && whySection.cards.length > 0 ? (
                      whySection.cards.map((card, index) => (
                        <div class="col-md-4" key={index}>
                          <div class="card h-100">
                            <img
                              src={
                                card.imageUrl ||
                                "https://example.com/card-default.jpg"
                              }
                              class="card-img-top"
                              alt={card.cardTitle}
                            />
                            <div class="card-body">
                              <h5 class="card-title">
                                {card.cardTitle || "Título de Tarjeta"}
                              </h5>
                              <p class="card-text">
                                {card.cardText ||
                                  "Planes que cubren tus necesidades."}
                              </p>
                              <button class="btn btn-outline-primary">
                                {card.buttonText || "Ver más"}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div class="col-md-4">
                        <div class="card h-100">
                          <img
                            src="https://example.com/card-default.jpg"
                            class="card-img-top"
                            alt="Default Card"
                          />
                          <div class="card-body">
                            <h5 class="card-title">Seguros de Auto</h5>
                            <p class="card-text">Conduce con confianza...</p>
                            <button class="btn btn-outline-primary">
                              Ver Planes
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* SECCIÓN: About */}
                <div class="about-section my-5">
                  <div class="row align-items-center">
                    <div class="col-md-6 mb-4 mb-md-0">
                      <img
                        src={about.imageUrl || "https://example.com/about.jpg"}
                        alt="Sobre Nosotros"
                        class="img-fluid"
                      />
                    </div>
                    <div class="col-md-6">
                      <h2>
                        {about.title || "Sobre Nuestra Aseguradora"}
                      </h2>
                      <p class="lead">
                        {about.text ||
                          "Con años de experiencia, ofrecemos soluciones integrales para proteger a tu familia y patrimonio."}
                      </p>
                      <button class="btn btn-success">
                        {about.buttonText || "Conócenos"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })()
        ) : (
          <div class="text-center">Cargando Home...</div>
        )}
      </div>
    </>
  );
}

export default Subhome2View;
