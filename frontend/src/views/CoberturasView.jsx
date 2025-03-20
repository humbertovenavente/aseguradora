// =========================
// Cobertura View (Solid.js + Bootstrap)
// =========================

import { createSignal, createEffect } from "solid-js";
import {
  crearCobertura,
  obtenerCoberturas,
  actualizarCobertura,
  eliminarCobertura,
} from "../services/coberturaService";
import { obtenerServicios } from "../services/servicioService";  // ✅ Importamos los servicios

export default function CoberturasView() {
  const [coberturas, setCoberturas] = createSignal([]);
  const [servicios, setServicios] = createSignal([]);  // ✅ Agregamos los servicios disponibles
  const [form, setForm] = createSignal({
    nombre: "",
    descripcion: "",
    porcentajeCobertura: "",
    servicios: []  // ✅ Lista de servicios cubiertos
  });
  const [editId, setEditId] = createSignal(null);

  createEffect(() => {
    cargarCoberturas();
    cargarServicios();
  });

  const cargarCoberturas = async () => {
    const datos = await obtenerCoberturas();
    setCoberturas(datos);
  };

  const cargarServicios = async () => {
    const datos = await obtenerServicios();
    setServicios(datos);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form(), [name]: value });
  };

  const handleServiceChange = (e) => {
    const selectedServices = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm({ ...form(), servicios: selectedServices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId()) {
      await actualizarCobertura(editId(), form());
      setEditId(null);
    } else {
      await crearCobertura(form());
    }
    setForm({ nombre: "", descripcion: "", porcentajeCobertura: "", servicios: [] });
    cargarCoberturas();
  };

  const handleEdit = (cobertura) => {
    setForm({
      nombre: cobertura.nombre,
      descripcion: cobertura.descripcion,
      porcentajeCobertura: cobertura.porcentajeCobertura,
      servicios: cobertura.servicios.map(servicio => servicio._id) || []  // ✅ Agregar los servicios seleccionados
    });
    setEditId(cobertura._id);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta cobertura?")) {
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

        {/* ✅ Agregar selección de servicios */}
        <div class="mb-3">
  <label class="form-label">Servicios Cubiertos</label>
  <div class="border p-2 rounded" style="max-height: 200px; overflow-y: auto;">
    {servicios().map(servicio => (
      <div class="form-check" key={servicio._id}>
        <input
          type="checkbox"
          class="form-check-input"
          value={servicio._id}
          checked={form().servicios.includes(servicio._id)}
          onChange={(e) => {
            const updatedServicios = e.target.checked
              ? [...form().servicios, servicio._id]
              : form().servicios.filter(id => id !== servicio._id);
            setForm({ ...form(), servicios: updatedServicios });
          }}
        />
        <label class="form-check-label">{servicio.nombre}</label>
      </div>
    ))}
  </div>
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
              <th>Servicios Cubiertos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {coberturas().map((cobertura) => (
              <tr key={cobertura._id}>
                <td>{cobertura.nombre}</td>
                <td>{cobertura.descripcion}</td>
                <td>{cobertura.porcentajeCobertura}%</td>
                <td>
  {cobertura.servicios.length > 0
    ? cobertura.servicios.map(servicio => servicio.nombre).join(", ")
    : "Sin servicios"}
</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(cobertura)}
                  >
                    Editar
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    onClick={() => handleDelete(cobertura._id)}
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
