import { createSignal, onMount } from "solid-js";
import { obtenerServicios } from "../services/servicioService";
import { obtenerHospitales } from "../services/hospitalService";

export default function CatalogoServicios() {
    const [servicios, setServicios] = createSignal([]);
    const [hospitales, setHospitales] = createSignal([]);
    const [categorias, setCategorias] = createSignal([]);
    const [filtroHospital, setFiltroHospital] = createSignal("");
    const [filtroCategoria, setFiltroCategoria] = createSignal("");

    // Cargar servicios y hospitales al montar
    onMount(async () => {
        try {
            const serviciosData = await obtenerServicios();
            const hospitalesData = await obtenerHospitales();
            const hospitalesFiltrados = hospitalesData.filter(h => h.convenioActivo);

            setServicios(serviciosData);
            setHospitales(hospitalesFiltrados);
            setCategorias([...new Set(serviciosData.map(s => s.servicioPadre?.nombre).filter(Boolean))]);
        } catch (error) {
            console.error("Error al cargar catálogo:", error);
        }
    });

    // Filtrado dinámico
    const serviciosFiltrados = () => {
        return servicios().filter(servicio => 
            (!filtroHospital() || servicio.hospitalAprobado?._id === filtroHospital()) &&
            (!filtroCategoria() || servicio.servicioPadre?.nombre === filtroCategoria())
        );
    };

    return (
        <div class="container mt-4">
            <h2 class="text-center mb-4">Catálogo de Servicios</h2>
            <div class="d-flex justify-content-between mb-4">
                <select class="form-select me-2" onChange={(e) => setFiltroHospital(e.target.value)}>
                    <option value="">Todos los Hospitales</option>
                    {hospitales().map(hospital => (
                        <option value={hospital._id}>{hospital.nombre}</option>
                    ))}
                </select>
                <select class="form-select" onChange={(e) => setFiltroCategoria(e.target.value)}>
                    <option value="">Todas las Categorías</option>
                    {categorias().map(categoria => (
                        <option value={categoria}>{categoria}</option>
                    ))}
                </select>
            </div>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                {serviciosFiltrados().map(servicio => (
                    <div class="col" key={servicio._id}>
                        <div class="card h-100 shadow-sm">
                            <img src={servicio.imagenUrl || "https://via.placeholder.com/150"} class="card-img-top" alt={servicio.nombre} />
                            <div class="card-body">
                                <h5 class="card-title">{servicio.nombre}</h5>
                                <p class="card-text">{servicio.descripcion}</p>
                                <p class="text-primary fw-bold">${servicio.precioAseguradora}</p>
                                <p><strong>Hospital:</strong> {servicio.hospitalAprobado?.nombre || "N/A"}</p>
                                <p><strong>Categoría:</strong> {servicio.servicioPadre?.nombre || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
