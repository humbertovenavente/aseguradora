import { createSignal, onMount } from "solid-js";
import {
  obtenerPagos,
  obtenerPagosPorCliente,
  crearPago,
  actualizarPago,
  eliminarPago,
} from "../services/pagoService";
import { obtenerClientes } from "../services/clientesService";
import { obtenerPolizas } from "../services/polizasService";

export default function PagosView() {
  const [pagos, setPagos] = createSignal([]);
  const [clientes, setClientes] = createSignal([]);
  const [polizas, setPolizas] = createSignal([]);
  const [editId, setEditId] = createSignal(null);
  const [filtroCliente, setFiltroCliente] = createSignal("");

  const [form, setForm] = createSignal({
    clienteCorreo: "",
    polizaNombre: "",
    monto: 0,
  });

  onMount(async () => {
    await cargarPagos();
    await cargarClientes();
    await cargarPolizas();
  });

  const cargarPagos = async () => {
    const datos = await obtenerPagos();
    setPagos(datos);
  };

  const cargarClientes = async () => {
    const datos = await obtenerClientes();
    setClientes(datos);
  };

  const cargarPolizas = async () => {
    const datos = await obtenerPolizas();
    setPolizas(datos);
  };

  const handleChange = (e) => {
    setForm({
      ...form(),
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form().clienteCorreo || !form().polizaNombre) {
      alert("Debe seleccionar un cliente y una póliza antes de crear el pago.");
      return;
    }

    const pagoData = {
      clienteCorreo: form().clienteCorreo,
      polizaNombre: form().polizaNombre,
      monto: form().monto,
    };

    try {
      if (editId()) {
        await actualizarPago(editId(), pagoData);
        setEditId(null);
      } else {
        await crearPago(pagoData);
      }
      setForm({ clienteCorreo: "", polizaNombre: "", monto: 0 });
      cargarPagos();
    } catch (error) {
      alert(`Error al procesar el pago: ${error.response?.data?.mensaje || "Verifique los datos ingresados."}`);
    }
  };

  const handleEdit = (pago) => {
    setForm({
      clienteCorreo: pago.cliente_id?.usuarioId?.correo || pago.clienteCorreo || "",
      polizaNombre: pago.poliza_id?.nombre || "",
      monto: pago.monto,
    });
    setEditId(pago._id);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este pago?")) {
      await eliminarPago(id);
      cargarPagos();
    }
  };

  const filtrarPorCliente = async () => {
    const datos = await obtenerPagosPorCliente(filtroCliente());
    setPagos(datos);
  };

  return (
    <div class="container py-4">
      <h2 class="text-center mb-4">Gestión de Pagos</h2>

      <form onSubmit={handleSubmit} class="card p-4 shadow-sm mb-4">
        {/* 🔽 Dropdown para seleccionar correo del cliente */}
        <div class="mb-3">
          <label class="form-label">Correo del Cliente</label>
          <select name="clienteCorreo" value={form().clienteCorreo} onChange={handleChange} class="form-control" required>
            <option value="">Seleccione un cliente</option>
            {clientes().map((cliente) => (
              <option value={cliente.usuarioId.correo}>
                {cliente.nombre} ({cliente.usuarioId.correo})
              </option>
            ))}
          </select>
        </div>

        {/* 🔽 Dropdown para seleccionar póliza */}
        <div class="mb-3">
          <label class="form-label">Póliza</label>
          <select name="polizaNombre" value={form().polizaNombre} onChange={handleChange} class="form-control" required>
            <option value="">Seleccione una póliza</option>
            {polizas().map((poliza) => (
              <option value={poliza.nombre}>
                {poliza.nombre} ({poliza.tipoCobertura})
              </option>
            ))}
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Monto</label>
          <input type="number" name="monto" value={form().monto} onInput={handleChange} class="form-control" required />
        </div>

        <button type="submit" class="btn btn-primary w-100">
          {editId() ? "Actualizar Pago" : "Crear Pago"}
        </button>
      </form>

      <h3 class="mb-3">Lista de Pagos</h3>
      <div class="table-responsive">
        <table class="table table-bordered table-hover shadow-sm">
          <thead class="table-dark">
            <tr>
              <th>Cliente</th>
              <th>Póliza</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Motivo de Rechazo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos().map((pago) => (
              <tr key={pago._id}>
                <td>{pago.cliente_id?.nombre || "Desconocido"}</td>
                <td>{pago.poliza_id?.nombre || "Desconocido"}</td>
                <td>{pago.monto}</td>
                <td>{pago.monto >= 250 ? "aceptado" : "rechazado"}</td>
                <td>{pago.monto < 250 ? "Monto inferior al mínimo de cobertura." : "-"}</td>
                <td>
                  <button class="btn btn-warning btn-sm me-2" onClick={() => handleEdit(pago)}>Editar</button>
                  <button class="btn btn-danger btn-sm" onClick={() => handleDelete(pago._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
