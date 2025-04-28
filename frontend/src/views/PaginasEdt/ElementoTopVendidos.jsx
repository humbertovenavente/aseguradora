// frontend/src/views/PaginasEdt/ElementoTopVendidos.jsx
import { createSignal, onMount } from "solid-js";
import { obtenerTopVendidos } from "../../services/PaginasEdt/elementosService.js";

export default function ElementoTopVendidos() {
  const [servicios, setServicios] = createSignal([]);
  const [draggedIndex, setDraggedIndex] = createSignal(null);

  onMount(async () => {
    try {
      const data = await obtenerTopVendidos();
      setServicios(data);
    } catch (err) {
      console.error("Error cargando top vendidos:", err);
    }
  });

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    const current = draggedIndex();
    if (current === null || current === index) return;

    const updatedServicios = [...servicios()];
    const [movedItem] = updatedServicios.splice(current, 1);
    updatedServicios.splice(index, 0, movedItem);
    setServicios(updatedServicios);
    setDraggedIndex(null);
  };

  return (
    <div class="container mt-4">
      <h2 class="text-center mb-4">Top Servicios Más Vendidos</h2>

      <div class="masonry-grid">
        {servicios().map((servicio, index) => (
          <div
            class="masonry-item"
            key={index}
            draggable="true"
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            style={{
              cursor: "grab",
              opacity: draggedIndex() === index ? 0.5 : 1,
              transition: "opacity 0.3s",
            }}
          >
            <img
              src={servicio.imagenUrl || "https://via.placeholder.com/150"}
              alt="Servicio"
              class="img-fluid"
              style={{
                "border-radius": "1rem",
                "object-fit": "cover",
                "width": "100%",
                "height": "auto",
              }}
            />
          </div>
        ))}
      </div>

      {/* Estilos directamente aquí para el mosaico */}
      <style>
        {`
          .masonry-grid {
            columns: 3 250px; /* 3 columnas mínimo de 250px */
            column-gap: 1rem;
          }
          .masonry-item {
            margin-bottom: 1rem;
            break-inside: avoid;
            background: none;
            border: none;
          }
          .masonry-item img {
            width: 100%;
            height: auto;
            display: block;
          }
        `}
      </style>
    </div>
  );
}
