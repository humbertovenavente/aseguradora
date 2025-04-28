import { createSignal, onMount } from "solid-js";
import { obtenerUltimosServicios } from "../../services/PaginasEdt/elementosService";

export default function ElementoUltimosServicios() {
  const [servicios, setServicios] = createSignal([]);

  onMount(async () => {
    try {
      const data = await obtenerUltimosServicios();
      setServicios(data);
    } catch (error) {
      console.error("Error al cargar últimos servicios:", error);
    }
  });

  return (
    <div class="container my-5">
      <h2 class="text-center mb-4">Últimos Servicios Agregados</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        {servicios().map((servicio, index) => (
          <div class="col" key={index}>
            <div class="card h-100 shadow-sm">
              <img
                src={servicio.imagenUrl}
                class="card-img-top"
                alt={servicio.nombre}
              />
              <div class="card-body text-center">
                <h5 class="card-title">{servicio.nombre}</h5>
                <p class="card-text">{servicio.descripcion}</p>
                <p class="card-text">Precio: ${servicio.precio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>
{`
.container {
  padding: 2rem 1rem;
}

h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #026E81; /* azul aseguradora */
  margin-bottom: 2rem;
}

.card {
  border: none;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.card-img-top {
  border-bottom: 1px solid #eee;
  height: 220px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
  background-color: #fff;
}

.card-title {
  font-size: 1.25rem;
  color: #026E81;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-text {
  color: #555;
  font-size: 0.95rem;
}

.row {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .card-img-top {
    height: 180px;
  }
}
`}
</style>

    </div>
  );
}
