import { createSignal, onMount, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} from "../services/clientesService.js";
import { obtenerPolizas } from "../services/polizasService.js";

const ClientesView = () => {
    const [clientes, setClientes] = createSignal([]);
    const [polizas, setPolizas] = createSignal([]);
    const [showModal, setShowModal] = createSignal(false);
    const [isEdit, setIsEdit] = createSignal(false);
    const navigate = useNavigate();

    const [usuarioActual, setUsuarioActual] = createSignal({
      correo: "",
      contrasena: "",
      rol_id: "67d652411d30a899ff50a40e"
    });

    const [clienteActual, setClienteActual] = createSignal({
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        documento: "",
        fechaNacimiento: "",
        direccion: "",
        numeroAfiliacion: "",
        polizaId: "",
        polizaNombre: "",
        fechaVencimiento: "",
        estadoPago: false,
        historialServicios: []
    });

    onMount(async () => {
        await cargarClientes();
        await cargarPolizas();
    });

    const cargarClientes = async () => {
        try {
            const data = await obtenerClientes();
            console.log("📥 Clientes recibidos:", data);
            setClientes(data);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
        }
    };

    const cargarPolizas = async () => {
        try {
            const data = await obtenerPolizas();
            setPolizas(data);
        } catch (error) {
            console.error("Error al obtener pólizas:", error);
        }
    };

    const abrirModalCrear = () => {
        setIsEdit(false);
        setClienteActual({
            nombre: "",
            apellido: "",
            correo: "",
            contrasena: "",
            documento: "",
            fechaNacimiento: "",
            direccion: "",
            numeroAfiliacion: "",
            polizaId: "",
            polizaNombre: "",
            fechaVencimiento: "",
            estadoPago: false,
            historialServicios: []
        });

        setShowModal(true);
    };

    const abrirModalEditar = (cliente) => {
        setIsEdit(true);
        setClienteActual({ ...cliente });

        setUsuarioActual({
            correo: cliente.usuarioId?.correo || "", 
            contrasena: cliente.usuarioId?.contrasena || "",
            rol_id: "67d652411d30a899ff50a40e"
        });

        setShowModal(true);
    };

    const guardarCliente = async (e) => {
        e.preventDefault();
        try {
            const clienteData = { ...clienteActual() };
            const usuarioData = { ...usuarioActual() };

            console.log("📤 Enviando datos:", { ...clienteData, ...usuarioData });

            if (isEdit()) {
                await actualizarCliente(clienteActual()._id, { ...clienteData, ...usuarioData });
            } else {
                await crearCliente({ ...clienteData, ...usuarioData });
            }

            setShowModal(false);
            await cargarClientes();
        } catch (error) {
            console.error(" Error al guardar cliente:", error);
        }
    };

    const handleEliminar = async (id) => {
        if (confirm("¿Estás seguro de eliminar este cliente?")) {
            try {
                await eliminarCliente(id);
                await cargarClientes();
            } catch (error) {
                console.error("Error al eliminar cliente:", error);
            }
        }
    };

    const handleChange = (campo, valor) => {
        setClienteActual({ ...clienteActual(), [campo]: valor });
    };

    return (
        <div class="container mt-4">
            <h2 class="mb-3">Clientes</h2>
            <button class="btn btn-primary mb-3" onClick={abrirModalCrear}>
                Agregar Cliente
            </button>

            {/* Tabla de clientes */}
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Documento</th>
                        <th>Fecha de nacimiento</th>
                        <th>Póliza</th>
                        <th>Vencimiento</th>
                        <th>Estado Pago</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes().map((cli) => (
                        <tr key={cli._id}>
                            <td>{cli.nombre}</td>
                            <td>{cli.apellido}</td>
                            <td>{cli.usuarioId?.correo || "Sin correo"}</td>
                            <td>{cli.documento}</td>
                            <td>{cli.fechaNacimiento}</td>
                            <td>{cli.polizaNombre}</td>
                            <td>{cli.fechaVencimiento && new Date(cli.fechaVencimiento).toLocaleDateString()}</td>
                            <td>{cli.estadoPago ? "Pagado" : "No pagado"}</td>
                            <td>
                                <button class="btn btn-warning btn-sm me-2" onClick={() => abrirModalEditar(cli)}>
                                    Editar
                                </button>
                                <button class="btn btn-danger btn-sm me-2" onClick={() => handleEliminar(cli._id)}>
                                    Eliminar
                                </button>
                                <button 
    class="btn btn-info btn-sm" 
    onClick={() => navigate(`/historial-servicios/${cli._id}`)}
>
    Ver Historial
</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para crear/editar */}
      <Show when={showModal()}>
      <div class="modal fade show d-block" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <form onSubmit={guardarCliente}>
                <div class="modal-header">
                  <h5 class="modal-title">
                    {isEdit() ? "Editar Cliente" : "Nuevo Cliente"}
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div class="modal-body">
                  {/* Datos básicos del cliente */}
                  <div class="mb-3">
                    <label class="form-label">Nombre</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      value={clienteActual().nombre}
                      onInput={(e) => handleChange("nombre", e.target.value)}
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Apellido</label>
                    <input
                      type="text"
                      class="form-control"
                      value={clienteActual().apellido}
                      onInput={(e) => handleChange("apellido", e.target.value)}
                    />
                    </div>
                    <div class="mb-3">
                    <label class="form-label">Correo</label>
                    <input
  type="text"
  class="form-control"
  value={usuarioActual().correo}  
  onInput={(e) => setUsuarioActual({ ...usuarioActual(), correo: e.target.value })}
  required
/>
</div>
<div class="mb-3">
<label class="form-label">Contrasena</label>
<input
  type="password"
  class="form-control"
  value={usuarioActual().contrasena}  
  onInput={(e) => setUsuarioActual({ ...usuarioActual(), contrasena: e.target.value })}
  required
/>
</div>
                  <div class="mb-3">
                    <label class="form-label">Documento</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      value={clienteActual().documento}
                      onInput={(e) => handleChange("documento", e.target.value)}
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Fecha nacimiento</label>
                    <input
                     type="date"
                      class="form-control"
                      required
                      value={clienteActual().fechaNacimiento}
                      onInput={(e) => handleChange("fechaNacimiento", e.target.value)}
                    />

                  <div class="mb-3">
                    <label class="form-label">Direccion</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      value={clienteActual().direccion}
                      onInput={(e) => handleChange("direccion", e.target.value)}
                    />
                  </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Número de Afiliación</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      value={clienteActual().numeroAfiliacion}
                      onInput={(e) => handleChange("numeroAfiliacion", e.target.value)}
                    />
                  </div>

                  {/* Dropdown para seleccionar la póliza */}
                  <div class="mb-3">
  <label class="form-label">Póliza</label>
  <select
  value={clienteActual().polizaId || ""}
  onChange={(e) => {
    const selectedId = e.target.value;
    // Busca la póliza seleccionada
    const pol = polizas().find(p => p._id === selectedId);
    if (pol) {
      handleChange("polizaId", pol._id);
      handleChange("polizaNombre", pol.nombre);  // <--- Se asigna el nombre
    }
  }}
>
  <option value="">Seleccione una póliza</option>
  {polizas().map(pol => (
    <option value={pol._id}>
      {pol.nombre} ({pol.tipoCobertura})
    </option>
  ))}
</select>

</div>


                  <div class="mb-3">
                    <label class="form-label">Fecha de Vencimiento</label>
                    <input
                      type="date"
                      class="form-control"
                      value={clienteActual().fechaVencimiento?.slice(0, 10)}
                      onInput={(e) => handleChange("fechaVencimiento", e.target.value)}
                    />
                  </div>
                  <div class="form-check mb-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={clienteActual().estadoPago}
                      onChange={(e) => handleChange("estadoPago", e.target.checked)}
                    />
                    <label class="form-check-label">¿Pagos al día?</label>
                  </div>

                  <hr />
                 
                  
                
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" class="btn btn-primary">
                    {isEdit() ? "Actualizar" : "Guardar"}
                  </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Show>
        </div>
    );
};

export default ClientesView;
