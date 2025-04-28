import { createSignal } from "solid-js";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5001/api/resultados";

const Resultados = () => {
  const [resultados, setResultados] = createSignal([]);
  const [mensaje, setMensaje] = createSignal("");
  const [busqueda, setBusqueda] = createSignal("");

  const buscarResultados = async () => {
    const criterio = busqueda().trim();

    if (!criterio) {
      setMensaje("⚠️ Ingrese un ID de cita o documento para buscar.");
      setResultados([]);
      return;
    }

    try {
      const response = await axios.get(API_URL);
      const filtrados = response.data.filter(
        (r) => r.idCita === criterio || r.documento === criterio
      );

      if (filtrados.length > 0) {
        setResultados(filtrados);
        setMensaje("");
      } else {
        setResultados([]);
        setMensaje(" No se encontraron resultados con ese criterio.");
      }
    } catch (error) {
      console.error(" Error al buscar resultados:", error);
      setMensaje("Error al buscar los resultados.");
    }
  };

  return (
    <div class="container mt-5">
      <h2 class="mb-4 text-center"> Resultados Enviados por el Hospital</h2>

      {/*  Buscador */}
      <div class="d-flex mb-3 gap-2">
        <input
          type="text"
          class="form-control"
          placeholder="Buscar por ID de cita o documento"
          value={busqueda()}
          onInput={(e) => setBusqueda(e.target.value)}
        />
        <button class="btn btn-primary" onClick={buscarResultados}>
          Buscar
        </button>
      </div>

      {/* Mensaje */}
      {mensaje() && <div class="alert alert-info">{mensaje()}</div>}

      {/* Tabla */}
      {resultados().length > 0 && (
        <table class="table table-striped table-bordered text-center">
          <thead class="table-primary">
            <tr>
              <th>ID CITA</th>
              <th>PACIENTE</th>
              <th>DOCUMENTO</th>
              <th>DOCTOR ASIGNADO</th>
              <th>DIAGNÓSTICO</th>
              <th>RESULTADOS</th>
              <th>FECHA</th>
            </tr>
          </thead>
          <tbody>
            {resultados().map((item) => (
              <tr>
                <td>{item.idCita}</td>
                <td>{item.nombre} {item.apellido}</td>
                <td>{item.documento}</td>
                <td>{item.doctor || "Sin asignar"}</td>
                <td>{item.diagnostico}</td>
                <td>{item.resultados}</td>
                <td>{new Date(item.fecha).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Resultados;
