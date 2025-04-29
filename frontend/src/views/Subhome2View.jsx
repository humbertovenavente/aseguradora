// src/views/Subhome2View.jsx
import { createSignal, onMount } from "solid-js";
import { obtenerSubhome2 } from "../services/PaginasEdt/subhome2Service.js";

import ElementoTopPolizas from "./PaginasEdt/ElementoTopPolizas.jsx";
import ElementoTopServiciosSolicitados from "./PaginasEdt/ElementoTopServiciosSolicitados.jsx";

function Subhome2View() {
  const [subhomeData, setSubhomeData] = createSignal(null);

  onMount(async () => {
    try {
      const data = await obtenerSubhome2();
      setSubhomeData(data);
    } catch (error) {
      console.error("Error al obtener Subhome2:", error);
    }
  });

  return (
    <>
      <style>{`
        .hero-section {
          background: url(${subhomeData()?.hero?.backgroundImage || ""}) no-repeat center center;
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div class="container my-5">
        {subhomeData() ? (
          (() => {
            const { hero, tranquilidad, whySection, about, imagenesSecciones } = subhomeData();

            return (
              <>
                {/* HERO SECTION */}
                <div class="hero-section">
                  <div class="hero-overlay"></div>
                  <div class="hero-content">
                    <h1 class="hero-title">{hero.title}</h1>
                    <p class="hero-subtitle">{hero.subtitle}</p>
                    <div>
                      {hero.cta_1?.text && (
                        <a href={hero.cta_1.link} class="btn btn-warning m-2">
                          {hero.cta_1.text}
                        </a>
                      )}
                      {hero.cta_2?.text && (
                        <a href={hero.cta_2.link} class="btn btn-outline-light m-2">
                          {hero.cta_2.text}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* IMAGEN Top Pólizas */}
                {imagenesSecciones?.imagenTopPolizas && (
                  <div class="text-center">
                    <img
                      src={imagenesSecciones.imagenTopPolizas}
                      class="section-image"
                      alt="Top Pólizas"
                    />
                  </div>
                )}
                <ElementoTopPolizas />

                {/* WHY SECTION */}
                <div class="why-section my-5">
                  <h2 class="text-center mb-5">{whySection.sectionTitle}</h2>
                  <div class="row g-4">
                    {whySection.cards.map((card, idx) => (
                      <div class="col-md-4" key={idx}>
                        <div class="card h-100">
                          <img
                            src={card.imageUrl}
                            class="card-img-top"
                            alt={card.cardTitle}
                          />
                          <div class="card-body">
                            <h5 class="card-title">{card.cardTitle}</h5>
                            <p class="card-text">{card.cardText}</p>
                            {card.buttonText && (
                              <a href={card.buttonLink} class="btn btn-outline-primary">
                                {card.buttonText}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* IMAGEN Top Servicios Solicitados */}
                {imagenesSecciones?.imagenTopServiciosSolicitados && (
                  <div class="text-center">
                    <img
                      src={imagenesSecciones.imagenTopServiciosSolicitados}
                      class="section-image"
                      alt="Servicios Solicitados"
                    />
                  </div>
                )}
                <ElementoTopServiciosSolicitados />

                {/* ABOUT SECTION */}
                <div class="about-section my-5">
                  <div class="row align-items-center">
                    <div class="col-md-6">
                      <img
                        src={about.imageUrl}
                        alt="About"
                        class="section-image"
                      />
                    </div>
                    <div class="col-md-6">
                      <h2>{about.title}</h2>
                      <p class="lead">{about.text}</p>
                      {about.buttonText && (
                        <a href={about.buttonLink} class="btn btn-success">
                          {about.buttonText}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })()
        ) : (
          <div class="text-center">Cargando Subhome2...</div>
        )}
      </div>
    </>
  );
}

export default Subhome2View;
