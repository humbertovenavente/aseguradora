import { createSignal, onMount } from "solid-js";
import { obtenerFaq } from "../services/PaginasEdt/faqService";

function FaqView() {
  const [faq, setFaq] = createSignal(null);

  onMount(async () => {
    try {
      const data = await obtenerFaq();
      setFaq(data);
    } catch (error) {
      console.error("Error al obtener FAQ:", error);
    }
  });

  return (
    <div class="container my-5">
      <h2 class="text-center mb-5">Preguntas Frecuentes</h2>
      <div class="accordion" id="faqAccordion">
        {faq() &&
          faq().items.map((item, index) => (
            <div class="accordion-item" key={index}>
              <h2 class="accordion-header" id={`heading${index}`}>
                <button
                  class={"accordion-button " + (index === 0 ? "" : "collapsed")}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse${index}`}
                >
                  {item.pregunta}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                class={"accordion-collapse collapse " + (index === 0 ? "show" : "")}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div class="accordion-body">{item.respuesta}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FaqView;
