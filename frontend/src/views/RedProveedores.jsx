function RedProveedores() {
    return (
      <>
        {/* Estilos locales para efecto hover en las tarjetas */}
        <style>
          {`
            .card:hover {
              transform: translateY(-5px);
              transition: transform 0.3s ease;
            }
          `}
        </style>
  
        <div class="container my-5">
          <h2 class="text-center mb-5">Nuestros RedProveedores</h2>
          <div class="row">
            {/* Proveedor 1 */}
            <div class="col-md-4 mb-4">
              <div class="card h-100 border-0 shadow-lg">
                <img
                  src="https://www.hospitaleslapaz.com/wp-content/uploads/2021/02/la-paz-logo-standar.png"
                  class="card-img-top"
                  alt="Proveedor 1"
                />
                <div class="card-body">
                  <h5 class="card-title">Industrial Solutions S.A.</h5>
                  <p class="card-text">
                    Líderes en tecnología de manufactura y suministro de materias primas, ofreciendo soluciones integrales y de alta eficiencia.
                  </p>
                </div>
                <div class="card-footer bg-transparent border-0">
                  <a href="#" class="btn btn-outline-primary btn-sm">Ver más</a>
                </div>
              </div>
            </div>
            {/* Proveedor 2 */}
            <div class="col-md-4 mb-4">
              <div class="card h-100 border-0 shadow-lg">
                <img
                  src="https://www.hospitaleslapaz.com/wp-content/uploads/2021/02/la-paz-logo-standar.png"
                  class="card-img-top"
                  alt="Proveedor 2"
                />
                <div class="card-body">
                  <h5 class="card-title">Logística Global Ltda.</h5>
                  <p class="card-text">
                    Expertos en soluciones logísticas y de transporte, garantizando entregas seguras y puntuales.
                  </p>
                </div>
                <div class="card-footer bg-transparent border-0">
                  <a href="#" class="btn btn-outline-primary btn-sm">Ver más</a>
                </div>
              </div>
            </div>
            {/* Proveedor 3 */}
            <div class="col-md-4 mb-4">
              <div class="card h-100 border-0 shadow-lg">
                <img
                  src="https://www.hospitaleslapaz.com/wp-content/uploads/2021/02/la-paz-logo-standar.png"
                  class="card-img-top"
                  alt="Proveedor 3"
                />
                <div class="card-body">
                  <h5 class="card-title">Tech Innovators</h5>
                  <p class="card-text">
                    Proveedor de soluciones tecnológicas innovadoras que impulsan la productividad y competitividad en el mercado.
                  </p>
                </div>
                <div class="card-footer bg-transparent border-0">
                  <a href="#" class="btn btn-outline-primary btn-sm">Ver más</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default RedProveedores;
  