import { createSignal, onMount } from "solid-js";
import { obtenerHome } from "../services/PaginasEdt/homeService.js";
import ElementoTopVendidos from "./PaginasEdt/ElementoTopVendidos.jsx";
import ElementoTopEmpleados from "./PaginasEdt/ElementoTopEmpleados.jsx";
import ElementoUltimosServicios from "./PaginasEdt/ElementoUltimosServicios.jsx";

function HomeView() {
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

      <div class="container my-5">
        {/* HERO SECTION */}
        {homeData()?.hero && (
          <div class="hero-section">
            <div class="hero-overlay"></div>
            <div class="hero-content">
              <h1 class="mb-3">{homeData().hero.title}</h1>
              <p class="lead mb-4">{homeData().hero.subtitle}</p>
              {homeData().hero.cta_1?.text && (
                <a href={homeData().hero.cta_1.link} class="btn btn-warning m-2">{homeData().hero.cta_1.text}</a>
              )}
              {homeData().hero.cta_2?.text && (
                <a href={homeData().hero.cta_2.link} class="btn btn-outline-light m-2">{homeData().hero.cta_2.text}</a>
              )}
            </div>
          </div>
        )}
        {homeData()?.imagenesSecciones?.imagenTopCoberturas && (
          <div class="text-center">
            <img src={homeData().imagenesSecciones.imagenTopCoberturas} class="section-image" alt="Top Coberturas" />
          </div>
        )}
        <ElementoTopVendidos />

        {/* TRANQUILIDAD SECTION */}
        {homeData()?.tranquilidad && (
          <div class="row align-items-center my-5">
            <div class="col-md-6">
              <img src={homeData().tranquilidad.imageUrl} class="section-image" alt="Tranquilidad" />
            </div>
            <div class="col-md-6">
              <h2>{homeData().tranquilidad.title}</h2>
              <p class="lead">{homeData().tranquilidad.leadText}</p>
              <p>{homeData().tranquilidad.description}</p>
              {homeData().tranquilidad.buttonText && (
                <a href={homeData().tranquilidad.buttonLink} class="btn btn-primary mt-2">{homeData().tranquilidad.buttonText}</a>
              )}
            </div>
          </div>
        )}
        {homeData()?.imagenesSecciones?.imagenTopEmpleados && (
          <div class="text-center">
            <img src={homeData().imagenesSecciones.imagenTopEmpleados} class="section-image" alt="Empleados" />
          </div>
        )}
        <ElementoTopEmpleados />
        {/* WHY SECTION */}
        {homeData()?.whySection && (
          <div class="my-5">
            <h2 class="text-center mb-5">{homeData().whySection.sectionTitle}</h2>
            <div class="why-cards">
              {homeData().whySection.cards.map((card, index) => (
                <div class="why-card" key={index}>
                  <img src={card.imageUrl} alt={card.cardTitle} style={{ width: "100%", borderRadius: "10px", marginBottom: "1rem" }} />
                  <h5>{card.cardTitle}</h5>
                  <p>{card.cardText}</p>
                  {card.buttonText && (
                    <a href={card.buttonLink} class="btn btn-outline-primary mt-2">{card.buttonText}</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {homeData()?.imagenesSecciones?.imagenUltimosServicios && (
          <div class="text-center">
            <img src={homeData().imagenesSecciones.imagenUltimosServicios} class="section-image" alt="Últimos Servicios" />
          </div>
        )}
        <ElementoUltimosServicios />
        {/* ABOUT SECTION */}
        {homeData()?.about && (
          <div class="row align-items-center my-5">
            <div class="col-md-6">
              <h2>{homeData().about.title}</h2>
              <p class="lead">{homeData().about.text}</p>
              {homeData().about.buttonText && (
                <a href={homeData().about.buttonLink} class="btn btn-success">{homeData().about.buttonText}</a>
              )}
            </div>
            <div class="col-md-6">
              <img src={homeData().about.imageUrl} class="section-image" alt="About" />
            </div>
          </div>
        )}






      </div>
    </>
  );
}

export default HomeView;
