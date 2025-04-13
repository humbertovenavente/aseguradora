import { createSignal, onMount } from "solid-js";
import API_BASE_URL from "../config";

function FarmaciasView() {
  const [solicitudes, setSolicitudes] = createSignal([]);
  const [editValues, setEditValues] = createSignal({});

  // Función para cargar solicitudes de descuento (los datos ya incluyen: medicamento.nombre, farmacia y porcentajeDescuento)
  const cargarSolicitudes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/discount/medicamentos/listar`);
      const data = await response.json();
      setSolicitudes(data);
    } catch (error) {
      console.error("Error cargando solicitudes:", error);
    }
  };

  // Función para procesar (aprobar o rechazar) una solicitud
  // Se usa el _id de la solicitud (no del medicamento)
  const procesarSolicitud = async (solId, aprobar) => {
    try {
      const body = { aprobar, nuevoDescuento: editValues()[solId]?.nuevoDescuento || 0 };
      const response = await fetch(`${API_BASE_URL}/discount/procesar/${solId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        alert("Solicitud procesada");
        cargarSolicitudes();
      } else {
        alert("Error procesando solicitud");
      }
    } catch (error) {
      console.error("Error procesando la solicitud:", error);
    }
  };

  // Maneja cambios en el input para setear el nuevo descuento (en caso de aprobación)
  const handleInputChange = (solId, field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [solId]: { ...prev[solId], [field]: value },
    }));
  };

  onMount(cargarSolicitudes);

  return (
    <div class="container mt-4">
      <h2>Solicitudes de Descuento</h2>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Farmacia</th>
            <th>% Solic.</th>
            <th>Nuevo Descuento</th>
            <th>Aprobar</th>
            <th>Rechazar</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes().map((sol) => (
            <tr>
              <td>{sol.medicamento ? sol.medicamento.nombre : "No definido"}</td>
              <td>{sol.farmacia}</td>
              <td>{sol.porcentajeDescuento}%</td>
              <td>
                <input
                  type="number"
                  value={editValues()[sol._id]?.nuevoDescuento || ""}
                  onInput={(e) =>
                    handleInputChange(sol._id, "nuevoDescuento", Number(e.currentTarget.value))
                  }
                  class="form-control"
                />
              </td>
              <td>
                <button
                  class="btn btn-success"
                  onClick={() => procesarSolicitud(sol._id, true)}
                >
                  Aprobar
                </button>
              </td>
              <td>
                <button
                  class="btn btn-danger"
                  onClick={() => procesarSolicitud(sol._id, false)}
                >
                  Rechazar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FarmaciasView;