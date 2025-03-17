function SubhomeView() {
    return (
      <>
        {/* Estilos locales para replicar el diseño */}
        <style>
          {`
            /* Barra superior */
            .top-bar {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 1rem 2rem;
              background-color: #f8f9fa;
            }
            .top-bar .brand {
              font-weight: 700;
              font-size: 1.2rem;
            }
  
            /* Botón de la barra superior */
            .top-bar .btn-top {
              background-color: #6dc2f3;
              color: #fff;
              border: none;
              border-radius: 50px;
              padding: 0.5rem 1.5rem;
              font-weight: 600;
            }
  
            /* Hero principal */
            .hero {
              position: relative;
              background: url("https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069") no-repeat center center;
              background-size: cover;
              height: 90vh;
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
              max-width: 600px;
              padding: 0 1rem;
            }
            .hero h1 {
              font-size: 2.5rem;
              font-weight: 700;
              margin-bottom: 1rem;
            }
            .hero p {
              font-size: 1.1rem;
              margin-bottom: 1.5rem;
            }
            .hero-btn {
              border-radius: 50px;
              padding: 0.6rem 1.5rem;
              margin: 0.5rem;
              font-weight: 600;
            }
  
            /* Sección "Gentle Yoga..." adaptada a seguros */
            .info-section {
              padding: 3rem 0;
            }
            .info-section h2 {
              margin-bottom: 1rem;
            }
            .info-section .lead {
              font-size: 1.1rem;
            }
  
            /* Sección "We are all about our 'Why'" adaptada */
            .why-section {
              background-color: #f8f9fa;
              padding: 3rem 0;
            }
            .why-section h2 {
              margin-bottom: 2rem;
            }
            .why-cards .card {
              border: none;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              border-radius: 1rem;
              transition: transform 0.3s ease;
            }
            .why-cards .card:hover {
              transform: translateY(-5px);
            }
            .why-cards .card-body {
              text-align: center;
            }
  
            /* Sección "Featured posts loved by readers" */
            .featured-section {
              padding: 3rem 0;
            }
            .featured-section h2 {
              margin-bottom: 2rem;
            }
            .featured-section .card {
              border: none;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              transition: transform 0.3s ease;
              border-radius: 1rem;
            }
            .featured-section .card:hover {
              transform: translateY(-5px);
            }
  
            /* Sección "Sign up for our weekly newsletter" */
            .newsletter-section {
              padding: 3rem 0;
              text-align: center;
            }
            .newsletter-section h3 {
              margin-bottom: 1rem;
            }
            .newsletter-section p {
              margin-bottom: 1.5rem;
            }
            .newsletter-input {
              border-radius: 50px;
              padding: 0.6rem 1rem;
              width: 100%;
              max-width: 400px;
              margin: 0 auto 1rem auto;
            }
            .newsletter-btn {
              border-radius: 50px;
              padding: 0.6rem 1.5rem;
              font-weight: 600;
              background-color: #6dc2f3;
              color: #fff;
              border: none;
            }
          `}
        </style>
  
        {/* Barra Superior */}
        <div class="top-bar">
          <div class="brand">Aseguradora Premium</div>
          <button class="btn-top">Cotiza Ahora</button>
        </div>
  
        {/* Hero Principal */}
        <div class="hero">
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <h1>Este es mi camino hacia la tranquilidad que amo, <br /> mientras protejo lo que más importa</h1>
            <p>
              Con nuestras pólizas de seguros, podrás construir un futuro estable para ti y tus seres queridos, sin dejar de disfrutar el presente.
            </p>
            <div>
              <button class="btn hero-btn" style="background-color: #d6ed14; color: #000;">
                Conoce Nuestras Opciones
              </button>
              <button class="btn btn-outline-light hero-btn">
                Contáctanos
              </button>
            </div>
          </div>
        </div>
  
        {/* Sección Info (adaptación de "Gentle Yoga...") */}
        <div class="container info-section">
          <div class="row">
            <div class="col-md-6">
              <h2>Protege tu Mente, Cuerpo y Patrimonio</h2>
              <p class="lead">
                Descubre cómo nuestras pólizas pueden cubrir cada aspecto de tu vida, brindándote la seguridad y la libertad de crecer sin preocupaciones.
              </p>
              <p>
                Ya sea que busques un seguro de vida, de salud o de bienes, nuestro equipo está aquí para asesorarte y ayudarte a encontrar la mejor opción para tu familia y tu negocio.
              </p>
            </div>
            <div class="col-md-6">
              <img
                src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                alt="Seguro integral"
                class="img-fluid rounded"
              />
            </div>
          </div>
        </div>
  
        {/* Sección "We are all about our 'Why'" */}
        <div class="why-section">
          <div class="container">
            <h2 class="text-center">Nos enfocamos en tu “Porqué”</h2>
            <div class="row why-cards mt-4">
              <div class="col-md-3 mb-4">
                <div class="card h-100">
                  <div class="card-body">
                    <img
                      src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                      alt="Razón 1"
                      class="img-fluid rounded-circle mb-3"
                      style="width:80px; height:80px; object-fit:cover;"
                    />
                    <h5 class="card-title">Protege a tu familia</h5>
                    <p class="card-text">
                      Crea un futuro estable para quienes más quieres, con coberturas pensadas en su bienestar.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 mb-4">
                <div class="card h-100">
                  <div class="card-body">
                    <img
                      src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                      alt="Razón 2"
                      class="img-fluid rounded-circle mb-3"
                      style="width:80px; height:80px; object-fit:cover;"
                    />
                    <h5 class="card-title">Cuida tu salud</h5>
                    <p class="card-text">
                      Disfruta cada momento con la tranquilidad de contar con respaldo médico.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 mb-4">
                <div class="card h-100">
                  <div class="card-body">
                    <img
                      src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                      alt="Razón 3"
                      class="img-fluid rounded-circle mb-3"
                      style="width:80px; height:80px; object-fit:cover;"
                    />
                    <h5 class="card-title">Asegura tus bienes</h5>
                    <p class="card-text">
                      Desde tu hogar hasta tu negocio, mantenlos a salvo frente a cualquier eventualidad.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 mb-4">
                <div class="card h-100">
                  <div class="card-body">
                    <img
                      src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                      alt="Razón 4"
                      class="img-fluid rounded-circle mb-3"
                      style="width:80px; height:80px; object-fit:cover;"
                    />
                    <h5 class="card-title">Crece sin límites</h5>
                    <p class="card-text">
                      Emprende y avanza con seguridad, sabiendo que tus riesgos están cubiertos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Sección "Featured posts loved by readers" */}
        <div class="featured-section container">
          <h2 class="text-center">Publicaciones destacadas</h2>
          <div class="row mt-4">
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <img
                  src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                  class="card-img-top"
                  alt="Post 1"
                />
                <div class="card-body">
                  <h5 class="card-title">Guía para elegir tu seguro de vida</h5>
                  <p class="card-text">
                    Conoce los puntos clave que debes considerar antes de contratar una póliza de vida.
                  </p>
                  <a href="#" class="btn btn-outline-primary btn-sm">Leer más</a>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <img
                  src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                  class="card-img-top"
                  alt="Post 2"
                />
                <div class="card-body">
                  <h5 class="card-title">Protege tu negocio con un buen seguro</h5>
                  <p class="card-text">
                    Asegura el futuro de tu emprendimiento y enfrenta los retos con mayor tranquilidad.
                  </p>
                  <a href="#" class="btn btn-outline-primary btn-sm">Leer más</a>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <img
                  src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                  class="card-img-top"
                  alt="Post 3"
                />
                <div class="card-body">
                  <h5 class="card-title">Mitos y realidades de los seguros</h5>
                  <p class="card-text">
                    Derriba las creencias falsas y descubre por qué un seguro puede ser tu mejor aliado.
                  </p>
                  <a href="#" class="btn btn-outline-primary btn-sm">Leer más</a>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Sección Newsletter */}
        <div class="newsletter-section">
          <h3>Suscríbete a nuestro boletín semanal</h3>
          <p>Recibe consejos, promociones y noticias relevantes sobre seguros.</p>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              class="newsletter-input mb-2 mb-sm-0 me-sm-2"
            />
            <button class="newsletter-btn">Suscribirse</button>
        
        </div>
      </>
    );
  }
  
  export default SubhomeView;
  