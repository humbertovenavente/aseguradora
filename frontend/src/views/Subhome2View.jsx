function Subhome2View() {
    return (
      <>
        <style>
          {`
            /* Estilos globales para replicar el layout */
            .hero-sage {
              position: relative;
              background: url("https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069")
                no-repeat center center;
              background-size: cover;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              color: #fff;
            }
            .hero-overlay {
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              background-color: rgba(0,0,0,0.4);
            }
            .hero-content {
              position: relative;
              z-index: 2;
              max-width: 800px;
              padding: 0 1rem;
            }
            .hero-content h1 {
              font-size: 2.5rem;
              font-weight: 700;
              margin-bottom: 1rem;
            }
            .hero-content p {
              font-size: 1.1rem;
              margin-bottom: 2rem;
            }
            /* Precio flotante (ej: "Desde $197") */
            .floating-price {
              position: absolute;
              top: 2rem;
              right: 2rem;
              background-color: #fff;
              color: #000;
              font-weight: 600;
              padding: 0.75rem 1.25rem;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            }
  
            /* Sección "Conoce a tu asesor" */
            .meet-section {
              padding: 4rem 1rem;
              background-color: #e8e8e8;
            }
            .meet-section h2 {
              margin-bottom: 1rem;
            }
            .meet-section p {
              font-size: 1rem;
              margin-bottom: 1rem;
            }
  
            /* Sección "Planes / Servicios" con menú lateral */
            .plans-section {
              background-color: #fdfdfd;
              padding: 4rem 1rem;
            }
            /* Barra lateral con la palabra SERVICES en vertical */
            .plans-section .vertical-menu {
              background-color: #deded0;
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 2rem;
            }
            /* Texto grande "SERVICES" girado verticalmente */
            .plans-section .vertical-menu::before {
              content: "SERVICES";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-90deg);
              font-size: 1.2rem;
              font-weight: 700;
              letter-spacing: 0.2rem;
              color: #333;
              opacity: 0.6;
            }
            .plans-section .vertical-menu a {
              font-weight: 600;
              color: #000;
              margin: 0.5rem 0;
              text-decoration: none;
              transition: color 0.3s ease;
              z-index: 2; /* para que aparezcan sobre el ::before */
            }
            .plans-section .vertical-menu a:hover {
              color: #007bff;
            }
            /* Contenido de planes con caja y sombra */
            .plans-section .plans-content {
              background-color: #fff;
              padding: 2rem;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              border-radius: 0.5rem;
            }
            .plans-section .plans-content h3 {
              margin-bottom: 1rem;
            }
  
            /* Sección "Love Notes" -> Reseñas / Testimonios */
            .love-notes {
              background-color: #2f2f2f;
              color: #fff;
              padding: 4rem 1rem;
            }
            .love-notes h2 {
              margin-bottom: 2rem;
            }
            .love-note-card {
              background-color: #3f3f3f;
              border: none;
              border-radius: 0.5rem;
              padding: 1.5rem;
              margin-bottom: 1rem;
            }
  
            /* Sección "Portfolio" -> Portafolio / Casos de éxito */
            .portfolio-section {
              background-color: #ffffff;
              padding: 4rem 1rem;
            }
            .portfolio-section h2 {
              margin-bottom: 2rem;
            }
            .portfolio-grid .card {
              border: none;
              overflow: hidden;
              border-radius: 0.5rem;
              transition: transform 0.3s ease;
            }
            .portfolio-grid .card:hover {
              transform: scale(1.02);
            }
          `}
        </style>
  
        {/* HERO SECTION */}
        <div class="hero-sage">
          <div class="hero-overlay"></div>
          {/* Precio flotante */}
          <div class="floating-price">
            Desde $197
          </div>
          <div class="hero-content">
            <h1>Protegiendo los Momentos Más Especiales de tu Vida</h1>
            <p>
              Nuestra misión es acompañarte en cada paso, asegurando la tranquilidad que
              necesitas para disfrutar lo más valioso: tu familia, tu hogar y tu futuro.
            </p>
            <button class="btn btn-outline-light px-4 py-2">Conoce Más</button>
          </div>
        </div>
  
        {/* SECCIÓN "Conoce a tu asesor" */}
        <div class="meet-section">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-md-6 mb-4 mb-md-0">
                <img
                  src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                  alt="Asesor de seguros"
                  class="img-fluid rounded"
                />
              </div>
              <div class="col-md-6">
                <h2>Conoce a Tu Asesor</h2>
                <p>
                  Con años de experiencia en el mundo de los seguros, mi compromiso es
                  brindarte soluciones personalizadas que se ajusten a tus necesidades.
                </p>
                <p>
                  Mi pasión es asegurar que cada persona que confía en nosotros
                  se sienta respaldada y protegida. ¡Juntos, diseñaremos el plan
                  perfecto para tu tranquilidad!
                </p>
                <button class="btn btn-primary">Leer Más</button>
              </div>
            </div>
          </div>
        </div>
  
        {/* SECCIÓN "Planes / Servicios" con menú lateral */}
        <div class="plans-section">
          <div class="container">
            <div class="row">
              {/* Menú lateral */}
              <div class="col-md-3 vertical-menu">

              </div>
              {/* Contenido */}
              <div class="col-md-9 plans-content">
                <h3>Explora Nuestros Servicios</h3>
                <p>
                  Descubre las diferentes coberturas que ofrecemos para proteger lo que más te importa.
                  Desde planes básicos hasta seguros integrales, tenemos una opción a tu medida.
                </p>
                <p>
                  Nuestro equipo está listo para guiarte y resolver cualquier duda que tengas.
                  ¡Da el siguiente paso hacia un futuro más seguro!
                </p>
                <button class="btn btn-outline-secondary">Cotizar Ahora</button>
              </div>
            </div>
          </div>
        </div>
  
        {/* SECCIÓN "Love Notes" -> Reseñas / Testimonios */}
        <div class="love-notes">
          <div class="container">
            <h2 class="text-center">Lo Que Dicen Nuestros Clientes</h2>
            <div class="row mt-4">
              <div class="col-md-6">
                <div class="love-note-card">
                  <p>
                    "Gracias a esta aseguradora, finalmente puedo dormir tranquila.
                    El proceso fue rápido y el equipo siempre estuvo disponible
                    para resolver mis dudas."
                  </p>
                  <small>- María González</small>
                </div>
              </div>
              <div class="col-md-6">
                <div class="love-note-card">
                  <p>
                    "Los planes son muy completos y se adaptaron perfectamente a
                    mi presupuesto. ¡Excelente servicio y atención al cliente!"
                  </p>
                  <small>- Carlos Pérez</small>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* SECCIÓN "Portfolio" -> Portafolio / Casos de Éxito */}
        <div class="portfolio-section">
          <div class="container">
            <h2 class="text-center">Casos de Éxito</h2>
            <div class="row portfolio-grid mt-4">
              <div class="col-md-4 mb-4">
                <div class="card">
                  <img
                    src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                    alt="Caso 1"
                    class="card-img-top"
                  />
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div class="card">
                  <img
                    src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                    alt="Caso 2"
                    class="card-img-top"
                  />
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div class="card">
                  <img
                    src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                    alt="Caso 3"
                    class="card-img-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Subhome2View;
  