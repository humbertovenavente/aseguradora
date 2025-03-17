import { createSignal, createEffect } from "solid-js";
import {
  crearHospital,
  obtenerHospitales,
  obtenerHospitalPorId,
  actualizarHospital,
  eliminarHospital,
} from "../services/hospitalService";

export default function HospitalesView() {
  const [hospitales, setHospitales] = createSignal([]);
  const [form, setForm] = createSignal({
    nombre: "",
    direccion: "",
    telefono: "",
    serviciosAprobados: [],
    convenioActivo: true,
  });
  const [editId, setEditId] = createSignal(null);

  // Cargar hospitales al iniciar
  createEffect(() => {
    cargarHospitales();
  });

  // Función para cargar hospitales
  const cargarHospitales = async () => {
    const datos = await obtenerHospitales();
    setHospitales(datos);
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form(),
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Crear o actualizar hospital
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId()) {
      await actualizarHospital(editId(), form());
      setEditId(null);
    } else {
      await crearHospital(form());
    }
    setForm({
      nombre: "",
      direccion: "",
      telefono: "",
      serviciosAprobados: [],
      convenioActivo: true,
    });
    cargarHospitales();
  };

  // Editar un hospital
  const handleEdit = async (id) => {
    const hospital = await obtenerHospitalPorId(id);
    setForm({
      nombre: hospital.nombre,
      direccion: hospital.direccion,
      telefono: hospital.telefono,
      serviciosAprobados: hospital.serviciosAprobados,
      convenioActivo: hospital.convenioActivo,
    });
    setEditId(id);
  };

  // Eliminar un hospital
  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este hospital?")) {
      await eliminarHospital(id);
      cargarHospitales();
    }
  };

  return (
    <div class="container py-4">
      <h2 class="text-center mb-4">Gestión de Hospitales</h2>

      <form onSubmit={handleSubmit} class="card p-4 shadow-sm mb-4">
        <div class="mb-3">
          <label class="form-label">Nombre del Hospital</label>
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
          <label class="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={form().direccion}
            onInput={handleChange}
            class="form-control"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={form().telefono}
            onInput={handleChange}
            class="form-control"
            required
          />
        </div>

        <div class="form-check mb-3">
          <input
            type="checkbox"
            name="convenioActivo"
            checked={form().convenioActivo}
            onChange={handleChange}
            class="form-check-input"
          />
          <label class="form-check-label">¿Convenio Activo?</label>
        </div>

        <button type="submit" class="btn btn-primary w-100">
          {editId() ? "Actualizar Hospital" : "Crear Hospital"}
        </button>
      </form>

      <h3 class="mb-3">Lista de Hospitales</h3>

      <div class="table-responsive">
        <table class="table table-bordered table-hover shadow-sm">
          <thead class="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Convenio Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {hospitales().map((hospital) => (
              <tr key={hospital._id}>
                <td>{hospital.nombre}</td>
                <td>{hospital.direccion}</td>
                <td>{hospital.telefono}</td>
                <td>{hospital.convenioActivo ? "Sí" : "No"}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(hospital._id)}
                  >
                    Editar
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    onClick={() => handleDelete(hospital._id)}
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
