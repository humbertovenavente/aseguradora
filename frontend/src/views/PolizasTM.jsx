import { createSignal, createEffect } from "solid-js";
import { obtenerPolizas, eliminarPoliza } from "../services/polizasService";


export default function Polizas() {
    const [polizas, setPolizas] = createSignal([]);
    const [mostrarModal, setMostrarModal] = createSignal(false);
    const [polizaEdit, setPolizaEdit] = createSignal(null);

    createEffect(async () => {
        setPolizas(await obtenerPolizas());
    });

    // Abrir modal para agregar o editar
    const abrirModal = (poliza = null) => {
        setPolizaEdit(poliza); // Si es null, significa que estamos agregando
        setMostrarModal(true);
    };

    // Cerrar modal después de guardar o cancelar
    const actualizarLista = async () => {
        setPolizas(await obtenerPolizas());
        setMostrarModal(false); // Ocultar modal después de guardar o cancelar
    };

    // Eliminar una póliza
    const handleDelete = async (id) => {
        if (confirm("¿Seguro que deseas eliminar esta póliza?")) {
            await eliminarPoliza(id);
            setPolizas(await obtenerPolizas()); // Recargar la lista
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="fw-bold">Pólizas</h2>
            </div>



            {/* Tabla de pólizas */}
            <div className="table-responsive mt-3">
                <table className="table table-striped table-bordered text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Cobertura</th>
                            <th>Aseguradora</th>
                            <th>Costo</th>
                            <th>Vigencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {polizas().map(poliza => (
                            <tr key={poliza._id}>
                                <td>{poliza.nombre}</td>
                               
                                <td>{poliza.coberturaId ? `${poliza.coberturaId.nombre} - ${poliza.coberturaId.porcentajeCobertura}%` : "Sin cobertura"}</td>
                                <td>{poliza.id_seguro ? poliza.id_seguro.nombre : "Sin seguro"}</td>
                                <td>Q{poliza.costo}</td>
                                <td>{new Date(poliza.vigencia).toLocaleDateString()}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}