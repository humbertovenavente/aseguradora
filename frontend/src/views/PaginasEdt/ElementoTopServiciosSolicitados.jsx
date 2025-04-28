import { createSignal, onMount } from "solid-js";
import { obtenerTopServiciosSolicitados } from "../../services/PaginasEdt/elementosService.js";

export default function ElementoTopServiciosSolicitados() {
  const [servicios, setServicios] = createSignal([]);

  onMount(async () => {
    try {
      const data = await obtenerTopServiciosSolicitados();
      setServicios(data);
    } catch (error) {
      console.error("Error al cargar servicios solicitados:", error);
    }
  });

  return (
    <>
      <style>
        {`
          .ranking-container {
            background: #f7f9fb;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }

          .ranking-item {
            background: #ffffff;
            border-radius: 15px;
            padding: 1rem;
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease;
          }

          .ranking-item:hover {
            transform: translateY(-5px);
          }

          .ranking-position {
            width: 60px;
            height: 60px;
            background: #026E81;
            border-radius: 50%;
            color: #fff;
            font-size: 1.5rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
          }

          .ranking-medal-1 {
            background: linear-gradient(135deg, #ffd700, #ffcc00); /* oro */
          }

          .ranking-medal-2 {
            background: linear-gradient(135deg, #c0c0c0, #d9d9d9); /* plata */
          }

          .ranking-medal-3 {
            background: linear-gradient(135deg, #cd7f32, #c06c2e); /* bronce */
          }

          .ranking-info h5 {
            margin: 0;
            font-size: 1.2rem;
            font-weight: bold;
            color: #026E81;
          }

          .ranking-info p {
            margin: 0;
            font-size: 0.95rem;
            color: #666;
          }
        `}
      </style>

      <div class="container my-5">
        <h2 class="text-center mb-5">Servicios Más Solicitados</h2>
        <div class="ranking-container">

          {servicios().map((servicio, index) => (
            <div class="ranking-item" key={index}>
              
              <div class={`ranking-position ${
                index === 0 ? "ranking-medal-1" : index === 1 ? "ranking-medal-2" : index === 2 ? "ranking-medal-3" : ""
              }`}>
                {index + 1}
              </div>

              <div class="ranking-info">
                <h5>{servicio.nombre}</h5>
                <p>{servicio.vecesSolicitado} veces solicitado</p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </>
  );
}
