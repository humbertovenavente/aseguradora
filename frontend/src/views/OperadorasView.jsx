import { createSignal } from "solid-js";
import "bootstrap/dist/css/bootstrap.min.css";

// Importamos los componentes de cada vista
import ClientesView from "./ClientesView";
import PolizasView from "./PolizasView";
import HospitalesView from "./HospitalesView";
import FichaTecnicaView from "./FichaTecnicaView";
import PagosView from "./PagosView";
import ServiciosView from "./ServiciosView";

export default function PortalOperadoras() {
  const [vistaActual, setVistaActual] = createSignal("inicio");

  return (
    <div class="container-fluid py-4">
      <h2 class="text-center mb-4">🏥 Portal de Operadoras Telefónicas 📞</h2>

      {/* 📌 Barra de Navegación con Fondo Celeste */}
      <ul class="nav nav-tabs mb-4" style={{ backgroundColor: "#A1C7E0", padding: "10px", borderRadius: "5px" }}>
        <li class="nav-item">
          <button class={`nav-link ${vistaActual() === "inicio" ? "active" : ""}`} 
            style={{ backgroundColor: vistaActual() === "inicio" ? "#0099DD" : "" }} 
            onClick={() => setVistaActual("inicio")}>
            🏠 Inicio
          </button>
        </li>
        <li class="nav-item">
          <button class={`nav-link ${vistaActual() === "clientes" ? "active" : ""}`} 
            style={{ backgroundColor: vistaActual() === "clientes" ? "#0099DD" : "" }} 
            onClick={() => setVistaActual("clientes")}>
            📋 Clientes
          </button>
        </li>
        <li class="nav-item">
          <button class={`nav-link ${vistaActual() === "polizas" ? "active" : ""}`} 
            style={{ backgroundColor: vistaActual() === "polizas" ? "#0099DD" : "" }} 
            onClick={() => setVistaActual("polizas")}>
            📄 Pólizas
          </button>
        </li>
        <li class="nav-item">
          <button class={`nav-link ${vistaActual() === "hospitales" ? "active" : ""}`} 
            style={{ backgroundColor: vistaActual() === "hospitales" ? "#0099DD" : "" }} 
            onClick={() => setVistaActual("hospitales")}>
            🏥 Hospitales
          </button>
        </li>
        <li class="nav-item">
          <button class={`nav-link ${vistaActual() === "farmacias" ? "active" : ""}`} 
            onClick={() => setVistaActual("farmacias")}>
            💊 Farmacias
          </button>
        </li>
        <li class="nav-item">
          <button class={`nav-link ${vistaActual() === "citas" ? "active" : ""}`} 
            onClick={() => setVistaActual("citas")}>
            📅 Citas Médicas
          </button>
        </li>
        <li class="nav-item">
          <button class={`nav-link ${vistaActual() === "ARservicios" ? "active" : ""}`} 
            onClick={() => setVistaActual("ARservicios")}>
            ✅ Aprobación/Rechazo
          </button>
        </li>
        <li class="nav-item">
          <button class={`nav-link ${vistaActual() === "Reportes" ? "active" : ""}`} 
            onClick={() => setVistaActual("Reportes")}>
            📊 Reportes
          </button>
        </li>
        <li class="nav-item">
          <button class={`nav-link ${vistaActual() === "Ventas" ? "active" : ""}`} 
            onClick={() => setVistaActual("Ventas")}>
            🛒 Ventas
          </button>
        </li>
        <li class="nav-item">
          <button class={`nav-link ${vistaActual() === "Accesos" ? "active" : ""}`} 
            onClick={() => setVistaActual("Accesos")}>
            🔐 Accesos
          </button>
        </li>
      </ul>

      {/* 📌 Contenido dinámico según la vista seleccionada */}
      {vistaActual() === "inicio" && (
        <div class="container-fluid">
          <h3 class="text-center mb-4">📞 Bienvenida, Ana López</h3>

          {/* Resumen de la Operadora */}
          <div class="card p-3 mb-4 shadow-sm">
            <p>👤 <strong>Operadora:</strong> Ana López</p>
            <p>🔑 <strong>Rol:</strong> Operadora Telefónica</p>
            <p>🕒 <strong>Última actividad:</strong> Registró un nuevo cliente hace 10 min</p>
          </div>

          {/* Estadísticas Generales */}
          <div class="row">
            <div class="col-md-4">
              <div class="card text-white bg-primary p-3 mb-3 shadow-sm">
                <h5>📋 Clientes Atendidos</h5>
                <h3>25</h3>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-white bg-success p-3 mb-3 shadow-sm">
                <h5>🏥 Hospitales Conectados</h5>
                <h3>10</h3>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-white bg-warning p-3 mb-3 shadow-sm">
                <h5>💳 Pagos Procesados</h5>
                <h3>18</h3>
              </div>
            </div>
          </div>

          {/* Accesos Rápidos */}
          <div class="card p-3 mb-4 shadow-sm">
            <h5>⚡ Accesos Rápidos</h5>
            <button class="btn btn-info me-2">🔍 Buscar Cliente</button>
            <button class="btn btn-primary me-2">🆕 Agregar Cliente</button>
            <button class="btn btn-success me-2">💳 Registrar Pago</button>
            <button class="btn btn-warning">📅 Agendar Cita</button>
          </div>

          {/* Últimos Registros */}
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📌 Últimos Clientes Agregados</h5>
            <table class="table table-bordered">
              <thead class="table-dark">
                <tr>
                  <th>📛 Nombre</th>
                  <th>📄 Documento</th>
                  <th>💰 Estado de Pago</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Juan Pérez</td><td>12345678</td><td>✅ Pagado</td></tr>
                <tr><td>María Gómez</td><td>87654321</td><td>❌ No Pagado</td></tr>
              </tbody>
            </table>
          </div>

          {/* Actividad Reciente */}
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📊 Actividad Reciente</h5>
            <ul class="list-group">
              <li class="list-group-item">✔ Se registró un nuevo cliente: Juan Pérez.</li>
              <li class="list-group-item">❌ Rechazada receta médica de María Gómez.</li>
              <li class="list-group-item">✅ Autorizado servicio de hospitalización para Pedro Ramírez.</li>
            </ul>
          </div>
        </div>
      )}


      {vistaActual() === "clientes" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📋 Gestión de Clientes</h5>
            <ClientesView />
          </div>

          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Ficha Técnica</h5>
            <FichaTecnicaView />
          </div>

          <div class="card p-3 mb-4 shadow-sm">
            <h5>💳 Pagos de Clientes</h5>
            <PagosView />
          </div>

          <div class="card p-3 mb-4 shadow-sm">
            <h5>🔍 Servicios Utilizados</h5>
            <ServiciosView />
          </div>
        </div>
      )}

      {vistaActual() === "polizas" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Administración de Pólizas</h5>
            <PolizasView />
          </div>
        </div>
      )}

      {vistaActual() === "hospitales" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>🏥 Información de Hospitales</h5>
            <HospitalesView />
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>🔍 Servicios Utilizados</h5>
            <ServiciosView />
          </div>
          <div class="card p-3 mb-4 shadow-sm"> 
        <h5>faltan citas</h5>
        </div>
        </div>
      )}

