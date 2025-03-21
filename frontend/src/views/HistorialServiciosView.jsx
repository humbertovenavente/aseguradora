import { createSignal, onMount } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import { obtenerClientes, obtenerHistorialCliente, recalcularCopagoCliente } from "../services/clientesService.js";

export default function HistorialServiciosView() {
    const params = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = createSignal(null);
    const [historialServicios, setHistorialServicios] = createSignal([]);

    onMount(async () => {
        const clientes = await obtenerClientes();
        const clienteEncontrado = clientes.find(c => c._id === params.id);
        if (clienteEncontrado) {
            setCliente(clienteEncontrado);
        }

        // Obtener historial de servicios del cliente
        const historial = await obtenerHistorialCliente(params.id);
        setHistorialServicios(historial);
    });

    // Función para recalcular copagos
    const manejarRecalculoCopago = async () => {
        try {
            await recalcularCopagoCliente(params.id);
            alert("Copagos actualizados correctamente.");
            // Volver a cargar historial de servicios actualizado
            const historialActualizado = await obtenerHistorialCliente(params.id);
            setHistorialServicios(historialActualizado);
        } catch (error) {
            console.error(" Error al recalcular copagos:", error);
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
                    <h4>{cliente().nombre} {cliente().apellido}</h4>
                    <p><strong>Documento:</strong> {cliente().documento}</p>
                    <p><strong>Póliza:</strong> {cliente().polizaNombre}</p>

                    {historialServicios().length > 0 ? (
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Hospital</th>
                                    <th>Servicio</th>
                                    <th>Fecha</th>
                                    <th>Costo (Hospital)</th>
                                    <th>Costo (Aseguradora)</th>
                                    <th>Copago</th>
                                    <th>Comentarios</th>
                                    <th>Resultados</th>
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
                                        <td>{servicio.comentarios}</td>
                                        <td>{servicio.resultados}</td>
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
