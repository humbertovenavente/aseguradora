import { createSignal, onMount, Show } from "solid-js";
import {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} from "../services/clientesService";

const ClientesView = () => {
  // Lista de clientes
  const [clientes, setClientes] = createSignal([]);
  
  // Controla si mostramos el modal
  const [showModal, setShowModal] = createSignal(false);
  
  // Indica si estamos creando o editando
  const [isEdit, setIsEdit] = createSignal(false);
  
  // Datos del cliente actual (para crear/editar)
  const [clienteActual, setClienteActual] = createSignal({
    nombre: "",
    apellido: "",
    documento: "",
    telefono: "",
    email: "",
    fechaNacimiento: "",
    direccion: "",
    numeroAfiliacion: "",
    tipoPoliza: "70%",
    porcentajeCobertura: 70,
    fechaVencimiento: "",
    estadoPago: false,
    montoMinimoCobertura: 250,
    historialServicios: []
  });

  // Agregar un servicio vacío
const addService = () => {
    const copia = { ...clienteActual() };
    copia.historialServicios.push({
      hospital: "",
      servicio: "",
      fechaServicio: new Date().toISOString(),
      costo: 0,
      copago: 0,
      comentarios: "",
      resultados: "",
      estadoAutorizacion: "Pendiente",
      numeroAutorizacion: ""
    });
    setClienteActual(copia);
  };
  
  // Actualizar un campo de un servicio en particular
  const updateService = (index, field, value) => {
    const copia = { ...clienteActual() };
    copia.historialServicios[index][field] = value;
    setClienteActual(copia);
  };
  
  // Eliminar un servicio del historial
  const removeService = (index) => {
    const copia = { ...clienteActual() };
    copia.historialServicios.splice(index, 1);
    setClienteActual(copia);
  };
  
  // Cargar la lista de clientes al montar
  onMount(async () => {
    await cargarClientes();
  });

  // Función para obtener clientes desde la API
  const cargarClientes = async () => {
    try {
      const data = await obtenerClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  // Abrir modal para CREAR
  const abrirModalCrear = () => {
    setIsEdit(false);
    setClienteActual({
      nombre: "",
      apellido: "",
      documento: "",
      telefono: "",
      email: "",
      fechaNacimiento: "",
      direccion: "",
      numeroAfiliacion: "",
      tipoPoliza: "70%",
      porcentajeCobertura: 70,
      fechaVencimiento: "",
      estadoPago: false,
      montoMinimoCobertura: 250,
      historialServicios: []
    });
    setShowModal(true);
  };

  // Abrir modal para EDITAR
  const abrirModalEditar = (cliente) => {
    setIsEdit(true);
    setClienteActual({ ...cliente });
    setShowModal(true);
  };

  // Guardar (crear o actualizar)
  const guardarCliente = async (e) => {
    e.preventDefault();
    try {
      if (isEdit()) {
        // Editar
        await actualizarCliente(clienteActual()._id, clienteActual());
      } else {
        // Crear
        await crearCliente(clienteActual());
      }
      setShowModal(false);
      await cargarClientes();
    } catch (error) {
      console.error("Error al guardar cliente:", error);
    }
  };

  // Eliminar un cliente
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

  // Manejador de cambios de campo
  const handleChange = (campo, valor) => {
    setClienteActual({ ...clienteActual(), [campo]: valor });
  };

  // Ajustar porcentajeCobertura cuando se cambia tipoPoliza
  const handleTipoPolizaChange = (valor) => {
    const porcentaje = valor === "90%" ? 90 : 70;
    setClienteActual({
      ...clienteActual(),
      tipoPoliza: valor,
      porcentajeCobertura: porcentaje
    });
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
      <th>Documento</th>
      <th>Tipo Póliza</th>
      <th>Vencimiento</th>
      <th>Estado Pago</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {clientes().map((cli) => (
      <>
        <tr key={cli._id}>
          <td>{cli.nombre} {cli.apellido}</td>
          <td>{cli.documento}</td>
          <td>{cli.tipoPoliza} ({cli.porcentajeCobertura}%)</td>
          <td>
            {cli.fechaVencimiento &&
              new Date(cli.fechaVencimiento).toLocaleDateString()}
          </td>
          <td>{cli.estadoPago ? "Sí" : "No"}</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              onClick={() => abrirModalEditar(cli)}
            >
              Editar
            </button>
            <button
              class="btn btn-danger btn-sm"
              onClick={() => handleEliminar(cli._id)}
            >
              Eliminar
            </button>
          </td>
        </tr>

        {/* Mostrar historial de servicios solo si el cliente tiene pagos al día y hay servicios registrados */}
        {cli.estadoPago && cli.historialServicios && cli.historialServicios.length > 0 && (
          <tr key={`${cli._id}-historial`}>
            <td colSpan="6">
              <h6>Historial de Servicios</h6>
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th>Hospital</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Costo</th>
                    <th>Copago</th>
                    <th>Comentarios</th>
                  </tr>
                </thead>
                <tbody>
                  {cli.historialServicios.map((servicio, index) => (
                    <tr key={index}>
                      <td>{servicio.hospital}</td>
                      <td>{servicio.servicio}</td>
                      <td>{new Date(servicio.fechaServicio).toLocaleDateString()}</td>
                      <td>{servicio.costo}</td>
                      <td>{servicio.copago}</td>
                      <td>{servicio.comentarios}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        )}
      </>
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
                  {/* Campos del cliente */}
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
                    <label class="form-label">Número de Afiliación</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      value={clienteActual().numeroAfiliacion}
                      onInput={(e) =>
                        handleChange("numeroAfiliacion", e.target.value)
                      }
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Tipo de Póliza</label>
                    <select
                      class="form-select"
                      value={clienteActual().tipoPoliza}
                      onChange={(e) => handleTipoPolizaChange(e.target.value)}
                    >
                      <option value="70%">70%</option>
                      <option value="90%">90%</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Fecha de Vencimiento</label>
                    <input
                      type="date"
                      class="form-control"
                      value={clienteActual().fechaVencimiento?.slice(0, 10)}
                      onInput={(e) =>
                        handleChange("fechaVencimiento", e.target.value)
                      }
                    />
                  </div>
                  <div class="form-check mb-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={clienteActual().estadoPago}
                      onChange={(e) =>
                        handleChange("estadoPago", e.target.checked)
                      }
                    />
                    <label class="form-check-label">
                      ¿Pagos al día?
                    </label>
                    <hr />
  <h5>Historial de Servicios</h5>
  <button
    type="button"
    class="btn btn-sm btn-success mb-2"
    onClick={addService}
  >
    Agregar Servicio
  </button>

  {/* Recorremos cada servicio del historial */}
  {clienteActual().historialServicios.map((serv, i) => (
    <div key={i} class="border rounded p-2 mb-2">
      <div class="row g-2 mb-2">
        <div class="col">
          <label class="form-label">Hospital</label>
          <input
            type="text"
            class="form-control"
            value={serv.hospital}
            onInput={(e) => updateService(i, "hospital", e.target.value)}
          />
        </div>
        <div class="col">
          <label class="form-label">Servicio</label>
          <input
            type="text"
            class="form-control"
            value={serv.servicio}
            onInput={(e) => updateService(i, "servicio", e.target.value)}
          />
        </div>
      </div>
      <div class="row g-2 mb-2">
        <div class="col">
          <label class="form-label">Fecha Servicio</label>
          <input
            type="date"
            class="form-control"
            value={serv.fechaServicio.slice(0, 10)}
            onInput={(e) => updateService(i, "fechaServicio", e.target.value)}
          />
        </div>
        <div class="col">
          <label class="form-label">Costo</label>
          <input
            type="number"
            class="form-control"
            value={serv.costo}
            onInput={(e) => updateService(i, "costo", +e.target.value)}
          />
        </div>
        <div class="col">
          <label class="form-label">Copago</label>
          <input
            type="number"
            class="form-control"
            value={serv.copago}
            onInput={(e) => updateService(i, "copago", +e.target.value)}
          />
        </div>
      </div>
      <div class="mb-2">
        <label class="form-label">Comentarios</label>
        <textarea
          class="form-control"
          value={serv.comentarios}
          onInput={(e) => updateService(i, "comentarios", e.target.value)}
        />
      </div>
      <div class="mb-2">
        <label class="form-label">Resultados</label>
        <textarea
          class="form-control"
          value={serv.resultados}
          onInput={(e) => updateService(i, "resultados", e.target.value)}
        />
      </div>
      <div class="mb-2">
        <label class="form-label">Estado Autorización</label>
        <select
          class="form-select"
          value={serv.estadoAutorizacion}
          onChange={(e) => updateService(i, "estadoAutorizacion", e.target.value)}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Aprobado">Aprobado</option>
          <option value="Rechazado">Rechazado</option>
        </select>
      </div>
      <div class="d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-sm btn-danger"
          onClick={() => removeService(i)}
        >
          Eliminar Servicio
        </button>
      </div>
    </div>
  ))}
                  </div>
                
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
        {/* Backdrop manual */}
        <div class="modal-backdrop fade show"></div>
      </Show>
    </div>
  );
};

export default ClientesView;
