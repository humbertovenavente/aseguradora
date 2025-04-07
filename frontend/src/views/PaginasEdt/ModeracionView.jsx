import { createSignal, createResource, For } from "solid-js";
import { obtenerPropuestasPorEstado, aprobarPropuesta, rechazarPropuesta } from "../../services/moderacionService";

export default function ModeracionView() {
  const [comentarios, setComentarios] = createSignal({});
  const [propuestas, { refetch }] = createResource(() => obtenerPropuestasPorEstado("pendiente"));
  

  const handleRechazar = async (id) => {
    const comentario = comentarios()[id] || "";
    if (!comentario) return alert("Debes escribir un comentario de rechazo");
    await rechazarPropuesta(id, comentario);
    refetch();
  };

  const handleAprobar = async (id) => {
    await aprobarPropuesta(id);
    refetch();
  };

  return (
    <div class="container mt-4">
      <h2>📋 Moderación de Contenido</h2>
      <table class="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>Página</th>
            <th>Tipo</th>
            <th>Contenido</th>
            <th>Editor</th>
            <th>Comentario de rechazo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        <For each={propuestas()}>
  {(p) => (
    <tr>
      <td>{p.pagina}</td> {/* Antes: p.nombrePagina */}
      <td>Edición</td>    {/* Puedes dejarlo fijo si no usás "tipo" aún */}
      <td style={{ "max-width": "300px", "white-space": "pre-wrap", "overflow-y": "auto", "max-height": "200px" }}>
  <For each={Object.entries(p.contenido).filter(([clave]) => !clave.includes("_id") && clave !== "creadoPor")}>
    {([clave, valor]) => (
      <div>
        <strong>{clave}:</strong>{" "}
        {Array.isArray(valor)
          ? valor.map((v) =>
              typeof v === "object"
                ? Object.entries(v)
                    .filter(([k]) => !k.includes("_id")) // 👉 Oculta _id dentro de objetos
                    .map(([k, val]) => `${k}: ${val}`)
                    .join(" | ")
                : v
            ).join(" • ")
          : valor?.toString()}
      </div>
    )}
  </For>
</td>



      <td>{p.creadoPor || "N/A"}</td> {/* Solo si tenés usuario */}
      <td>
        <input
          class="form-control"
          type="text"
          placeholder="Escribe comentario..."
          value={comentarios()[p._id] || ""}
          onInput={(e) =>
            setComentarios({
              ...comentarios(),
              [p._id]: e.currentTarget.value,
            })
          }
        />
      </td>
      <td>
        <button class="btn btn-success btn-sm me-1" onClick={() => handleAprobar(p._id)}>✅</button>
        <button class="btn btn-danger btn-sm" onClick={() => handleRechazar(p._id)}>❌</button>
      </td>
    </tr>
  )}
</For>

        </tbody>
      </table>
    </div>
  );
}
