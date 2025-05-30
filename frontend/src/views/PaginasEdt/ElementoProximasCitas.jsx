import { createSignal, onMount } from "solid-js";
import { obtenerProximasCitas } from "../../services/PaginasEdt/elementosService";

export default function ElementoProximasCitas() {
  const [citas, setCitas] = createSignal([]);

  onMount(async () => {
    try {
      const data = await obtenerProximasCitas();
      setCitas(data);
    } catch (error) {
      console.error("Error al cargar próximas citas:", error);
    }
  });

  return (
    <div class="container my-5">
      <h2 class="text-center mb-4">Próximas Citas</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        {citas().map((cita, index) => (
          <div class="col" key={index}>
            <div class="card h-100 shadow-sm">
              <div class="card-body text-center">
                <h5 class="card-title">{cita.paciente}</h5>
                <p class="card-text">{new Date(cita.fechaCita).toLocaleDateString()}</p>
                <p class="card-text">{cita.hospital} - {cita.servicio}</p>
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
