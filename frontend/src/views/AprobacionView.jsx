import { createSignal, onMount, For, Show } from "solid-js";
import API_URL from "../config";

const AprobacionView = () => {
  const [solicitudes, setSolicitudes] = createSignal([]);
  const [mensaje, setMensaje] = createSignal("");

  const cargarSolicitudes = async () => {
    try {
      const res = await fetch(`${API_URL}/solicitudes`);
      const data = await res.json();
      setSolicitudes(data);
    } catch (err) {
      console.error("Error cargando solicitudes:", err);
    }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const res = await fetch(`${API_URL}/solicitudes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (res.ok) {
        setMensaje(`Solicitud ${nuevoEstado} correctamente.`);
        cargarSolicitudes();
      } else {
        setMensaje("Error al actualizar estado");
      }
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

  onMount(cargarSolicitudes);

  const pendientes = () => solicitudes().filter((s) => s.estado === "pendiente");
  const aprobadas = () => solicitudes().filter((s) => s.estado === "aprobado");
  const rechazadas = () => solicitudes().filter((s) => s.estado === "rechazado");

  const Seccion = ({ titulo, color, icono, lista }) => (
    <div class="mb-4">
      <h4 class={`text-${color}`}>
        <i class={`me-2 bi bi-${icono}`}></i>
        {titulo}
      </h4>
      <Show when={lista().length > 0} fallback={<p>No hay solicitudes {titulo.toLowerCase()}.</p>}>
        <For each={lista()}>
          {(s, i) => (
            <div class="card mb-2 p-3">
              
              <p><b>Nombre:</b> {s.nombre}</p>
              <p><b>Aseguradora:</b> {s.aseguradora}</p>
              <p><b>Estado:</b> <span class={`text-${
                s.estado === "aprobado" ? "success" : s.estado === "rechazado" ? "danger" : "warning"
              }`}>{s.estado}</span></p>
              <Show when={s.estado === "pendiente"}>
                <div class="mt-2">
                  <button class="btn btn-success me-2" onClick={() => actualizarEstado(s._id, "aprobado")}>Aprobar</button>
                  <button class="btn btn-danger" onClick={() => actualizarEstado(s._id, "rechazado")}>Rechazar</button>
                </div>
              </Show>
            </div>
          )}
        </For>
      </Show>
    </div>
  );

  return (
    <div class="container mt-4">
      <h3>Historial de Solicitudes del Hospital y Farmacias</h3>
      {mensaje() && <div class="alert alert-info mt-3">{mensaje()}</div>}

      <Seccion titulo="Pendientes" color="warning" icono="exclamation-circle" lista={pendientes} />
      <Seccion titulo="Aprobadas" color="success" icono="check-circle" lista={aprobadas} />
      <Seccion titulo="Rechazadas" color="danger" icono="x-circle" lista={rechazadas} />
    </div>
  );
};

export default AprobacionView;