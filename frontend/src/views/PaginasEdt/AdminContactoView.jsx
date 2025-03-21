import { createSignal, onMount } from "solid-js";
import { obtenerContacto, actualizarContacto } from "../../services/PaginasEdt/contactoService";

function AdminContacto() {
  const [titulo, setTitulo] = createSignal("");
  const [introduccion, setIntroduccion] = createSignal("");
  const [telefono, setTelefono] = createSignal("");
  const [direccion, setDireccion] = createSignal("");
  const [correo, setCorreo] = createSignal("");

  onMount(async () => {
    try {
      const data = await obtenerContacto();
      if (data) {
        setTitulo(data.titulo || "");
        setIntroduccion(data.introduccion || "");
        setTelefono(data.telefono || "");
        setDireccion(data.direccion || "");
        setCorreo(data.correo || "");
      }
    } catch (error) {
      console.error("Error al obtener contacto:", error);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarContacto({
        titulo: titulo(),
        introduccion: introduccion(),
        telefono: telefono(),
        direccion: direccion(),
        correo: correo(),
      });
      alert("¡Información de contacto actualizada con éxito!");
    } catch (error) {
      console.error("Error al actualizar contacto:", error);
      alert("Hubo un error al actualizar el contacto");
    }
  };

  return (
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow-sm border-0">
            <div class="card-header">
              <h2 class="card-title mb-0">Editar Información de Contacto</h2>
            </div>
            <div class="card-body">
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label class="form-label" for="titulo">Título</label>
                  <input
                    id="titulo"
                    type="text"
                    class="form-control"
                    value={titulo()}
                    onInput={(e) => setTitulo(e.currentTarget.value)}
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" for="introduccion">Introducción</label>
                  <textarea
                    id="introduccion"
                    class="form-control"
                    rows="3"
                    value={introduccion()}
                    onInput={(e) => setIntroduccion(e.currentTarget.value)}
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" for="telefono">Teléfono</label>
                  <input
                    id="telefono"
                    type="text"
                    class="form-control"
                    value={telefono()}
                    onInput={(e) => setTelefono(e.currentTarget.value)}
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" for="direccion">Dirección</label>
                  <input
                    id="direccion"
                    type="text"
                    class="form-control"
                    value={direccion()}
                    onInput={(e) => setDireccion(e.currentTarget.value)}
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" for="correo">Correo</label>
                  <input
                    id="correo"
                    type="text"
                    class="form-control"
                    value={correo()}
                    onInput={(e) => setCorreo(e.currentTarget.value)}
                  />
                </div>

                <button type="submit" class="btn btn-primary">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminContacto;
