import { useParams, useNavigate } from "@solidjs/router";
import { createResource, createSignal, createEffect, Show } from "solid-js";

import axios from "axios";

const fetchPropuesta = async (id) => {
  const res = await axios.get(`${window.location.origin}/api/moderacion/${id}`);
  return res.data;
};

export default function DraftView() {
  const params = useParams();
  const navigate = useNavigate();
  const [contenido, setContenido] = createSignal({});
  const [propuesta] = createResource(() => params.id, fetchPropuesta);

createEffect(() => {
    if(propuesta()){
        setContenido(propuesta().contenido);
    }
});

  const handleSubmit = async () => {
    try {
      await axios.put(`${window.location.origin}/api/moderacion/reenviar/${params.id}`, {
        contenido: contenido(),
      });
      alert("✅ Propuesta reenviada correctamente");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Error al reenviar propuesta");
    }
  };

  return (
    <div class="container mt-4">
      <h2>📄 Corregir propuesta rechazada</h2>

      <Show when={propuesta.loading}>
        <p>Cargando propuesta...</p>
      </Show>

      <Show when={propuesta()}>
        <p><strong>Página:</strong> {propuesta().pagina}</p>
        <p><strong>Motivo del rechazo:</strong> {propuesta().comentarioRechazo}</p>

        <label>Contenido (JSON):</label>
        <textarea
          class="form-control my-3"
          rows="10"
          value={JSON.stringify(contenido(), null, 2)}
          onInput={(e) => {
            try {
              setContenido(JSON.parse(e.currentTarget.value));
            } catch {
              // ignoramos errores de parsing por ahora
            }
          }}
        />

        <button class="btn btn-success" onClick={handleSubmit}>
          Reenviar propuesta
        </button>
      </Show>
    </div>
  );
}
