import { createSignal, createEffect } from "solid-js";
import { getFichasTecnicas, deleteFichaTecnica, crearFichaTecnica } from "../services/fichaTecnicaService";
import { obtenerClientes } from "../services/clientesService";
import { obtenerSeguros } from "../services/seguroService";
import { A } from "@solidjs/router";

const FichaTecnicaView = () => {
    const [fichas, setFichas] = createSignal([]);
    const [clientes, setClientes] = createSignal([]);
    const [seguros, setSeguros] = createSignal([]);
    const [isAdding, setIsAdding] = createSignal(false);
    const [selectedCliente, setSelectedCliente] = createSignal(null);
    const [selectedSeguro, setSelectedSeguro] = createSignal(null);

    // Corrección: Separar función async de createEffect para evitar errores
    const cargarDatos = async () => {
        try {
            const fichasData = await getFichasTecnicas();
            setFichas(fichasData);
            
            const clientesData = await obtenerClientes();
            setClientes(clientesData);
            
            const segurosData = await obtenerSeguros();
            setSeguros(segurosData);
        } catch (error) {
            console.error("Error cargando datos:", error);
        }
    };

    createEffect(() => {
        cargarDatos();
    });

    const handleDelete = async (id) => {
        if (confirm("¿Seguro que deseas eliminar esta ficha técnica?")) {
            await deleteFichaTecnica(id);
            setFichas(fichas().filter(ficha => ficha._id !== id));
        }
    };

    const handleSave = async () => {
        if (!selectedCliente() || !selectedSeguro()) {
            alert("Debe seleccionar un cliente y un seguro.");
            return;
        }
    
        // Verificar si el cliente ya tiene una ficha
        const fichaExistente = fichas().find(ficha => ficha.clienteId._id === selectedCliente()._id);
        if (fichaExistente) {
            alert("Este cliente ya tiene una ficha técnica registrada.");
            return;
        }
    
        const nuevaFicha = {
            clienteId: selectedCliente()._id,
            usuarioId: selectedCliente().usuarioId?._id || "",  // Asociar el usuario del cliente si existe
            seguroId: selectedSeguro()._id,
            fechaCreacion: new Date(),
        };
    
        try {
            await crearFichaTecnica(nuevaFicha); //  Guardar en la base de datos
            await cargarDatos(); //  Recargar la lista de fichas desde la base de datos
            alert("Ficha técnica añadida correctamente.");
            setIsAdding(false);
        } catch (error) {
            console.error("Error al guardar la ficha técnica:", error);
            alert("Error al guardar la ficha técnica.");
        }
    };
    

    
    return (
        <div class="container">
            <h2 class="text-center">Fichas Técnicas</h2>
            
            {/* Botón para añadir nueva ficha */}
            <button class="btn btn-success mb-3" onClick={() => setIsAdding(true)}>Añadir Ficha Técnica</button>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>DPI</th>
                        <th>Afiliación de Seguro</th>
                        <th>Código de Seguro</th>
                        <th># Carnet de Seguro</th>
                        <th>Fecha Creada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {fichas().map(ficha => (
                        <tr key={ficha._id}>
                            <td>{ficha.clienteId?.nombre} {ficha.clienteId?.apellido}</td>
                            <td>{ficha.clienteId?.documento}</td>
                            <td>{ficha.clienteId?.numeroAfiliacion}</td>
                            <td>{ficha.seguroId?.codigo}</td>
                            <td>{ficha.usuarioId?._id}</td>
                            <td>{new Date(ficha.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" onClick={() => handleDelete(ficha._id)}>Borrar</button>
                                <A href={`/operadoras/fichastm/${ficha._id}`} class="btn btn-info btn-sm">Ver</A>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL PARA AÑADIR FICHA */}
            {isAdding() && (
                <div class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Añadir Ficha Técnica</h5>
                                <button type="button" class="btn-close" onClick={() => setIsAdding(false)}></button>
                            </div>
                            <div class="modal-body">
                                <label>Seleccionar Cliente:</label>
                                <select class="form-control mb-2" onChange={(e) => {
                                    const cliente = clientes().find(c => c._id === e.target.value);
                                    setSelectedCliente(cliente);
                                }}>
                                    <option value="">-- Seleccionar Cliente --</option>
                                    {clientes().map(cliente => (
                                        <option value={cliente._id}>{cliente.nombre} {cliente.apellido} - {cliente.documento}</option>
                                    ))}
                                </select>

                                {selectedCliente() && (
                                    <div>
                                        <p><strong>DPI:</strong> {selectedCliente().documento}</p>
                                        <p><strong>Afiliación de Seguro:</strong> {selectedCliente().numeroAfiliacion}</p>
                                        <p><strong># Carnet de Seguro:</strong> {selectedCliente().usuarioId?._id || "N/A"}</p>
                                    </div>
                                )}

                                <label>Seleccionar Seguro:</label>
                                <select class="form-control mb-2" onChange={(e) => {
                                    const seguro = seguros().find(s => s._id === e.target.value);
                                    setSelectedSeguro(seguro);
                                }}>
                                    <option value="">-- Seleccionar Seguro --</option>
                                    {seguros().map(seguro => (
                                        <option value={seguro._id}>{seguro.nombre} - {seguro.codigo}</option>
                                    ))}
                                </select>

                                {selectedSeguro() && (
                                    <div>
                                        <p><strong>Código de Seguro:</strong> {selectedSeguro().codigo}</p>
                                    </div>
                                )}
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-secondary" onClick={() => setIsAdding(false)}>Cancelar</button>
                                <button class="btn btn-success" onClick={handleSave}>Guardar Ficha</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* FONDO OSCURO DEL MODAL */}
            {isAdding() && <div class="modal-backdrop fade show"></div>}
        </div>
    );
};

export default FichaTecnicaView;
