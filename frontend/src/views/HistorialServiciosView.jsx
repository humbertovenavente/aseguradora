import { createSignal, onMount } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import {
  obtenerClientes,
  obtenerHistorialCliente,
  recalcularCopagoCliente,
  pagarCopagoCliente,
} from "../services/clientesService.js";

export default function HistorialServiciosView() {
  const params = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = createSignal(null);
  const [historialServicios, setHistorialServicios] = createSignal([]);

  onMount(async () => {
    const clientes = await obtenerClientes();
    const clienteEncontrado = clientes.find((c) => c._id === params.id);
    if (clienteEncontrado) {
      setCliente(clienteEncontrado);
    }

    const historial = await obtenerHistorialCliente(params.id);
    setHistorialServicios(historial);
  });

  // ✅ Función para pagar copago
  const manejarPago = async (historialId) => {
    const confirmacion = window.confirm("¿Seguro que deseas saldar la cuenta?");
    if (confirmacion) {
      try {
        await pagarCopagoCliente(params.id, historialId);
        alert("Pago realizado con éxito.");

        // 🔁 Recargar historial actualizado
        const historialActualizado = await obtenerHistorialCliente(params.id);
        setHistorialServicios(historialActualizado);
      } catch (error) {
        console.error("Error al procesar el pago:", error);
      }
    }
  };

  // ✅ Función para recalcular copagos
  const manejarRecalculoCopago = async () => {
    try {
      await recalcularCopagoCliente(params.id);
      alert("Copagos actualizados correctamente.");
      const historialActualizado = await obtenerHistorialCliente(params.id);
      setHistorialServicios(historialActualizado);
    } catch (error) {
      console.error("Error al recalcular copagos:", error);
    }
  };

  return (
    <div class="container mt-4">
      <button class="btn btn-secondary mb-3" onClick={() => navigate("/clientes")}>
        Volver
      </button>

      <h2>Historial de Servicios</h2>

      <button class="btn btn-primary mb-3" onClick={manejarRecalculoCopago}>
        Recalcular Copagos
      </button>

      {cliente() ? (
        <>
          <h4>
            {cliente().nombre} {cliente().apellido}
          </h4>
          <p>
            <strong>Documento:</strong> {cliente().documento}
          </p>
          <p>
            <strong>Póliza:</strong> {cliente().polizaNombre}
          </p>

          {historialServicios().length > 0 ? (
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>HOSPITAL</th>
                  <th>SERVICIO</th>
                  <th>FECHA</th>
                  <th>COSTO (HOSPITAL)</th>
                  <th>COSTO (ASEGURADORA)</th>
                  <th>COPAGO</th>
                  <th>ESTADO</th>
                  <th>ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {historialServicios().map((servicio, index) => (
                  <tr key={index}>
                    <td>{servicio.hospital?.nombre || "Desconocido"}</td>
                    <td>{servicio.servicio?.nombre || "Desconocido"}</td>
                    <td>{new Date(servicio.fechaServicio).toLocaleDateString()}</td>
                    <td>${servicio.costo}</td>
                    <td>${servicio.servicio?.precioAseguradora || "N/A"}</td>
                    <td>${servicio.copago}</td>
                    <td>
                      {servicio.estadoCopago === "pagado" ? (
                        <span class="text-success">Pagado</span>
                      ) : (
                        <span class="text-danger">Pendiente</span>
                      )}
                    </td>
                    <td>
                      {servicio.estadoCopago !== "pagado" && (
                        <button
                          class="btn btn-success btn-sm"
                          onClick={() => manejarPago(servicio._id)}
                        >
                          Pagar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay servicios registrados.</p>
          )}
        </>
      ) : (
        <p>Cargando información...</p>
      )}
    </div>
  );
}
