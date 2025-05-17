import { createSignal, onMount, For, Show } from "solid-js";
import API_URL from "../config"; // En config.ts, API_URL debe ser "http://localhost:8080"

const FARMACIA_API_URL = "http://localhost:5000"; // Para peticiones que se dirijan al backend de farmacia (si aplica)

const AprobacionView = () => {
  const [solicitudes, setSolicitudes] = createSignal([]);
  const [mensaje, setMensaje] = createSignal("");

  // Función que carga solicitudes de ambos endpoints y las combina
  const cargarSolicitudes = async () => {
    try {
      const [resHospital, resFarmacia] = await Promise.all([
        fetch(`${API_URL}/solicitudes/hospital`),
        fetch(`${API_URL}/solicitudes/farmacia`)
      ]);
      const dataHospital = await resHospital.json();
      const dataFarmacia = await resFarmacia.json();
      // Combinar ambas listas
      setSolicitudes([...dataHospital, ...dataFarmacia]);
    } catch (err) {
      console.error("Error cargando solicitudes:", err);
    }
  };

  // Función para deduplicar solicitudes (basada en codigoSolicitud para Farmacia, _id para Hospital)
  const deduplicarSolicitudes = () => {
    const unicos = [];
    const vistos = new Set();
    solicitudes().forEach(s => {
      const clave = (s.origen === "farmacia" && s.codigoSolicitud) ? s.codigoSolicitud : s._id;
      if (!vistos.has(clave)) {
        vistos.add(clave);
        unicos.push(s);
      }
    });
    return unicos;
  };

  // Función de actualización que determina el endpoint según el origen
  const actualizarEstado = async (solicitud, nuevoEstado) => {
    try {
      let endpoint = "";
      if (solicitud.origen === "hospital") {
        endpoint = `${API_URL}/solicitudes/hospital/${solicitud._id}`;
      } else if (solicitud.origen === "farmacia") {
        endpoint = `${API_URL}/solicitudes/farmacia/${solicitud._id}`;
      }
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (!res.ok) {
        setMensaje("Error al actualizar estado en Aseguradora");
        return;
      }
      // Si es solicitud de farmacia y se aprueba, actualizar también en Farmacia mediante codigoSolicitud
      if (solicitud.origen === "farmacia" && nuevoEstado === "aprobado" && solicitud.codigoSolicitud) {
        try {
          const resFarmacia = await fetch(
            `${FARMACIA_API_URL}/farmacia/solicitudes/codigo/${solicitud.codigoSolicitud}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ estado: nuevoEstado }),
            }
          );
          if (!resFarmacia.ok) {
            console.error("Error al actualizar la solicitud en Farmacia");
          }
        } catch (err) {
          console.error("Error al actualizar en Farmacia:", err.message);
        }
      }
      setMensaje(`Solicitud ${nuevoEstado} correctamente.`);
      cargarSolicitudes();
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      setMensaje("Error al actualizar estado");
    }
  };

  onMount(cargarSolicitudes);

  // Funciones de filtrado por estado
  const pendientes = () => deduplicarSolicitudes().filter(s => s.estado === "pendiente");
  const aprobadas = () => deduplicarSolicitudes().filter(s => s.estado === "aprobado");
  const rechazadas = () => deduplicarSolicitudes().filter(s => s.estado === "rechazado");

  const Seccion = ({ titulo, color, icono, lista }) => (
    <div class="mb-4">
      <h4 class={`text-${color}`}>
        <i class={`me-2 bi bi-${icono}`}></i>
        {titulo}
      </h4>
      <Show when={lista().length > 0} fallback={<p>No hay solicitudes {titulo.toLowerCase()}.</p>}>
        <For each={lista()}>
          {s => (
            <div class="card mb-2 p-3">
              <p><b>Nombre:</b> {s.nombre}</p>
              <p><b>Aseguradora:</b> {s.aseguradoraNombre || s.aseguradora || "-"}</p>
              <p><b>Origen:</b> {s.origen || "-"}</p>
              <p>
                <b>Estado:</b>{" "}
                <span class={`text-${
                  s.estado === "aprobado" ? "success" : 
                  s.estado === "rechazado" ? "danger" : "warning"
                }`}>
                  {s.estado}
                </span>
              </p>
              <Show when={s.estado === "pendiente"}>
                <div class="mt-2">
                  <button class="btn btn-success me-2" onClick={() => actualizarEstado(s, "aprobado")}>
                    Aprobar
                  </button>
                  <button class="btn btn-danger" onClick={() => actualizarEstado(s, "rechazado")}>
                    Rechazar
                  </button>
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
      <h3>Historial de Solicitudes del Hospital y Farmacias TRES</h3>
      {mensaje() && <div class="alert alert-info mt-3">{mensaje()}</div>}
      <Seccion titulo="Pendientes" color="warning" icono="exclamation-circle" lista={pendientes} />
      <Seccion titulo="Aprobadas" color="success" icono="check-circle" lista={aprobadas} />
      <Seccion titulo="Rechazadas" color="danger" icono="x-circle" lista={rechazadas} />
    </div>
  );
};

export default AprobacionView;
