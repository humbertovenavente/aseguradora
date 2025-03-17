import { createSignal, createEffect } from "solid-js";
import { obtenerPolizas, eliminarPoliza } from "../services/polizasService";
import FormularioPoliza from "./FormularioPoliza";

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
                {/* Botón para abrir el modal (Agregar) */}
                <button className="btn btn-agregar" onClick={() => abrirModal(null)}>
                    <i className="fa fa-plus me-2"></i>
                </button>
            </div>

            {/* Modal para agregar o editar póliza */}
            {mostrarModal() && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{polizaEdit() ? "Editar Póliza" : "Agregar Nueva Póliza"}</h5>
                                <button type="button" className="btn-close" onClick={() => setMostrarModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <FormularioPoliza poliza={polizaEdit()} actualizarLista={actualizarLista} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabla de pólizas */}
            <div className="table-responsive mt-3">
                <table className="table table-striped table-bordered text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo de Cobertura</th>
                            <th>Cobertura</th>
                            <th>Seguro</th>
                            <th>Costo</th>
                            <th>Vigencia</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {polizas().map(poliza => (
                            <tr key={poliza._id}>
                                <td>{poliza.nombre}</td>
                                <td>{poliza.tipoCobertura}</td>
                                <td>{poliza.coberturaId ? `${poliza.coberturaId.nombre} - ${poliza.coberturaId.porcentajeCobertura}%` : "Sin cobertura"}</td>
                                <td>{poliza.id_seguro ? poliza.id_seguro.nombre : "Sin seguro"}</td>
                                <td>Q{poliza.costo}</td>
                                <td>{new Date(poliza.vigencia).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => abrirModal(poliza)}>
                                        Editar
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(poliza._id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}