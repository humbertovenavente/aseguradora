import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PortalOperadoras() {
  const [clientes, setClientes] = createSignal([
    { id: "001", nombre: "Juan Pérez", documento: "20000303", estadoPago: "✅ Pagado" },
    { id: "002", nombre: "Carlos Gómez", documento: "12345678", estadoPago: "❌ No Pagado" },
    { id: "003", nombre: "María López", documento: "98765432", estadoPago: "✅ Pagado" },
  ]);

  const [hospitales, setHospitales] = createSignal([
    { nombre: "La Paz", codigo: "HPZ001", conectado: "✅ Sí", cobertura: "✅ Sí" },
    { nombre: "San Rafael", codigo: "SRA002", conectado: "✅ Sí", cobertura: "❌ No" },
    { nombre: "Santa María", codigo: "STM003", conectado: "❌ No", cobertura: "❌ No" },
  ]);

  const [polizas, setPolizas] = createSignal([
    { cliente: "Juan Pérez", poliza: "Seguro de Vida - 70%", vigencia: "12/12/2025" },
    { cliente: "Carlos Gómez", poliza: "Seguro Básico - 90%", vigencia: "05/08/2026" },
    { cliente: "María López", poliza: "Plan Premium - 100%", vigencia: "20/09/2027" },
  ]);

  const [actividad, setActividad] = createSignal([
    "✔ Registró a Juan Pérez",
    "✔ Asignó Póliza a Carlos Gómez",
    "❌ Intentó registrar cliente sin datos válidos",
    "✔ Consultó cobertura hospitalaria de María López",
  ]);

  const navigate = useNavigate();

  return (
    <div class="container py-4">
      <h2 class="text-center">🏥 Portal de Operadoras Telefónicas 📞</h2>

      {/* Barra de Navegación */}
      <nav class="nav nav-tabs mb-3">
        <a class="nav-link active" href="#">🏠 Inicio</a>
        <a class="nav-link" onClick={() => navigate("/clientes")} >📋 Clientes</a>
        <a class="nav-link" onClick={() => navigate("/polizas")} >📄 Pólizas</a>
        <a class="nav-link" onClick={() => navigate("/hospitales")} >🏥 Hospitales</a>
      </nav>

      {/* Información de Operadora */}
      <div class="card p-3 mb-4 shadow-sm">
        <p>👤 <strong>Nombre Operadora:</strong> Ana López</p>
        <p>🔑 <strong>Rol:</strong> Operadora Telefónica</p>
      </div>

      {/* Clientes Atendidos */}
      <div class="card p-3 mb-4 shadow-sm">
        <h5>📋 Clientes Atendidos</h5>
        <table class="table table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Estado Pago</th>
            </tr>
          </thead>
          <tbody>
            {clientes().map((cliente) => (
              <tr>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.documento}</td>
                <td>{cliente.estadoPago}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button class="btn btn-info me-2">🔍 Buscar Cliente</button>
        <button class="btn btn-primary">🆕 Agregar Cliente</button>
      </div>

      {/* Disponibilidad Hospitalaria */}
      <div class="card p-3 mb-4 shadow-sm">
        <h5>🏥 Disponibilidad Hospitalaria</h5>
        <table class="table table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th>Hospital</th>
              <th>Código</th>
              <th>Conectado</th>
              <th>Cobertura</th>
            </tr>
          </thead>
          <tbody>
            {hospitales().map((hospital) => (
              <tr>
                <td>{hospital.nombre}</td>
                <td>{hospital.codigo}</td>
                <td>{hospital.conectado}</td>
                <td>{hospital.cobertura}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button class="btn btn-info">🔍 Ver Hospitales</button>
      </div>

      {/* Pólizas Asignadas */}
      <div class="card p-3 mb-4 shadow-sm">
        <h5>📄 Pólizas Asignadas</h5>
        <table class="table table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th>Cliente</th>
              <th>Póliza</th>
              <th>Vigencia</th>
            </tr>
          </thead>
          <tbody>
            {polizas().map((poliza) => (
              <tr>
                <td>{poliza.cliente}</td>
                <td>{poliza.poliza}</td>
                <td>{poliza.vigencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button class="btn btn-primary">📌 Asignar Nueva Póliza</button>
      </div>

      {/* Registro de Actividad */}
      <div class="card p-3 mb-4 shadow-sm">
        <h5>📊 Registro de Actividad</h5>
        <ul class="list-group">
          {actividad().map((item) => (
            <li class="list-group-item">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
