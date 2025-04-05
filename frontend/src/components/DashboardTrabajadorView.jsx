import { createSignal, createResource, Show } from "solid-js";
import { obtenerDashboardTrabajador } from "../services/dashboardTrabajadorService";

export default function DashboardTrabajadorView() {
  const [idCliente, setIdCliente] = createSignal("");
  const [data, { refetch }] = createResource(idCliente, async (id) => {
    if (!id) return null;
    return await obtenerDashboardTrabajador(id);
  });

  return (
    <div>
      <h5>🧑‍💼 Dashboard del Cliente (para trabajador)</h5>

      <div class="mb-3">
        <label>🔍 Ingresar ID del cliente:</label>
        <input
          class="form-control"
          type="text"
          value={idCliente()}
          onInput={(e) => setIdCliente(e.target.value)}
        />
        <button class="btn btn-info mt-2" onClick={refetch}>
          Consultar Dashboard
        </button>
      </div>

      <Show when={data()} fallback={<p class="text-muted">Esperando búsqueda...</p>}>
        {(dashboard) => (
          <div class="mt-4">

            {/* Cliente */}
            <div class="card mb-3 shadow-sm">
              <div class="card-header bg-primary text-white">🧍 Cliente</div>
              <div class="card-body">
                <p><strong>Nombre:</strong> {dashboard().cliente?.nombre} {dashboard().cliente?.apellido}</p>
                <p><strong>Documento:</strong> {dashboard().cliente?.documento}</p>
                <p><strong>Fecha de Nacimiento:</strong> {new Date(dashboard().cliente?.fechaNacimiento).toLocaleDateString()}</p>
                <p><strong>Dirección:</strong> {dashboard().cliente?.direccion}</p>
              </div>
            </div>

            {/* Póliza */}
            <div class="card mb-3 shadow-sm">
              <div class="card-header bg-success text-white">📄 Póliza</div>
              <div class="card-body">
                <p><strong>Nombre:</strong> {dashboard().poliza?.nombre}</p>
                <p><strong>Costo:</strong> Q{dashboard().poliza?.costo}</p>
                <p><strong>Vigencia:</strong> {dashboard().poliza?.vigencia} días</p>
              </div>
            </div>

            {/* Cobertura */}
            <div class="card mb-3 shadow-sm">
              <div class="card-header bg-info text-white">🛡️ Cobertura</div>
              <div class="card-body">
                <p><strong>Tipo:</strong> {dashboard().cobertura?.tipo}</p>
                <p><strong>Detalles:</strong> {dashboard().cobertura?.detalles}</p>
              </div>
            </div>

            {/* Pagos */}
            <div class="card mb-3 shadow-sm">
              <div class="card-header bg-warning">💳 Pagos</div>
              <div class="card-body">
                {dashboard().pagos?.length > 0 ? (
                  dashboard().pagos.map(pago => (
                    <div>
                      <p><strong>Monto:</strong> Q{pago.pago}</p>
                      <p><strong>Fecha:</strong> {new Date(pago.fecha_pago).toLocaleDateString()}</p>
                      <hr />
                    </div>
                  ))
                ) : <p>Sin pagos registrados.</p>}
              </div>
            </div>

            {/* Citas */}
            <div class="card mb-3 shadow-sm">
              <div class="card-header bg-secondary text-white">📅 Citas</div>
              <div class="card-body">
                {dashboard().citas?.length > 0 ? (
                  dashboard().citas.map(cita => (
                    <div>
                      <p><strong>Servicio:</strong> {cita.idServicio?.nombre}</p>
                      <p><strong>Hospital:</strong> {cita.idHospital?.nombre}</p>
                      <p><strong>Fecha:</strong> {new Date(cita.fecha).toLocaleDateString()}</p>
                      <hr />
                    </div>
                  ))
                ) : <p>No hay citas registradas.</p>}
              </div>
            </div>

            {/* Hospitales */}
            <div class="card mb-3 shadow-sm">
              <div class="card-header bg-dark text-white">🏥 Hospitales con convenio activo</div>
              <div class="card-body">
                <ul>
                  {dashboard().hospitales.map(h => (
                    <li key={h._id}>{h.nombre}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Servicios */}
            <div class="card mb-3 shadow-sm">
              <div class="card-header bg-light">🛠️ Servicios disponibles</div>
              <div class="card-body">
                <ul>
                  {dashboard().servicios.map(s => (
                    <li key={s._id}>{s.nombre}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}
      </Show>
    </div>
  );
}
