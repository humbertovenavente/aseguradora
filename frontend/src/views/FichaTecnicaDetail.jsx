import { createSignal, createEffect } from "solid-js";
import { getFichaTecnicaById, updateFichaTecnica } from "../services/fichaTecnicaService";
import { getHistorialCliente, actualizarCliente } from "../services/clientesService";
import { useParams, useNavigate } from "@solidjs/router";

const FichaTecnicaDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [ficha, setFicha] = createSignal(null);
    const [historial, setHistorial] = createSignal([]);
    const [isEditing, setIsEditing] = createSignal(false);

    // Cargar ficha técnica
    createEffect(async () => {
        const data = await getFichaTecnicaById(params.id);
        setFicha(data);
    });

    // Cargar historial de servicios por cliente
    createEffect(async () => {
        if (ficha() && ficha().clienteId?._id) {
            const historialData = await getHistorialCliente(ficha().clienteId._id);
            setHistorial(historialData); // ✅ Este debe ser un array
        }
    });

    const handleSave = async () => {
        try {
            const clienteActualizado = {
                nombre: ficha().clienteId?.nombre,
                apellido: ficha().clienteId?.apellido,
                documento: ficha().clienteId?.documento,
                telefono: ficha().clienteId?.telefono,
                fechaNacimiento: ficha().clienteId?.fechaNacimiento,
                direccion: ficha().clienteId?.direccion,
                numeroAfiliacion: ficha().clienteId?.numeroAfiliacion
            };

            await actualizarCliente(ficha().clienteId?._id, clienteActualizado);
            await updateFichaTecnica(params.id, ficha());

            alert("Ficha y cliente actualizados correctamente");
            setIsEditing(false);
        } catch (error) {
            console.error("Error al actualizar la ficha técnica o cliente:", error);
        }
    };

    return (
        <div class="container">
            <h2 class="text-center">Detalle de la Ficha Técnica</h2>

            {ficha() ? (
                <div class="card mb-4">
                    <div class="card-body">
                        <h4>{ficha().clienteId?.nombre} {ficha().clienteId?.apellido}</h4>
                        <p><strong>DPI:</strong> {ficha().clienteId?.documento}</p>
                        <p><strong>Teléfono:</strong> {ficha().clienteId?.telefono || "No disponible"}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {ficha().clienteId?.fechaNacimiento ? new Date(ficha().clienteId?.fechaNacimiento).toLocaleDateString() : "No disponible"}</p>
                        <p><strong>Dirección:</strong> {ficha().clienteId?.direccion || "No disponible"}</p>
                        <p><strong>Afiliación de Seguro:</strong> {ficha().clienteId?.numeroAfiliacion}</p>
                        <p><strong>Código de Seguro:</strong> {ficha().seguroId?.codigo}</p>
                        <p><strong># Carnet de Seguro:</strong> {ficha().usuarioId?._id}</p>
                        <p><strong>Correo:</strong> {ficha().usuarioId?.correo}</p>
                        <p><strong>Fecha Creación:</strong> {new Date(ficha().fechaCreacion).toLocaleDateString()}</p>

                        <button class="btn btn-primary me-2" onClick={() => setIsEditing(true)}>Editar</button>
                        <button class="btn btn-secondary" onClick={() => navigate("/fichastecnicas")}>Regresar</button>
                    </div>
                </div>
            ) : (
                <p>Cargando ficha técnica...</p>
            )}

            {/* HISTORIAL DE SERVICIOS */}
            <div>
                <h5 class="mb-3">Historial de Servicios</h5>
                {historial().length > 0 ? (
                    <ul class="list-group mb-4">
                        {historial().map((servicio) => (
                            <li class="list-group-item" key={servicio._id}>
                                <strong>{servicio.servicio?.nombre || "Servicio"}</strong> - {new Date(servicio.fechaServicio).toLocaleDateString()}<br />
                                <em>{servicio.servicio?.descripcion}</em><br />
                                <strong>Hospital:</strong> {servicio.hospital?.nombre || "No especificado"}<br />
                                <strong>Costo:</strong> Q{servicio.costo} | <strong>Copago:</strong> Q{servicio.copago} ({servicio.estadoCopago})<br />
                                <strong>Resultados:</strong> {servicio.resultados}<br />
                                <strong>Comentarios:</strong> {servicio.comentarios}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay servicios registrados.</p>
                )}
            </div>

            {/* MODAL DE EDICIÓN */}
            {isEditing() && ficha() && (
                <div class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Editar Ficha Técnica</h5>
                                <button type="button" class="btn-close" onClick={() => setIsEditing(false)}></button>
                            </div>
                            <div class="modal-body">
                                {/* Campos editables */}
                                <label>Nombre:</label>
                                <input type="text" class="form-control mb-2" value={ficha().clienteId?.nombre}
                                    onInput={(e) => setFicha({ ...ficha(), clienteId: { ...ficha().clienteId, nombre: e.target.value } })} />

                                <label>Apellido:</label>
                                <input type="text" class="form-control mb-2" value={ficha().clienteId?.apellido}
                                    onInput={(e) => setFicha({ ...ficha(), clienteId: { ...ficha().clienteId, apellido: e.target.value } })} />

                                <label>DPI:</label>
                                <input type="text" class="form-control mb-2" value={ficha().clienteId?.documento}
                                    onInput={(e) => setFicha({ ...ficha(), clienteId: { ...ficha().clienteId, documento: e.target.value } })} />

                                <label>Teléfono:</label>
                                <input type="text" class="form-control mb-2" value={ficha().clienteId?.telefono}
                                    onInput={(e) => setFicha({ ...ficha(), clienteId: { ...ficha().clienteId, telefono: e.target.value } })} />

                                <label>Fecha de Nacimiento:</label>
                                <input type="date" class="form-control mb-2"
                                    value={ficha().clienteId?.fechaNacimiento 
                                        ? new Date(ficha().clienteId?.fechaNacimiento).toISOString().split('T')[0] 
                                        : ""}
                                    onInput={(e) => setFicha({ 
                                        ...ficha(), 
                                        clienteId: { ...ficha().clienteId, fechaNacimiento: e.target.value } 
                                    })}
                                />

                                <label>Dirección:</label>
                                <input type="text" class="form-control mb-2" value={ficha().clienteId?.direccion}
                                    onInput={(e) => setFicha({ ...ficha(), clienteId: { ...ficha().clienteId, direccion: e.target.value } })} />

                                <label>Afiliación de Seguro:</label>
                                <input type="text" class="form-control mb-2" value={ficha().clienteId?.numeroAfiliacion}
                                    onInput={(e) => setFicha({ ...ficha(), clienteId: { ...ficha().clienteId, numeroAfiliacion: e.target.value } })} />

                                <label>Código de Seguro:</label>
                                <input type="text" class="form-control mb-2" value={ficha().seguroId?.codigo}
                                    onInput={(e) => setFicha({ ...ficha(), seguroId: { ...ficha().seguroId, codigo: e.target.value } })} />

                                <label>Correo:</label>
                                <input type="text" class="form-control mb-2" value={ficha().usuarioId?.correo}
                                    onInput={(e) => setFicha({ ...ficha(), usuarioId: { ...ficha().usuarioId, correo: e.target.value } })} />
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancelar</button>
                                <button class="btn btn-success" onClick={handleSave}>Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isEditing() && <div class="modal-backdrop fade show"></div>}
        </div>
    );
};

export default FichaTecnicaDetail;
