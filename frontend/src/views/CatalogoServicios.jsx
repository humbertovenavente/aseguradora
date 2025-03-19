import { createSignal, onMount } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { obtenerServicios } from "../services/servicioService";

export default function CatalogoServicios() {
    const [servicios, setServicios] = createSignal([]);  
    const [categorias, setCategorias] = createSignal([]); 
    const [subcategorias, setSubcategorias] = createSignal([]); 
    const params = useParams(); 
    const navigate = useNavigate(); 

    // Cargar servicios al montar
    onMount(async () => {
        try {
            const serviciosData = await obtenerServicios();

            // 🔹 Filtrar solo categorías principales
            const categoriasPrincipales = serviciosData.filter(servicio => servicio.servicioPadre === null);
            setCategorias(categoriasPrincipales);
            setServicios(serviciosData);

            // Si hay un ID en la URL, filtrar sus subcategorías
            if (params.id) {
                const subcategoriasFiltradas = serviciosData.filter(servicio => servicio.servicioPadre?._id === params.id);
                setSubcategorias(subcategoriasFiltradas);
            }
        } catch (error) {
            console.error("Error al cargar catálogo:", error);
        }
    });

    // 🔹 Función para cambiar la URL y cargar subcategorías
    const verSubcategorias = (categoriaId) => {
        navigate(`/catalogo/${categoriaId}`, { replace: true });
        const subcategoriasFiltradas = servicios().filter(servicio => servicio.servicioPadre?._id === categoriaId);
        setSubcategorias(subcategoriasFiltradas);
    };

    // 🔹 Función para regresar al catálogo principal
    const volverAlCatalogo = () => {
        navigate("/catalogo", { replace: true });
        setSubcategorias([]);
    };

    return (
        <div class="container mt-4">
            <h2 class="text-center mb-4">Our Services</h2>

            {/* 🔹 Mostrar categorías principales si no hay subcategorías */}
            {subcategorias().length === 0 && (
                <div>
                    <h3>Services</h3>
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        {categorias().map(categoria => (
                            <div class="col" key={categoria._id}>
                                <div class="card h-100 shadow-sm">
                                    <img src={categoria.imagenUrl || "https://via.placeholder.com/150"} class="card-img-top" alt={categoria.nombre} />
                                    <div class="card-body">
                                        <h5 class="card-title">{categoria.nombre}</h5>
                                        <p class="card-text"><strong></strong> {categoria.descripcion}</p>
                                        <p><strong>Price:</strong> ${categoria.precioAseguradora}</p>
                                        <p><strong>Hospital:</strong> {categoria.hospitalAprobado?.nombre || "N/A"}</p>
                                        <button class="btn btn-primary" onClick={() => verSubcategorias(categoria._id)}>
                                            More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 🔹 Mostrar subcategorías si hay una categoría seleccionada */}
            {subcategorias().length > 0 && (
                <div>
                    <button class="btn btn-secondary mb-3" onClick={volverAlCatalogo}>Volver</button>
                    <h3>Subcategorías</h3>
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        {subcategorias().map(subcategoria => (
                            <div class="col" key={subcategoria._id}>
                                <div class="card h-100 shadow-sm">
                                    <img src={subcategoria.imagenUrl || "https://via.placeholder.com/150"} class="card-img-top" alt={subcategoria.nombre} />
                                    <div class="card-body">
                                        <h5 class="card-title">nombre: {subcategoria.nombre}</h5>
                                        <p class="card-text"><strong>descripción:</strong> {subcategoria.descripcion}</p>
                                        <p><strong>Precio Aseguradora:</strong> ${subcategoria.precioAseguradora}</p>
                                        <p><strong>Hospital:</strong> {subcategoria.hospitalAprobado?.nombre || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

