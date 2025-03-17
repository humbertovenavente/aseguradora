// =========================
// Cobertura View (Solid.js + Bootstrap)
// =========================

import { createSignal, createEffect } from "solid-js";
import {
  crearCobertura,
  obtenerCoberturas,
  actualizarCobertura,
  eliminarCobertura,
  obtenerCoberturasPorCliente,
} from "../services/coberturaService";

export default function CoberturasView() {
  const [coberturas, setCoberturas] = createSignal([]);
  const [form, setForm] = createSignal({
    nombre: "",
    descripcion: "",
    porcentajeCobertura: 70,
    isCustom: false,
    clienteId: "",
  });
  const [editId, setEditId] = createSignal(null);

  createEffect(() => {
    cargarCoberturas();
  });

  const cargarCoberturas = async () => {
    const datos = await obtenerCoberturas();
    setCoberturas(datos);
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form(),
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId()) {
      await actualizarCobertura(editId(), form());
      setEditId(null);
    } else {
      await crearCobertura(form());
    }
    setForm({ nombre: "", descripcion: "", porcentajeCobertura: 70, isCustom: false, clienteId: "" });
    cargarCoberturas();
  };

  const handleEdit = (cobertura) => {
    setForm({
      nombre: cobertura.nombre,
      descripcion: cobertura.descripcion,
      porcentajeCobertura: cobertura.porcentajeCobertura,
      isCustom: cobertura.isCustom,
      clienteId: cobertura.clienteId || "",
    });
    setEditId(cobertura._id);
  };

  const handleDelete = async (id, isCustom) => {
    if (isCustom && confirm("¿Estás seguro de eliminar esta cobertura personalizada?")) {
      await eliminarCobertura(id);
      cargarCoberturas();
    }
  };

  return (
    <div class="container py-4">
      <h2 class="text-center mb-4">Gestión de Coberturas</h2>

      <form onSubmit={handleSubmit} class="card p-4 shadow-sm mb-4">
        <div class="mb-3">
          <label class="form-label">Nombre de la Cobertura</label>
          <input
            type="text"
            name="nombre"
            value={form().nombre}
            onInput={handleChange}
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={form().descripcion}
            onInput={handleChange}
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Porcentaje de Cobertura (%)</label>
          <input
            type="number"
            name="porcentajeCobertura"
            value={form().porcentajeCobertura}
            onInput={handleChange}
            class="form-control"
            min="0"
            max="100"
            required
          />
        </div>
        {form().isCustom && (
          <div class="mb-3">
            <label class="form-label">ID del Cliente</label>
            <input
              type="text"
              name="clienteId"
              value={form().clienteId}
              onInput={handleChange}
              class="form-control"
              required
            />
          </div>
        )}
        <div class="form-check mb-3">
          <input
            type="checkbox"
            name="isCustom"
            checked={form().isCustom}
            onChange={handleChange}
            class="form-check-input"
          />
          <label class="form-check-label">¿Es Cobertura Personalizada?</label>
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {editId() ? "Actualizar Cobertura" : "Crear Cobertura"}
        </button>
      </form>

      <h3 class="mb-3">Lista de Coberturas</h3>
      <div class="table-responsive">
        <table class="table table-bordered table-hover shadow-sm">
          <thead class="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Porcentaje de Cobertura</th>
              <th>Personalizada</th>
              <th>ID del Cliente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {coberturas().map((cobertura) => (
              <tr key={cobertura._id}>
                <td>{cobertura.nombre}</td>
                <td>{cobertura.descripcion}</td>
                <td>{cobertura.porcentajeCobertura}%</td>
                <td>{cobertura.isCustom ? "Sí" : "No"}</td>
                <td>{cobertura.clienteId || "-"}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(cobertura)}
                  >
                    Editar
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    onClick={() => handleDelete(cobertura._id, cobertura.isCustom)}
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

