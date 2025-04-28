import { createSignal, onMount } from "solid-js";
import { obtenerTopEmpleados } from "../../services/PaginasEdt/elementosService.js";

export default function ElementoTopEmpleados() {
  const [empleados, setEmpleados] = createSignal([]);

  onMount(async () => {
    try {
      const data = await obtenerTopEmpleados();
      setEmpleados(data);
    } catch (error) {
      console.error("Error al cargar empleados:", error);
    }
  });

  return (
    <>
      <style>
        {`
          .empleado-container {
            background: #f7f9fb;
            border-radius: 20px;
            padding: 2rem;
          }

          .empleado-card {
            background: #fff;
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease;
            width: 320px;
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .empleado-card:hover {
            transform: translateY(-8px);
          }

          .empleado-circulo {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background-color: #026E81;
            margin-bottom: 1rem;
          }

          .empleado-nombre {
            font-size: 1.5rem;
            color: #026E81;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }

          .empleado-puesto {
            font-size: 1.1rem;
            color: #555;
            margin-bottom: 0.5rem;
          }

          .empleado-fecha {
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

          @media (max-width: 768px) {
            .empleado-card {
              width: 90%;
            }
          }
        `}
      </style>

      <div class="container my-5">
        <h2 class="text-center mb-5">Empleados Destacados</h2>
        <div class="empleado-container">

          <div class="row row-cols-1 row-cols-md-3 g-4">
            {empleados().map((empleado, index) => (
              <div class="col" key={index}>
                <div class="empleado-card">

                  <div class="empleado-circulo"></div>

                  <div class="empleado-nombre">{empleado.nombre}</div>
                  <div class="empleado-puesto">{empleado.puesto}</div>
                  <div class="empleado-fecha">
                    Desde: {new Date(empleado.fechaIngreso).toLocaleDateString()}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
