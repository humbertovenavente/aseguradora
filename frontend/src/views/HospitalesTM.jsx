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



  return (
    <div class="container py-4">


      <h3 class="mb-3">Lista de Hospitales</h3>

      <div class="table-responsive">
        <table class="table table-bordered table-hover shadow-sm">
          <thead class="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Convenio Activo</th>
            </tr>
          </thead>
          <tbody>
            {hospitales().map((hospital) => (
              <tr key={hospital._id}>
                <td>{hospital.nombre}</td>
                <td>{hospital.direccion}</td>
                <td>{hospital.telefono}</td>
                <td>{hospital.convenioActivo ? "Sí" : "No"}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
