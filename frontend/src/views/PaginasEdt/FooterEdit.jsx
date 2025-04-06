import { createSignal, createResource } from "solid-js";
import { obtenerFooter, actualizarFooter } from "../../services/footerService";

export default function AdminFooterEditor() {
  const [footer, { mutate, refetch }] = createResource(obtenerFooter);
  const [contenido, setContenido] = createSignal("");
  const [editando, setEditando] = createSignal(false);

  const guardarCambios = async () => {
    await actualizarFooter(contenido());
    await refetch();
    setEditando(false);
    alert("✅ Footer actualizado correctamente.");
  };

  return (
    <div class="container mt-4">
      <h2>Editor de Footer</h2>

      {editando() ? (
        <>
          <textarea
            class="form-control mb-3"
            rows="4"
            value={contenido()}
            onInput={(e) => setContenido(e.target.value)}
          />
          <button class="btn btn-success me-2" onClick={guardarCambios}>
            💾 Guardar
          </button>
          <button class="btn btn-secondary" onClick={() => setEditando(false)}>
            Cancelar
          </button>
        </>
      ) : (
        <>
          <p>{footer()?.contenido}</p>
          <button class="btn btn-primary" onClick={() => {
            setContenido(footer()?.contenido ?? "");
            setEditando(true);
          }}>
            ✏️ Editar
          </button>
        </>
      )}
    </div>
  );
}
