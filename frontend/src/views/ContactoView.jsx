import { createSignal } from "solid-js";

function ContactoView() {
  const [nombre, setNombre] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [asunto, setAsunto] = createSignal("");
  const [mensaje, setMensaje] = createSignal("");
  const [envioExitoso, setEnvioExitoso] = createSignal(false);
  const [error, setError] = createSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar el formulario (por ejemplo, via fetch o emailjs)
    // Simulamos un envío exitoso:
    setEnvioExitoso(true);
    setError("");
    // Reiniciar formulario (opcional)
    setNombre("");
    setEmail("");
    setAsunto("");
    setMensaje("");
  };

  return (
    <div class="container my-5">
      <h2 class="text-center mb-5">ContactoView</h2>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-body">
              {envioExitoso() && (
                <div class="alert alert-success" role="alert">
                  ¡Mensaje enviado con éxito!
                </div>
              )}
              {error() && (
                <div class="alert alert-danger" role="alert">
                  {error()}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label for="nombre" class="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    class="form-control"
                    placeholder="Tu nombre"
                    value={nombre()}
                    onInput={(e) => setNombre(e.currentTarget.value)}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="form-control"
                    placeholder="nombre@ejemplo.com"
                    value={email()}
                    onInput={(e) => setEmail(e.currentTarget.value)}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="asunto" class="form-label">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    class="form-control"
                    placeholder="Asunto"
                    value={asunto()}
                    onInput={(e) => setAsunto(e.currentTarget.value)}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="mensaje" class="form-label">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    class="form-control"
                    rows="5"
                    placeholder="Escribe tu mensaje aquí..."
                    value={mensaje()}
                    onInput={(e) => setMensaje(e.currentTarget.value)}
                    required
                  ></textarea>
                </div>
                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn"
                    style="background-color: #FF9933; color: #fff;"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactoView;
