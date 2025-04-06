import { createSignal, onMount } from "solid-js";
import {
    obtenerServicios,
    obtenerServicioPorId,
    crearServicio,
    actualizarServicio,
    eliminarServicio
} from "../services/servicioService";
import { obtenerHospitales } from "../services/hospitalService";

export default function ServiciosView() {
    const [servicios, setServicios] = createSignal([]);
    const [categorias, setCategorias] = createSignal([]); // Lista de categorías (servicios principales)
    const [hospitales, setHospitales] = createSignal([]); // Lista de hospitales para el dropdown
    const [formData, setFormData] = createSignal({
        nombre: "",
        descripcion: "",
        precioAseguradora: "",
        hospitalesAprobados: [], // ✅ Ahora es un array de hospitales seleccionados
        servicioPadre: null,
        imagenUrl: ""
    });
    const [editId, setEditId] = createSignal(null);
    const [error, setError] = createSignal(null);

    // 🔹 Función para cargar TODOS los servicios y categorías
    const cargarServicios = async () => {
        try {
            const data = await obtenerServicios();
            const hospitalesData = await obtenerHospitales();
            const hospitalesFiltrados = hospitalesData.filter(hospital => hospital.convenioActivo === true);

            console.log("Servicios obtenidos:", data);
            setHospitales(hospitalesFiltrados);
            setServicios(data);
            setCategorias(data.filter(servicio => servicio.servicioPadre === null)); // Filtrar solo categorías principales
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

    // 🔹 Manejar selección de hospitales con checkboxes
    const handleHospitalChange = (e) => {
        const selectedHospital = e.target.value;
        const isChecked = e.target.checked;

        const updatedHospitals = isChecked
            ? [...formData().hospitalesAprobados, selectedHospital]
            : formData().hospitalesAprobados.filter(id => id !== selectedHospital);

        setFormData({ ...formData(), hospitalesAprobados: updatedHospitals });
    };

    // 🔹 Manejar selección de categoría (servicio padre)
    const handleSelectChange = (e) => {
        const value = e.target.value === "" ? null : e.target.value;
        setFormData({ ...formData(), servicioPadre: value });
    };

    // 🔹 Crear o actualizar un servicio
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const servicioData = {
                ...formData(),
                servicioPadre: formData().servicioPadre || null
            };

            console.log("Enviando datos al backend:", servicioData); // 👀 Debug

            if (editId()) {
                await actualizarServicio(editId(), servicioData);
                setEditId(null);
            } else {
                await crearServicio(servicioData);
            }

            await cargarServicios();
            setFormData({ nombre: "", descripcion: "", precioAseguradora: "", hospitalesAprobados: [], servicioPadre: "" });
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
            await cargarServicios();
            setError(null);
        } catch (err) {
            setError("Error al eliminar el servicio.");
            console.error(err);
        }
    };

    return (
        <div class="container mt-4">

            {/* Lista de Servicios */}
            <h3 class="mt-5">Lista de Servicios</h3>
            <table class="table table-striped mt-3">
                <thead class="table-dark">
                    <tr>
                        <th>Nombre C-S</th>
                        <th>Descripción</th>
                        <th>Imagen</th>
                        <th>Precio</th>
                        <th>Hospitales</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    {servicios().map((servicio) => (
                        <tr>
                            <td>{servicio.nombre}</td>
                            <td>{servicio.descripcion}</td>
                            <td><img src={servicio.imagenUrl} alt={servicio.nombre} style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;" /></td>
                            <td>${servicio.precioAseguradora}</td>
                            <td>{servicio.hospitalesAprobados.map(hospital => hospital.nombre).join(", ")}</td>
                            <td>{servicio.servicioPadre?.nombre || "N/A"}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
