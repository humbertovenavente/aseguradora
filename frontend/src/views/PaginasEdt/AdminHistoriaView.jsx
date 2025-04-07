import { createSignal, onMount } from "solid-js";
import { obtenerHistoria, enviarPropuestaHistoria } from "../../services/PaginasEdt/historiaService";

function AdminHistoria() {
  const [titulo, setTitulo] = createSignal("");
  const [imagenUrl, setImagenUrl] = createSignal("");
  const [parrafos, setParrafos] = createSignal([]);

  onMount(async () => {
    try {
      const data = await obtenerHistoria();
      if (data) {
        setTitulo(data.titulo || "");
        setImagenUrl(data.imagenUrl || "");
        setParrafos(data.parrafos || []);
      }
    } catch (error) {
      console.error("Error al obtener la historia:", error);
    }
  });

  const handleParrafoChange = (index, value) => {
    const nuevos = [...parrafos()];
    nuevos[index] = value;
    setParrafos(nuevos);
  };

  const handleAgregarParrafo = () => {
    setParrafos([...parrafos(), ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
    const correo = usuarioLogueado?.correo;

    if (!correo) {
      alert("⚠️ No se pudo identificar al usuario logueado.");
      return;
    }

    const propuesta = {
      titulo: titulo(),
      imagenUrl: imagenUrl(),
      parrafos: parrafos(),
    };

    try {
      await enviarPropuestaHistoria(propuesta, correo);
      alert("✅ Propuesta enviada para revisión");
    } catch (error) {
      console.error("Error al enviar la propuesta:", error.response?.data || error.message);
      alert("❌ Error al enviar la propuesta");
    }
  };

  return (
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-header">
              <h2 class="card-title mb-0">Editar Historia</h2>
            </div>
            <div class="card-body">
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label for="titulo" class="form-label">Título:</label>
                  <input
                    id="titulo"
                    type="text"
                    class="form-control"
                    value={titulo()}
                    onInput={(e) => setTitulo(e.currentTarget.value)}
                  />
                </div>

                <div class="mb-3">
                  <label for="imagenUrl" class="form-label">URL de la imagen:</label>
                  <input
                    id="imagenUrl"
                    type="text"
                    class="form-control"
                    value={imagenUrl()}
                    onInput={(e) => setImagenUrl(e.currentTarget.value)}
                  />
                </div>

                {parrafos().map((parrafo, index) => (
                  <div class="mb-3" key={index}>
                    <label for={`parrafo-${index}`} class="form-label">
                      Contenido del párrafo {index + 1}:
                    </label>
                    <textarea
                      id={`parrafo-${index}`}
                      class="form-control"
                      rows="3"
                      value={parrafo}
                      onInput={(e) => handleParrafoChange(index, e.currentTarget.value)}
                    />
                  </div>
                ))}

                <div class="d-flex gap-2">
                  <button 
                    type="button" 
                    class="btn btn-secondary"
                    onClick={handleAgregarParrafo}
                  >
                    Agregar párrafo
                  </button>

                  <button type="submit" class="btn btn-primary">
                    Guardar cambios
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

export default AdminHistoria;
