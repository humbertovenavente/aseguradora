import { createSignal, createResource } from "solid-js";
import { obtenerFooter, proponerEdicionFooter } from "../../services/footerService";

export default function AdminFooterEditor() {
  const [footer, { refetch }] = createResource(obtenerFooter);
  const [contenido, setContenido] = createSignal("");
  const [editando, setEditando] = createSignal(false);

  const guardarCambios = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const correo = usuario?.correo;

    if (!correo) {
      alert("⚠️ No se pudo identificar al usuario logueado.");
      return;
    }

    try {
      await proponerEdicionFooter(contenido(), correo);
      setEditando(false);
      alert("📨 Propuesta de edición enviada para aprobación.");
    } catch (error) {
      console.error("Error al enviar propuesta:", error);
      alert("❌ Error al enviar la propuesta.");
    }
  };

  return (
    <div class="container mt-4">
      <h2>📝 Editor del Footer</h2>

      {editando() ? (
        <>
          <textarea
            class="form-control mb-3"
            rows="4"
            value={contenido()}
            onInput={(e) => setContenido(e.target.value)}
          />
          <button class="btn btn-success me-2" onClick={guardarCambios}>
            💾 Enviar propuesta
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
