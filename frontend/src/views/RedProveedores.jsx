import { createSignal, onMount } from "solid-js";
import { obtenerRedProveedores } from "../services/PaginasEdt/redProveedoresService";

function RedProveedores() {
  const [redProveedores, setRedProveedores] = createSignal(null);

  onMount(async () => {
    try {
      const data = await obtenerRedProveedores();
      setRedProveedores(data);
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
    }
  });

  return (
    <>
      {/* Estilos locales para efecto hover en las tarjetas */}
      <style>
        {`
          .card:hover {
            transform: translateY(-5px);
            transition: transform 0.3s ease;
          }
        `}
      </style>

      <div class="container my-5">
        <h2 class="text-center mb-5">Nuestros Proveedores</h2>
        {redProveedores() ? (
          <div class="row">
            {redProveedores().proveedores.map((proveedor, index) => (
              <div class="col-md-4 mb-4" key={index}>
                <div class="card h-100 border-0 shadow-lg">
                  <img
                    src={proveedor.imagenUrl}
                    class="card-img-top"
                    alt={`Proveedor ${index + 1}`}
                  />
                  <div class="card-body">
                    <h5 class="card-title">{proveedor.nombre}</h5>
                    <p class="card-text">{proveedor.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div class="text-center">Cargando proveedores...</div>
        )}
      </div>
    </>
  );
}

export default RedProveedores;
