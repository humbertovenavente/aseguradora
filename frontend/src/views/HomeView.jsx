function HomeView() {
  return (
    <>
      {/* Estilos locales para el hero y algunos ajustes */}
      <style>
        {`
          .hero-section {
            background: url("https://gustavomirabalcastro.com/wp-content/uploads/2020/10/Gustavo-Mirabal-Castro-que-es-un-asesor-financiero.jpg")
              no-repeat center center;
            background-size: cover;
            height: 90vh;
            position: relative;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
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

          /* Sección de "Encuentra tu tranquilidad" */
          .tranquilidad-section img {
            border-radius: 1rem;
          }

          /* Sección de tarjetas */
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

          /* Sección final - "Hola, soy Lily..." */
          .about-section img {
            border-radius: 1rem;
          }
        `}
      </style>

      {/* HERO SECTION */}
      <div class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title">Construyendo relaciones sólidas contigo</h1>
          <p class="hero-subtitle">
            Protege tu futuro y el de los tuyos con nuestras soluciones de seguros a tu medida.
          </p>
          <div>
            <button
              class="btn btn-warning hero-btn"
              style="background-color: #FF9933; border: none;"
            >
              Cotiza tu Seguro
            </button>
            <button class="btn btn-outline-light hero-btn">
              Conoce Más
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN 1: Encuentra tu tranquilidad */}
      <div class="container my-5 tranquilidad-section">
        <div class="row align-items-center">
          <div class="col-md-6 mb-4 mb-md-0">
            <img
              src="https://blog.socasesores.com/wp-content/uploads/2022/01/aseguradoras-de-vida.webp"
              alt="Seguro de vida"
              class="img-fluid"
            />
          </div>
          <div class="col-md-6">
            <h2 class="mb-4">Encuentra tu Tranquilidad</h2>
            <p class="lead">
              Transforma tu vida con un seguro que cubra tus necesidades: 
              protege tu salud, tu hogar y a tu familia con el respaldo que mereces.
            </p>
            <p>
              Nuestra misión es brindarte la confianza de saber que, pase lo que pase,
              contarás con un equipo de expertos dispuestos a apoyarte. Elige el plan
              que mejor se adapte a tu estilo de vida y disfruta de la tranquilidad
              que te mereces.
            </p>
            <button
              class="btn btn-primary"
              style="border-radius: 50px; padding: 0.5rem 1.5rem;"
            >
              Contáctanos
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: We are all about our "Why" (3 tarjetas) */}
      <div class="container my-5 why-section">
        <h2 class="text-center mb-5">Nos Importa tu “Porqué”</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100">
              <img
                src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                class="card-img-top"
                alt="Seguros de Auto"
              />
              <div class="card-body">
                <h5 class="card-title">Seguros de Auto</h5>
                <p class="card-text">
                  Conduce con confianza: protege tu vehículo ante cualquier eventualidad y recorre tus caminos con seguridad.
                </p>
                <button class="btn btn-outline-primary">Ver Planes</button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100">
              <img
                src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                class="card-img-top"
                alt="Equipo de Asesores"
              />
              <div class="card-body">
                <h5 class="card-title">Conoce al Equipo</h5>
                <p class="card-text">
                  Nuestros asesores expertos te acompañan en cada paso, brindándote orientación personalizada y soluciones a tu medida.
                </p>
                <button class="btn btn-outline-primary">Ver Equipo</button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100">
              <img
                src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                class="card-img-top"
                alt="Agenda tu Cita"
              />
              <div class="card-body">
                <h5 class="card-title">Agenda tu Cita</h5>
                <p class="card-text">
                  Programa una reunión para evaluar tus necesidades y encontrar la póliza perfecta para ti y tu familia.
                </p>
                <button class="btn btn-outline-primary">Agendar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: "Hola, soy Lily..." (o persona experta en seguros) */}
      <div class="container my-5 about-section">
        <div class="row align-items-center">
          <div class="col-md-6 mb-4 mb-md-0">
            <img
              src="https://img.freepik.com/foto-gratis/hermosa-mujer-hablando-telefono_23-2148369518.jpg?size=626&ext=jpg"
              alt="Agente de Seguros"
              class="img-fluid"
            />
          </div>
          <div class="col-md-6">
            <h2 class="mb-4">Hola, soy Lily</h2>
            <p class="lead">
              Apasionada por la protección y el bienestar de las personas,
              me dedico a asesorarte para que encuentres el seguro que mejor
              se adapte a tu vida y a la de los tuyos.
            </p>
            <p>
              Con más de 10 años de experiencia en el sector, mi misión es
              brindar tranquilidad y confianza a cada uno de mis clientes.
              Juntos, construiremos un plan de protección sólido para que
              puedas enfocarte en lo que realmente importa: disfrutar tu día a día.
            </p>
            <button
              class="btn btn-success"
              style="border-radius: 50px; padding: 0.5rem 1.5rem;"
            >
              Conoce mi Historia
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeView;
