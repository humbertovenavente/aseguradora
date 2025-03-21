import { createSignal, onMount } from "solid-js";
import { obtenerHistoria } from "../services/PaginasEdt/historiaService";

function HistoriaView() {
  const [historia, setHistoria] = createSignal(null);

  onMount(async () => {
    try {
      const data = await obtenerHistoria();
      setHistoria(data);
    } catch (error) {
      console.error("Error al obtener la historia:", error);
    }
  });

  return (
    <div class="container my-5">
      {historia() ? (
        <div class="row align-items-center">
          {/* Columna de la imagen */}
          <div class="col-md-6 mb-4 mb-md-0">
            <img
              src={historia().imagenUrl}
              alt="Historia de la empresa"
              class="img-fluid rounded shadow"
            />
          </div>
          {/* Columna del texto */}
          <div class="col-md-6">
            <h2 class="mb-4">{historia().titulo}</h2>
            {historia().parrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}

export default HistoriaView;
