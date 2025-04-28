import { createResource, Show } from "solid-js";
import { obtenerHistorialServicios, obtenerCitasPaciente, obtenerRecetasPaciente, buscarClientePorUsuarioId } from "../services/pacienteService";

function PerfilPaciente() {
  const usuarioId = localStorage.getItem("userId");

  const [cliente] = createResource(
    () => usuarioId,
    (id) => id ? buscarClientePorUsuarioId(id) : Promise.resolve(null)
  );

  const [historial] = createResource(
    () => cliente()?._id,
    (id) => id ? obtenerHistorialServicios(id) : Promise.resolve([])
  );

  const [citas] = createResource(
    () => cliente()?. _id,
    (id) => id ? obtenerCitasPaciente(id) : Promise.resolve([])
  );

  const [recetas] = createResource(
    () => cliente()?. _id,
    (id) => id ? obtenerRecetasPaciente(id) : Promise.resolve([])
  );

  return (
    <div class="container my-5">
      <h1 class="text-center mb-5 text-primary">Mi Perfil Médico</h1>

      <Show when={cliente.loading}>
        <div class="text-center text-secondary my-5">Cargando perfil médico...</div>
      </Show>

      <Show when={cliente()}>
        <div>

          {/* Historial de Servicios */}
          <section class="mb-5">
            <h2 class="text-center text-success mb-4">Historial de Servicios</h2>
            {historial.loading && <p class="text-center text-muted">Cargando historial...</p>}
            {historial.error && <p class="text-center text-danger">Error al cargar historial.</p>}
            {historial() && historial().length === 0 && <p class="text-center text-muted">No hay historial registrado.</p>}
            {historial() && (
              <div class="row g-4">
                {historial().map((servicio) => (
                  <div class="col-12 col-md-6 col-lg-4" key={servicio._id}>
                    <div class="card h-100 shadow-sm">
                      <div class="card-body text-center">
                        <h5 class="card-title">{servicio.hospital?.nombre || "Hospital desconocido"}</h5>
                        <p class="card-text">{servicio.servicio?.nombre || "Servicio desconocido"}</p>
                        <p class="card-text"><small class="text-muted">Fecha: {new Date(servicio.fechaServicio).toLocaleDateString()}</small></p>
                        <p class="card-text">Costo: Q{servicio.costo}</p>
                        <p class="card-text">Copago: Q{servicio.copago}</p>
                        <p class="card-text">Estado Copago: {servicio.estadoCopago}</p>
                        {servicio.resultados && <p class="card-text"><small class="text-muted">Resultados: {servicio.resultados}</small></p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Citas */}
          <section class="mb-5">
            <h2 class="text-center text-success mb-4">Mis Citas</h2>
            {citas.loading && <p class="text-center text-muted">Cargando citas...</p>}
            {citas.error && <p class="text-center text-danger">Error al cargar citas.</p>}
            {citas() && citas().length === 0 && <p class="text-center text-muted">No hay citas registradas.</p>}
            {citas() && (
              <div class="row g-4">
                {citas().map((cita) => (
                  <div class="col-12 col-md-6 col-lg-4" key={cita._id}>
                    <div class="card h-100 shadow-sm">
                      <div class="card-body text-center">
                        <h5 class="card-title">{cita.idHospital?.nombre || "Hospital desconocido"}</h5>
                        <p class="card-text">{cita.idServicio?.nombre || "Servicio desconocido"}</p>
                        <p class="card-text"><small class="text-muted">Fecha: {new Date(cita.fecha).toLocaleDateString()}</small></p>
                        <p class="card-text">Motivo: {cita.motivo || "No especificado"}</p>
                        <p class="card-text">Estado: {cita.estado}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>



        </div>
      </Show>
    </div>
  );
}

export default PerfilPaciente;
