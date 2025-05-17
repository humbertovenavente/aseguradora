import { createSignal, onMount } from "solid-js";
import {
  obtenerSolicitudesAtencion
} from "../services/solicitudAtencionService";

const SolicitudServiceView = () => {
  const [solicitudes, setSolicitudes] = createSignal([]);

  const cargarSolicitudes = async () => {
    try {
      const data = await obtenerSolicitudesAtencion();
      setSolicitudes(data);
    } catch (err) {
      console.error("Error cargando solicitudes:", err);
    }
  };

  onMount(() => {
    cargarSolicitudes();
  });

  return (
    <div class="container mt-4">
      <h2>Solicitudes de Atención Hospitalaria DOS</h2>
      {solicitudes().length > 0 ? (
        <table class="table table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th>Afiliado</th>
              <th>Servicio</th>
              <th>Hospital</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Autorización</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes().map((solicitud) => (
              <tr>
                <td>{solicitud.afiliado?.nombre} {solicitud.afiliado?.apellido}</td>
                <td>{solicitud.servicio?.nombre}</td>
                <td>{solicitud.hospital?.nombre}</td>
                <td>Q{solicitud.monto}</td>
                <td>
                  <span class={
                    solicitud.estado === "aprobada"
                      ? "text-success"
                      : solicitud.estado === "rechazada"
                      ? "text-danger"
                      : "text-warning"
                  }>
                    {solicitud.estado}
                  </span>
                </td>
                <td>
                  {solicitud.numeroAutorizacion || "—"} 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay solicitudes registradas.</p>
      )}
    </div>
  );
};

export default SolicitudServiceView;