{vistaActual() === "farmacias" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Administración de Farmacias aprobadas por seguro </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Asignar medicamentos cubiertos y definir precio </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Autorizar o rechazar recetas medicas </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 razones de rechazo de recetas </h5>
          </div>
        </div>
      )}

{vistaActual() === "citas" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Buscar disponibilidad de citas en hospitales </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 agendar citas en hospitales </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 enviar ficha del cliente al hospital si no esta registrado </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 modificar o cancelar citas medicas </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 mostrar citas en un calendario mensual </h5>
          </div>
        </div>
      )}

{vistaActual() === "ARservicios" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄verificar si un cliente esta al dia con sus pagos </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 revisar si un servicio esta cubierto en el hospital correspondiente </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 generar un numero de autorizacion para servicios aprobaods </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 registrar aprobaciones y rechazos de servicios medicos y recetas </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 mostrar historial de servicios medicos aprobados y rechazados </h5>
          </div>
        </div>
      )}

{vistaActual() === "Reportes" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄Generar reportes mensuales de servicios prestados </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Calcular montos a pagar por hospitales y farmacias </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Exportar reportes en excel y enviar por correo  </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Consultar estados de facturacione n tiempo real  </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Ejecutar manualmente un proceso de corte de mes </h5>
          </div>
        </div>
      )}

{vistaActual() === "Ventas" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄Vender y registrar clientes nuevos </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Opcion para registrar y cobrar servicios en la llamada</h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 interfaz optimizada para agilizar gestión de ventas por telefono  </h5>
          </div>
        </div>
      )}

{vistaActual() === "Accesos" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄registro de acciones realizadas en el sistema (cambios de estado, aprobaciones) </h5>
          </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Auditoria de actividades realizadas </h5>
          </div>
        </div>
      )}

    </div>
  );
}
