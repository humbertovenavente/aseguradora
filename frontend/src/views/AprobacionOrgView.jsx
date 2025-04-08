import { createSignal, onMount } from "solid-js";
import {
  obtenerRecetas,
  obtenerMontoMinimo,
  actualizarMontoMinimo,
} from "../services/recetaService";

export default function AdminRecetas() {
  const [recetas, setRecetas] = createSignal([]);
  const [montoMinimo, setMontoMinimo] = createSignal(250);
  const [nuevoMonto, setNuevoMonto] = createSignal(250);

  const cargarDatos = async () => {
    try {
      const recetasData = await obtenerRecetas();
      const montoData = await obtenerMontoMinimo();
      setRecetas(recetasData);
      setMontoMinimo(montoData.valor);
      setNuevoMonto(montoData.valor);
    } catch (err) {
      console.error("Error cargando datos de recetas:", err);
    }
  };

  const actualizarMonto = async () => {
    try {
      await actualizarMontoMinimo(nuevoMonto());
      alert("Monto mínimo actualizado correctamente");
      setMontoMinimo(nuevoMonto());
      cargarDatos();
    } catch (err) {
      console.error("Error actualizando monto mínimo:", err);
    }
  };

  onMount(cargarDatos);

  return (
    <div class="container mt-4">
      <h2>Panel de Recetas</h2>

      <div class="card p-3 my-4">
        <h5>Monto mínimo actual: Q{montoMinimo()}</h5>
        <div class="d-flex gap-2 flex-wrap">
          <input
            type="number"
            class="form-control"
            value={nuevoMonto()}
            onInput={(e) => setNuevoMonto(+e.target.value)}
          />
          <button class="btn btn-primary" onClick={actualizarMonto}>
            Actualizar monto mínimo
          </button>
        </div>
      </div>

      <table class="table table-bordered table-striped">
        <thead class="thead-dark">
          <tr>
            <th>ID Receta</th>
            <th>Farmacia</th>
            <th>Cliente</th>
            <th>Póliza</th>
            <th>Monto</th>
            <th>Descuento</th>
            <th>Total a Pagar</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {recetas().map((r) => {
            const cliente = r.cliente;
            return (
              <tr>
                <td>{r.idReceta}</td>
                <td>{r.farmacia}</td>
                <td>{cliente ? `${cliente.nombre} ${cliente.apellido || ""}` : "No registrado"}</td>
                <td>{cliente?.polizaNombre || "Sin póliza"}</td>
                <td>Q{r.monto?.toFixed(2)}</td>
                <td>Q{r.descuento?.toFixed(2)}</td>
                <td>
                  Q{(r.estado === "aprobada" ? (r.monto - r.descuento) : r.monto).toFixed(2)}
                </td>
                <td>{r.estado}</td>
                <td>{new Date(r.fecha).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
