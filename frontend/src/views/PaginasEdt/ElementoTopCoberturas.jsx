import { createSignal, onMount } from "solid-js";
import { obtenerTopCoberturas } from "../../services/PaginasEdt/elementosService.js";

export default function ElementoTopCoberturas() {
  const [coberturas, setCoberturas] = createSignal([]);

  onMount(async () => {
    try {
      const data = await obtenerTopCoberturas();
      setCoberturas(data);
    } catch (error) {
      console.error("Error al cargar coberturas:", error);
    }
  });

  return (
    <>
      <style>
        {`
          .circle-container {
            position: relative;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: conic-gradient(
              #ff4c4c var(--percentage),
              #e9ecef var(--percentage)
            );
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
          }

          .circle-percentage {
            position: absolute;
            font-size: 1.8rem;
            font-weight: bold;
            color: #333;
          }

          .cobertura-card {
            background: #ffffff;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
            text-align: center;
            transition: all 0.3s ease;
            margin-bottom: 2rem;
          }

          .cobertura-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          }

          .cobertura-title {
            font-size: 1.4rem;
            font-weight: bold;
            color: #026E81;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }

          .cobertura-usage {
            font-size: 1rem;
            color: #6c757d;
            margin-top: 0.5rem;
          }
        `}
      </style>

      <div class="container my-5">
        <h2 class="text-center mb-5">Coberturas Más Usadas</h2>
        <div class="row justify-content-center">
          {coberturas().map((cobertura, index) => (
            <div class="col-md-4 col-sm-6" key={index}>
              <div class="cobertura-card">
                {/* 🔥 Círculo generado con CSS */}
                <div
                  class="circle-container"
                  style={{ "--percentage": `${cobertura.porcentaje}%` }}
                >
                  <div class="circle-percentage">{cobertura.porcentaje}%</div>
                </div>

                <h4 class="cobertura-title">{cobertura.nombre}</h4>
                <div class="cobertura-usage">
                  Usada {cobertura.vecesUsada} veces
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
