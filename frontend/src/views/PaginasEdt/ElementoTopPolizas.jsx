import { createSignal, onMount } from "solid-js";
import { obtenerTopPolizas } from "../../services/PaginasEdt/elementosService";

export default function ElementoTopPolizas() {
  const [polizas, setPolizas] = createSignal([]);

  onMount(async () => {
    try {
      const data = await obtenerTopPolizas();
      setPolizas(data);
    } catch (error) {
      console.error("Error al cargar pólizas:", error);
    }
  });

  return (
    <>
      <style>
        {`
          .polizas-container {
            background: #f7f9fb;
            border-radius: 20px;
            padding: 2rem;
          }

          .poliza-card {
            background: #fff;
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease;
          }

          .poliza-card:hover {
            transform: translateY(-8px);
          }

          .poliza-nombre {
            font-size: 1.5rem;
            color: #026E81;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }

          .poliza-tipo {
            font-size: 1.1rem;
            color: #555;
            margin-bottom: 0.5rem;
          }

          .poliza-contrataciones {
            font-size: 0.95rem;
            color: #777;
          }

          .row {
            margin-top: 2rem;
            justify-content: center;
          }

          .col {
            display: flex;
            justify-content: center;
          }

          h2 {
            font-size: 2rem;
            font-weight: bold;
            color: #026E81;
            margin-bottom: 2rem;
          }
        `}
      </style>

      <div class="container my-5">
        <h2 class="text-center mb-5">Pólizas Más Contratadas</h2>

        <div class="polizas-container">
          <div class="row row-cols-1 row-cols-md-3 g-4">
            {polizas().map((poliza, index) => (
              <div class="col" key={index}>
                <div class="poliza-card">
                  <div class="poliza-nombre">{poliza.nombre}</div>
                  <div class="poliza-tipo">{poliza.tipo}</div>
                  <div class="poliza-contrataciones">{poliza.vecesContratada} contrataciones</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
