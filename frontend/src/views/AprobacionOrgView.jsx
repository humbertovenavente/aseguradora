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
      const data = await obtenerRecetas();
      setRecetas(data);
      const mt = await obtenerMontoMinimo();
      setMontoMinimo(mt.valor);
      setNuevoMonto(mt.valor);
    } catch (err) {
      console.error("Error cargando datos de recetas:", err);
    }
  };

  const actualizarMonto = async () => {
    try {
      await actualizarMontoMinimo(nuevoMonto());
      setMontoMinimo(nuevoMonto());
      await cargarDatos();
      alert("Monto mínimo actualizado correctamente");
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
            <th>Código</th>
            <th>Farmacia</th>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Descuento</th>
            <th>Total a Pagar</th>
            <th>Estado Seguro</th>
            <th>Fecha Emisión</th>
          </tr>
        </thead>
        <tbody>
          {recetas().map((r) => {
            // Mostrar nombre completo si vino poblado, si no el ID
            const clienteNombre =
              r.cliente && typeof r.cliente === "object"
                ? `${r.cliente.nombre} ${r.cliente.apellido || ""}`
                : r.cliente;

            const total      = r.total      ?? 0;
            const descuento  = r.descuento  ?? 0;
            const totalFinal = r.totalFinal ?? total;
            const estado     = r.estadoSeguro;
            const fecha      = new Date(r.fechaEmision);

            return (
              <tr key={r.codigo}>
                <td>{r.codigo}</td>
                <td>{r.farmacia}</td>
                <td>{clienteNombre}</td>
                <td>Q{total.toFixed(2)}</td>
                <td>Q{descuento.toFixed(2)}</td>
                <td>Q{totalFinal.toFixed(2)}</td>
                <td>{estado}</td>
                <td>{fecha.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
