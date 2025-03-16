// src/views/HomeView.jsx
function Subhome2View() {
    return (
      <>
        {/* HERO SECTION */}
        <section class="hero-section">
          <div class="hero-content">
            <h2>Bienvenido a nuestro Sitio</h2>
            <p>
              Ofrecemos soluciones integrales para que tu negocio crezca
              y tus necesidades estén cubiertas.
            </p>
            <button class="cta-button">Contáctanos</button>
          </div>
        </section>
  
        {/* SERVICIOS O FEATURES */}
        <section class="services-section">
          <h2>Nuestros Servicios</h2>
          <div class="services-cards">
            <article class="service-card">
              <h3>Consultoría</h3>
              <p>
                Te asesoramos para maximizar el potencial de tu proyecto
                y orientarlo al éxito.
              </p>
            </article>
            <article class="service-card">
              <h3>Seguros Personales</h3>
              <p>
                Protege a tu familia con un plan de salud y vida que se ajuste
                a tu presupuesto.
              </p>
            </article>
            <article class="service-card">
              <h3>Soporte 24/7</h3>
              <p>
                Nuestra asistencia está disponible en cualquier momento
                para resolver tus dudas.
              </p>
            </article>
          </div>
        </section>
  
        {/* SECCIÓN ACERCA DE / ABOUT US */}
        <section class="about-section">
          <h2>Acerca de Nosotros</h2>
          <p>
            Somos un equipo comprometido en brindar soluciones de calidad.
            Creemos en la innovación, el servicio al cliente y la integridad.
          </p>
        </section>
      </>
    );
  }
  
  export default Subhome2View;