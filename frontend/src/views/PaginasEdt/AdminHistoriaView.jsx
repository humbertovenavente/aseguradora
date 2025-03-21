import { createSignal, onMount } from "solid-js";
import { obtenerHistoria, actualizarHistoria } from "./../../services/PaginasEdt/historiaService";


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

  // Agrega un nuevo párrafo vacío al arreglo
  const handleAgregarParrafo = () => {
    setParrafos([...parrafos(), ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarHistoria({ 
        titulo: titulo(), 
        imagenUrl: imagenUrl(), 
        parrafos: parrafos() 
      });
      alert("¡Historia actualizada con éxito!");
    } catch (error) {
      console.error("Error al actualizar la historia:", error);
      alert("Hubo un error al actualizar la historia");
    }
  };

  return (
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          {/* Card para darle estilo */}
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
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Fin de la card */}
        </div>
      </div>
    </div>
  );
}

export default AdminHistoria;
