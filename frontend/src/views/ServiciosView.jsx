import { createSignal, onMount } from "solid-js";
import {
    obtenerServicios,
    obtenerServicioPorId,
    crearServicio,
    actualizarServicio,
    eliminarServicio
} from "../services/servicioService";
import {obtenerHospitales} from "../services/hospitalService";

export default function ServiciosView() {
    const [servicios, setServicios] = createSignal([]);
    const [categorias, setCategorias] = createSignal([]); //  Lista de categorías (servicios principales)
    const [hospitales, setHospitales] = createSignal([]); // Lista de hospitales para el dropdown
    const [formData, setFormData] = createSignal({
        nombre: "",
        descripcion: "",
        precioAseguradora: "",
        hospitalAprobado: "",
        servicioPadre: null, //  Inicialmente null (sin categoría)
        imagenUrl: "" 
    });
    const [editId, setEditId] = createSignal(null);
    const [error, setError] = createSignal(null);

    // 🔹 Función para cargar TODOS los servicios y las categorías
    const cargarServicios = async () => {
        try {
            const data = await obtenerServicios();
            const hospitalesData = await obtenerHospitales();
             const hospitalesFiltrados = hospitalesData.filter(hospital => hospital.convenioActivo === true);

            console.log(" Servicios obtenidos:", data); //  Verificar la respuesta
            setHospitales(hospitalesFiltrados);
            setServicios(data); // 🔹 Guardar TODOS los servicios en la tabla
            setCategorias(data.filter(servicio => servicio.servicioPadre === null)); // 🔹 Filtrar solo categorías principales
        } catch (err) {
            setError("Error al obtener los servicios.");
            console.error(err);
        }
    };
    // 🔹 Cargar los servicios y categorías al montar el componente
    onMount(cargarServicios);

    // 🔹 Manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData(), [name]: value });
    };

    //manejo hospital
    const handleHospitalChange = (e) => {
      setFormData({ ...formData(), hospitalAprobado: e.target.value });
  };
  

    // 🔹 Manejar selección de categoría (servicio padre)
    const handleSelectChange = (e) => {
        const value = e.target.value === "" ? null : e.target.value; // 🔹 Si es vacío, enviar null
        setFormData({ ...formData(), servicioPadre: value });
    };

    // 🔹 Crear o actualizar un servicio
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const servicioData = { 
                ...formData(), 
                servicioPadre: formData().servicioPadre || null // 🔹 Asegurar que se envía correctamente
            };

            console.log("Enviando datos al backend:", servicioData); // 👀 Debug

            if (editId()) {
                await actualizarServicio(editId(), servicioData);
                setEditId(null);
            } else {
                await crearServicio(servicioData);
            }

            await cargarServicios(); // 🔹 Recargar servicios después de crear o actualizar
            setFormData({ nombre: "", descripcion: "", precioAseguradora: "", hospitalAprobado: "", servicioPadre: "" });
            setError(null);
        } catch (err) {
            setError("Error al guardar el servicio.");
            console.error("Error en handleSubmit:", err.response?.data || err.message);
        }
    };

    // 🔹 Cargar datos al editar un servicio
    const handleEdit = async (id) => {
        try {
            const servicio = await obtenerServicioPorId(id);
            setFormData(servicio);
            setEditId(id);
        } catch (err) {
            setError("Error al obtener el servicio.");
            console.error(err);
        }
    };

    // 🔹 Eliminar un servicio
    const handleDelete = async (id) => {
        try {
            await eliminarServicio(id);
            await cargarServicios(); // 🔹 Recargar la tabla después de eliminar
            setError(null);
        } catch (err) {
            setError("Error al eliminar el servicio.");
            console.error(err);
        }
    };

    return (
        <div class="container mt-4">
            <h2 class="text-center mb-4">Gestión de Servicios</h2>

            {error() && <div class="alert alert-danger">{error()}</div>}

            {/* Formulario para crear o editar servicios */}
            <form onSubmit={handleSubmit} class="card p-4 shadow-sm">
                <div class="mb-3">
                    <label class="form-label">Nombre del servicio (categoría o subcategoría)</label>
                    <input class="form-control" name="nombre" placeholder="Nombre del servicio" value={formData().nombre} onInput={handleChange} required />
                </div>
                <div class="mb-3">
                    <label class="form-label">Descripción</label>
                    <textarea class="form-control" name="descripcion" placeholder="Descripción" value={formData().descripcion} onInput={handleChange} required></textarea>
                </div>
                <div class="mb-3">
    <label class="form-label">URL de la Imagen</label>
    <input class="form-control" name="imagenUrl" placeholder="URL de la imagen" value={formData().imagenUrl} onInput={handleChange} required />
</div>

                <div class="mb-3">
                    <label class="form-label">Precio de la aseguradora por el servicio</label>
                    <input type="number" class="form-control" name="precioAseguradora" placeholder="Precio" value={formData().precioAseguradora} onInput={handleChange} required />
                </div>
                <div class="mb-3">
                    <label class="form-label">Hospital Aprobado</label>
                    <select class="form-select" name="hospitalAprobado" value={formData().hospitalAprobado} onChange={handleHospitalChange} required>
    <option value="">Selecciona un hospital</option>
    {hospitales().map((hospital) => (
        <option value={hospital._id}>{hospital.nombre}</option>
    ))}
</select>


                </div>
                <div class="mb-3">
                    <label class="form-label">Categoría a la que pertenece</label>
                    <select class="form-select" name="servicioPadre" value={formData().servicioPadre || ""} onChange={handleSelectChange}>
                        <option value="">Sin categoría (Servicio principal)</option>
                        {categorias().map((categoria) => (
                            <option value={categoria._id}>{categoria.nombre}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary w-100">{editId() ? "Actualizar" : "Crear"} Servicio</button>
            </form>

            {/* Lista de Servicios */}
            <h3 class="mt-5">Lista de Servicios</h3>
            <table class="table table-striped mt-3">
                <thead class="table-dark">
                    <tr>
                        <th>Nombre C-S</th>
                        <th>Descripción</th>
                        <th>Imagen</th>
                        <th>Precio</th>
                        <th>Hospital</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {servicios().map((servicio) => (
                        <tr>
                            <td>{servicio.nombre}</td>
                            <td>{servicio.descripcion}</td>
                            <td>
    {servicio.imagenUrl ? (
        <img src={servicio.imagenUrl} alt={servicio.nombre} style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;" />
    ) : "N/A"}
</td>

                            <td>${servicio.precioAseguradora}</td>
                            <td>{servicio.hospitalAprobado?.nombre || "N/A"}</td>
                            <td>{servicio.servicioPadre && servicio.servicioPadre.nombre ? servicio.servicioPadre.nombre : "N/A"}</td>
                            <td>
                                <button class="btn btn-warning btn-sm me-2" onClick={() => handleEdit(servicio._id)}>Editar</button>
                                <button class="btn btn-danger btn-sm" onClick={() => handleDelete(servicio._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
