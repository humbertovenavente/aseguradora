import { createSignal, onMount } from "solid-js";
import {
  obtenerSolicitudesAtencion,
  aprobarSolicitudAtencion,
  rechazarSolicitudAtencion
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

  const manejarAprobacion = async (id) => {
    await aprobarSolicitudAtencion(id);
    await cargarSolicitudes();
  };

  const manejarRechazo = async (id) => {
    await rechazarSolicitudAtencion(id);
    await cargarSolicitudes();
  };

  onMount(() => {
    cargarSolicitudes();
  });

  return (
    <div class="container mt-4">
      <h2>Solicitudes de Atención Hospitalaria</h2>
      {solicitudes().length > 0 ? (
        <table class="table table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th>Afiliado</th>
              <th>Servicio</th>
              <th>Hospital</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes().map((solicitud) => (
              <tr>
                <td>{solicitud.afiliado?.nombre} {solicitud.afiliado?.apellido}</td>
                <td>{solicitud.servicio?.nombre}</td>
                <td>{solicitud.hospital?.nombre}</td>
                <td>Q{solicitud.monto}</td>
                <td>{solicitud.estado}</td>
                <td>
                  {solicitud.estado === "pendiente" ? (
                    <>
                      <button
                        class="btn btn-success btn-sm me-2"
                        onClick={() => manejarAprobacion(solicitud._id)}
                      >
                        Aprobar
                      </button>
                      <button
                        class="btn btn-danger btn-sm"
                        onClick={() => manejarRechazo(solicitud._id)}
                      >
                        Rechazar
                      </button>
                    </>
                  ) : (
                    <span>{solicitud.estado}</span>
                  )}
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
