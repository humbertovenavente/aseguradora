// =========================
// Servicios View (Solid.js + Bootstrap)
// =========================

import { createSignal, createEffect } from "solid-js";
import {
  crearServicio,
  obtenerServicios,
  actualizarServicio,
  eliminarServicio,
} from "../services/servicioService";
import { obtenerHospitales } from "../services/hospitalService";

export default function ServiciosView() {
  const [servicios, setServicios] = createSignal([]);
  const [hospitales, setHospitales] = createSignal([]);
  const [form, setForm] = createSignal({
    nombre: "",
    descripcion: "",
    categoria: "",
    subcategoria: "",
    precio: 0,
    hospital: "",
  });
  const [editId, setEditId] = createSignal(null);

  createEffect(() => {
    cargarServicios();
    cargarHospitales();
  });

  const cargarServicios = async () => {
    const datos = await obtenerServicios();
    setServicios(datos);
  };

  const cargarHospitales = async () => {
    const datos = await obtenerHospitales();
    setHospitales(datos);
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
      await actualizarServicio(editId(), form());
      setEditId(null);
    } else {
      await crearServicio(form());
    }
    setForm({
      nombre: "",
      descripcion: "",
      categoria: "",
      subcategoria: "",
      precio: 0,
      hospital: "",
    });
    cargarServicios();
  };

  const handleEdit = (servicio) => {
    setForm({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      categoria: servicio.categoria,
      subcategoria: servicio.subcategoria,
      precio: servicio.precio,
      hospital: servicio.hospital._id,
    });
    setEditId(servicio._id);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este servicio?")) {
      await eliminarServicio(id);
      cargarServicios();
    }
  };

  return (
    <div class="container py-4">
      <h2 class="text-center mb-4">Gestión de Servicios</h2>

      <form onSubmit={handleSubmit} class="card p-4 shadow-sm mb-4">
        <div class="mb-3">
          <label class="form-label">Nombre del Servicio</label>
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
          <label class="form-label">Categoría</label>
          <input
            type="text"
            name="categoria"
            value={form().categoria}
            onInput={handleChange}
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Subcategoría</label>
          <input
            type="text"
            name="subcategoria"
            value={form().subcategoria}
            onInput={handleChange}
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Precio (Q)</label>
          <input
            type="number"
            name="precio"
            value={form().precio}
            onInput={handleChange}
            class="form-control"
            min="0"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Hospital</label>
          <select
            name="hospital"
            value={form().hospital}
            onChange={handleChange}
            class="form-control"
            required
          >
            <option value="">Seleccione un hospital</option>
            {hospitales().map((hospital) => (
              <option value={hospital._id}>{hospital.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {editId() ? "Actualizar Servicio" : "Crear Servicio"}
        </button>
      </form>

      <h3 class="mb-3">Lista de Servicios</h3>
      <div class="table-responsive">
        <table class="table table-bordered table-hover shadow-sm">
          <thead class="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Subcategoría</th>
              <th>Precio (Q)</th>
              <th>Hospital</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios().map((servicio) => (
              <tr key={servicio._id}>
                <td>{servicio.nombre}</td>
                <td>{servicio.descripcion}</td>
                <td>{servicio.categoria}</td>
                <td>{servicio.subcategoria}</td>
                <td>Q{servicio.precio}</td>
                <td>{servicio.hospital?.nombre || "No asignado"}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(servicio)}
                  >
                    Editar
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    onClick={() => handleDelete(servicio._id)}
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
