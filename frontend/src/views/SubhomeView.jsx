// src/views/SubhomeView.jsx
import { createSignal, onMount } from "solid-js";
import { obtenerSubhome1 } from "../services/PaginasEdt/subhome1Service.js";

import ElementoProximasCitas from "./PaginasEdt/ElementoProximasCitas.jsx";
import ElementoTopCoberturas   from "./PaginasEdt/ElementoTopCoberturas.jsx";

function SubhomeView() {
  // renombramos la señal a subhomeData
  const [subhomeData, setSubhomeData] = createSignal(null);

  onMount(async () => {
    try {
      // antes: obtenerHome(); ahora: obtenerSubhome1()
      const data = await obtenerSubhome1();
      setSubhomeData(data);
    } catch (error) {
      console.error("Error al obtener Subhome1:", error);
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
                    <h1 class="mb-3">{hero.title}</h1>
                    <p class="lead mb-4">{hero.subtitle}</p>
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

                {/* IMAGEN Próximas Citas */}
                {imagenesSecciones?.imagenProximasCitas && (
                  <div class="text-center">
                    <img
                      src={imagenesSecciones.imagenProximasCitas}
                      class="section-image"
                      alt="Próximas Citas"
                    />
                  </div>
                )}
                <ElementoProximasCitas />

                {/* TRANQUILIDAD SECTION */}
                <div class="row align-items-center my-5">
                  <div class="col-md-6">
                    <img
                      src={tranquilidad.imageUrl}
                      class="section-image"
                      alt="Tranquilidad"
                    />
                  </div>
                  <div class="col-md-6">
                    <h2>{tranquilidad.title}</h2>
                    <p class="lead">{tranquilidad.leadText}</p>
                    <p>{tranquilidad.description}</p>
                    {tranquilidad.buttonText && (
                      <a
                        href={tranquilidad.buttonLink}
                        class="btn btn-primary mt-2"
                      >
                        {tranquilidad.buttonText}
                      </a>
                    )}
                  </div>
                </div>

                {/* IMAGEN Top Coberturas */}
                {imagenesSecciones?.imagenTopCoberturas && (
                  <div class="text-center">
                    <img
                      src={imagenesSecciones.imagenTopCoberturas}
                      class="section-image"
                      alt="Top Coberturas"
                    />
                  </div>
                )}
                <ElementoTopCoberturas />

                {/* WHY SECTION */}
                <div class="my-5">
                  <h2 class="text-center mb-5">
                    {whySection.sectionTitle}
                  </h2>
                  <div class="why-cards">
                    {whySection.cards.map((card, idx) => (
                      <div class="why-card" key={idx}>
                        <img
                          src={card.imageUrl}
                          alt={card.cardTitle}
                          style={{ width: "100%", borderRadius: "10px", marginBottom: "1rem" }}
                        />
                        <h5>{card.cardTitle}</h5>
                        <p>{card.cardText}</p>
                        {card.buttonText && (
                          <a
                            href={card.buttonLink}
                            class="btn btn-outline-primary mt-2"
                          >
                            {card.buttonText}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ABOUT SECTION */}
                <div class="row align-items-center my-5">
                  <div class="col-md-6">
                    <h2>{about.title}</h2>
                    <p class="lead">{about.text}</p>
                    {about.buttonText && (
                      <a href={about.buttonLink} class="btn btn-success">
                        {about.buttonText}
                      </a>
                    )}
                  </div>
                  <div class="col-md-6">
                    <img
                      src={about.imageUrl}
                      class="section-image"
                      alt="About"
                    />
                  </div>
                </div>
              </>
            );
          })()
        ) : (
          <div class="text-center">Cargando Subhome...</div>
        )}
      </div>
    </>
  );
}

export default SubhomeView;
