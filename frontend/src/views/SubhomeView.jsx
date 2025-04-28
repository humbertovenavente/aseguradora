import { createSignal, onMount } from "solid-js";
import { obtenerHome } from "../services/PaginasEdt/homeService.js";

import ElementoProximasCitas from "./PaginasEdt/ElementoProximasCitas.jsx";
import ElementoTopCoberturas from "./PaginasEdt/ElementoTopCoberturas.jsx";

function SubhomeView() {
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
      <style>{`
        .hero-section {
          background: url(${homeData()?.hero?.backgroundImage || ""}) no-repeat center center;
          background-size: cover;
          color: #fff;
          text-align: center;
          padding: 100px 20px;
          border-radius: 20px;
          margin-bottom: 3rem;
          position: relative;
        }
        .hero-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.5);
          border-radius: 20px;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
          margin: auto;
        }
        .section-image {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
          border-radius: 20px;
          margin-bottom: 2rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          animation: fadeIn 1s ease-in-out;
        }
        .why-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
        }
        .why-card {
          width: 250px;
          background: #fff;
          padding: 1rem;
          border-radius: 1rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          text-align: center;
          transition: transform 0.3s ease;
        }
        .why-card:hover {
          transform: translateY(-5px);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

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
        {/* Imagenes de Secciones + Componentes */}

        {homeData()?.imagenesSecciones?.imagenProximasCitas && (
          <div class="text-center">
            <img src={homeData().imagenesSecciones.imagenProximasCitas} class="section-image" alt="Próximas Citas" />
          </div>
        )}
        <ElementoProximasCitas />

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
                {homeData()?.imagenesSecciones?.imagenTopCoberturas && (
          <div class="text-center">
            <img src={homeData().imagenesSecciones.imagenTopCoberturas} class="section-image" alt="Coberturas" />
          </div>
        )}
        <ElementoTopCoberturas />
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

export default SubhomeView;
