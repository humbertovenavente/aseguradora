function FaqView() {
    return (
      <div class="container my-5">
        <h2 class="text-center mb-5">Preguntas Frecuentes</h2>
        <div class="accordion" id="faqAccordion">
          {/* Pregunta 1 */}
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                ¿Qué servicios ofrece la empresa?
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#faqAccordion"
            >
              <div class="accordion-body">
                Ofrecemos una amplia gama de servicios, desde desarrollo de software y consultoría tecnológica hasta soporte y mantenimiento de sistemas.
              </div>
            </div>
          </div>
          {/* Pregunta 2 */}
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                ¿Cómo puedo contactarlos?
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#faqAccordion"
            >
              <div class="accordion-body">
                Puedes contactarnos a través de nuestro formulario en línea, por correo electrónico o llamando a nuestro centro de atención.
              </div>
            </div>
          </div>
          {/* Pregunta 3 */}
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                ¿Cuál es el horario de atención?
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#faqAccordion"
            >
              <div class="accordion-body">
                Nuestro horario de atención es de lunes a viernes, de 9:00 a 18:00.
              </div>
            </div>
          </div>
          {/* Puedes agregar más preguntas siguiendo este formato */}
        </div>
      </div>
    );
  }
  
  export default FaqView;
  