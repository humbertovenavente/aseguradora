function TestimoniosView() {
    return (
      <>
        {/* Estilos locales para aproximar la estética */}
        <style>
          {`
            /* General Reset / Container adjustments */
            body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              background-color: #fff;
            }
            /* Navbar */
            .navbar-custom {
              background-color: #3e3e3e; /* tono gris oscuro */
            }
            .navbar-custom .navbar-brand {
              color: #fff;
              font-weight: 600;
              letter-spacing: 0.05rem;
            }
            .navbar-custom .nav-link {
              color: #ddd;
              margin-left: 1rem;
              transition: color 0.2s;
            }
            .navbar-custom .nav-link:hover {
              color: #fff;
            }
            /* Sección de New Release */
            .new-release-section {
              padding: 3rem 1rem;
              background-color: #fff;
            }
            .new-release-title {
              text-transform: uppercase;
              font-size: 0.9rem;
              letter-spacing: 0.1rem;
              color: #999;
              margin-bottom: 0.5rem;
            }
            .book-title {
              font-size: 2rem;
              font-weight: 700;
              margin-bottom: 0.75rem;
            }
            .tagline {
              font-size: 1rem;
              color: #555;
              margin-bottom: 1.5rem;
            }
            .book-cover {
              max-width: 100%;
              border: 1px solid #eee;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              margin-bottom: 1rem;
            }
            .new-release-btn {
              margin-right: 0.5rem;
              border-radius: 0;
              font-weight: 600;
            }
            /* Sección de Reseñas (Estrellas) */
            .reviews-section {
              background-color: #f7f7f7;
              padding: 2rem 1rem;
            }
.review-card {
  background-color: #fff;
  border: 1px solid #eee;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  border-radius: 0.25rem;
}

            .review-stars i {
              color: #FFD700;
              margin-right: 2px;
            }
            .review-title {
              font-weight: 600;
              margin-top: 0.5rem;
            }
            /* Newsletter */
            .newsletter-section {
              background-color: #fff;
              padding: 2rem 1rem;
              text-align: center;
            }
            .newsletter-section h3 {
              font-weight: 600;
              margin-bottom: 1rem;
            }
            .newsletter-section p {
              color: #666;
              margin-bottom: 1.5rem;
            }
            .newsletter-btn {
              border-radius: 0;
              font-weight: 600;
            }
            /* About Section */
            .about-section {
              background-color: #f0f0f0;
              padding: 2rem 1rem;
            }
            .about-section h2 {
              font-weight: 600;
              margin-bottom: 1rem;
            }
            .about-section p {
              color: #555;
            }
            .author-photo {
              max-width: 100%;
              border-radius: 0;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
          `}
        </style>
  
  
        {/* SECCIÓN: New Release */}
        <div class="new-release-section">
          <div class="container">
            <div class="row">
              {/* Columna del libro */}
              <div class="col-md-4 text-center">
                <p class="new-release-title">NEW RELEASE</p>
                <img
                  src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                  alt="Book Cover"
                  class="book-cover"
                />
              </div>
              {/* Columna de texto */}
              <div class="col-md-8 d-flex flex-column justify-content-center">
                <h1 class="book-title">Book Title Goes Here</h1>
                <p class="tagline">Tagline saying what the book is about, capturing the essence or intrigue.</p>
                <div>
                  <button class="btn btn-dark new-release-btn">Learn More</button>
                  <button class="btn btn-outline-dark new-release-btn">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* SECCIÓN: Reseñas (Estrellas) */}
        <div class="reviews-section">
          <div class="container">
          <div class="row g-4">
  {/* Reseña 1 */}
  <div class="col-md-4">
    <div class="review-card p-3 text-center">
      {/* Estrellitas */}
      <div class="mb-2">
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
      </div>
      <h5 class="mb-2">"An amazing read!"</h5>
      <p class="mb-0">
        This book was everything I hoped for and more. The author has a unique
        voice that keeps you engaged until the last page.
      </p>
    </div>
  </div>

  {/* Reseña 2 */}
  <div class="col-md-4">
    <div class="review-card p-3 text-center">
      <div class="mb-2">
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-half text-warning"></i>
      </div>
      <h5 class="mb-2">"Could not put it down"</h5>
      <p class="mb-0">
        I found myself reading chapter after chapter. The characters are so
        relatable, and the plot twists are perfectly timed.
      </p>
    </div>
  </div>

  {/* Reseña 3 */}
  <div class="col-md-4">
    <div class="review-card p-3 text-center">
      <div class="mb-2">
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star-fill text-warning"></i>
        <i class="bi bi-star text-warning"></i>
      </div>
      <h5 class="mb-2">"Great story"</h5>
      <p class="mb-0">
        A solid read with a satisfying ending. Highly recommend for fans of
        suspense and drama.
      </p>
    </div>
  </div>
</div>

          </div>
        </div>
  
        {/* SECCIÓN: Newsletter */}
        <div class="newsletter-section">
          <div class="container">
            <h3>Join My Newsletter!</h3>
            <p>And Gain Exclusive Access to Deleted Scenes!</p>
            <button class="btn btn-dark newsletter-btn">Subscribe Now</button>
          </div>
        </div>
  
        {/* SECCIÓN: About Harry Davewill */}
        <div class="about-section">
          <div class="container">
            <div class="row align-items-center">
              {/* Imagen Autor */}
              <div class="col-md-4 mb-4 mb-md-0 text-center">
                <img
                  src="https://www.lineadirectaaseguradora.com/documents/652707/655984/creemos-en-las-personas.jpg/7a4d11c7-4f81-5980-a8bf-9ff619353253?t=1646067774069"
                  alt="Author"
                  class="author-photo"
                />
              </div>
              {/* Texto Autor */}
              <div class="col-md-8">
                <h2>About Harry Davewill</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum at velit tellus. Aliquam erat volutpat. Duis finibus
                  leo a nisl finibus commodo. Praesent fringilla ex vel risus
                  tempus, nec ultricies magna volutpat. Pellentesque finibus,
                  justo at dignissim ultrices, ante lorem ullamcorper justo, sed
                  tempus nulla magna at tortor.
                </p>
                <p>
                  Sed ac turpis sed massa cursus placerat. Nullam dictum,
                  mauris eget ullamcorper luctus, ipsum quam dictum arcu,
                  eget dignissim massa diam et sapien. Curabitur tincidunt
                  dui nec laoreet pellentesque.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default TestimoniosView;
  