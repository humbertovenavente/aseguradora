import { createSignal, onMount } from "solid-js";
import { obtenerContacto } from "../services/PaginasEdt/contactoService";

function ContactoView() {
  const [contacto, setContacto] = createSignal(null);

  onMount(async () => {
    try {
      const data = await obtenerContacto();
      setContacto(data);
    } catch (error) {
      console.error("Error al obtener contacto:", error);
    }
  });

  return (
    <section class="py-5" style="background-color: #f8f9fa;">
      <div class="container my-5">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card shadow-sm border-0">
              <div class="card-body p-5">
                {contacto() ? (
                  <>
                    <h2 class="card-title mb-4 text-center" style="color: #0d6efd;">
                      {contacto().titulo}
                    </h2>
                    <p class="text-center mb-5">{contacto().introduccion}</p>

                    {/* Sección de Teléfono */}
                    <div class="d-flex align-items-center mb-4">
                      <i class="bi bi-telephone-fill fs-3 me-3 text-primary"></i>
                      <div>
                        <strong class="d-block">Teléfono</strong>
                        <span>{contacto().telefono}</span>
                      </div>
                    </div>

                    {/* Sección de Dirección */}
                    <div class="d-flex align-items-center mb-4">
                      <i class="bi bi-geo-alt-fill fs-3 me-3 text-primary"></i>
                      <div>
                        <strong class="d-block">Dirección</strong>
                        <span>{contacto().direccion}</span>
                      </div>
                    </div>

                    {/* Sección de Correo */}
                    <div class="d-flex align-items-center mb-4">
                      <i class="bi bi-envelope-fill fs-3 me-3 text-primary"></i>
                      <div>
                        <strong class="d-block">Correo</strong>
                        <span>{contacto().correo}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>Cargando...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactoView;
