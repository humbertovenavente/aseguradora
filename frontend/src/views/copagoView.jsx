import { createSignal, onMount } from "solid-js";
import { obtenerCopagos, pagarCopago } from "../services/copagoService.js";

export default function CopagoView() {
    const [copagos, setCopagos] = createSignal([]);

    onMount(async () => {
        try {
            const data = await obtenerCopagos();
            setCopagos(data);
        } catch (error) {
            console.error("Error al obtener copagos:", error);
        }
    });

    const manejarPago = async (id) => {
        try {
            await pagarCopago(id);
            alert("Pago realizado con éxito.");
            setCopagos(copagos().map(c => c._id === id ? { ...c, estado: "pagado" } : c));
        } catch (error) {
            console.error("Error al procesar el pago:", error);
        }
    };

    return (
        <div class="container mt-4">
            <h2>Portal de Pagos</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Hospital</th>
                        <th>Póliza</th>
                        <th>Cobertura</th>
                        <th>Servicio</th>
                        <th>Costo Servicio</th>
                        <th>Copago</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {copagos().length > 0 ? (
                        copagos().map(copago => (
                            <tr key={copago._id}>
                                <td>{copago.cliente.nombre} {copago.cliente.apellido}</td>
                                <td>{copago.hospital.nombre}</td>
                                <td>{copago.poliza.nombre}</td>
                                <td>{copago.cobertura.porcentajeCobertura}%</td>
                                <td>{copago.servicio.nombre}</td>
                                <td>${copago.costoRealServicio.toFixed(2)}</td>
                                <td>${copago.montoCopago.toFixed(2)}</td>
                                <td>
                                    {copago.estado === "pagado" ? (
                                        <span class="text-success">Pagado</span>
                                    ) : (
                                        <span class="text-danger">Pendiente</span>
                                    )}
                                </td>
                                <td>
                                    {copago.estado !== "pagado" && (
                                        <button class="btn btn-success btn-sm" onClick={() => manejarPago(copago._id)}>
                                            Pagar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" class="text-center">No hay copagos pendientes.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
