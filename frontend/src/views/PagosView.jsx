import { createSignal, createEffect } from "solid-js";
import {
  obtenerPagos,
  obtenerPagoPorId,
  obtenerPagosPorCliente,
  crearPago,
  actualizarPago,
  eliminarPago,
} from "../services/pagoService";

export default function PagosView() {
  const [pagos, setPagos] = createSignal([]);
  const [form, setForm] = createSignal({
    cliente_id: "",
    poliza_id: "",
    monto: 0,
  });
  const [editId, setEditId] = createSignal(null);
  const [filtroCliente, setFiltroCliente] = createSignal("");
  

  createEffect(() => {
    cargarPagos();
  });

  const cargarPagos = async () => {
    const datos = await obtenerPagos();
    setPagos(datos);
  };

  const handleChange = (e) => {
    setForm({
      ...form(),
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId()) {
      await actualizarPago(editId(), form());
      setEditId(null);
    } else {
      await crearPago(form());
    }
    setForm({ cliente_id: "", poliza_id: "", monto: 0 });
    cargarPagos();
  };

  const handleEdit = (pago) => {
    setForm({
      cliente_id: pago.cliente_id?._id || "",
      poliza_id: pago.poliza_id?._id || "",
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
        <div class="mb-3">
          <label class="form-label">ID del Cliente</label>
          <input
            type="text"
            name="cliente_id"
            value={form().cliente_id}
            onInput={handleChange}
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">ID de la Póliza</label>
          <input
            type="text"
            name="poliza_id"
            value={form().poliza_id}
            onInput={handleChange}
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Monto</label>
          <input
            type="number"
            name="monto"
            value={form().monto}
            onInput={handleChange}
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {editId() ? "Actualizar Pago" : "Crear Pago"}
        </button>
      </form>

      <div class="card p-4 shadow-sm mb-4">
        <h5>Filtrar Pagos</h5>
        <div class="row">
          <div class="col">
            <input
              type="text"
              placeholder="ID del Cliente"
              value={filtroCliente()}
              onInput={(e) => setFiltroCliente(e.target.value)}
              class="form-control"
            />
            <button
              class="btn btn-info mt-2"
              onClick={filtrarPorCliente}
            >
              Filtrar por Cliente
            </button>
          </div>
        </div>
      </div>

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
    <td>{pago.cliente_id.nombre || "Desconocido"}</td>
    <td>{pago.poliza_id?.nombre || "Desconocido"}</td>
    <td>{pago.monto}</td>
    <td>{pago.estado_pago}</td>
    <td>{pago.motivo_rechazo || "-"}</td>
    <td>
      <button
        class="btn btn-warning btn-sm me-2"
        onClick={() => handleEdit(pago)}
      >
        Editar
      </button>
      <button
        class="btn btn-danger btn-sm"
        onClick={() => handleDelete(pago._id)}
      >
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
