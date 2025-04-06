import { createSignal } from "solid-js";
import "bootstrap/dist/css/bootstrap.min.css";

// Importamos los componentes de cada vista
import ClientesView from "./ClientesView";
import Citas from "./Citas";
import ReportesView from "./ReportesView";
import PolizasTM from "./PolizasTM";
import HospitalesTM from "./HospitalesTM";
import FichasTM from "./FichasTM";
import PagosView from "./PagosView";
import ServiciosTM from "./ServiciosTM";
import AprobacionView from "./AprobacionView";
import AprobacionOrgView from "./AprobacionOrgView";
import FarmaciasView from "./FarmaciasView";
import CopagoView from "./copagoView";
import DashboardTrabajadorView from "../components/DashboardTrabajadorView";


export default function PortalOperadoras() {
  const [vistaActual, setVistaActual] = createSignal("inicio");

  return (
    <div class="container-fluid py-4">
      <h2 class="text-center mb-4">🏥 Portal de Operadoras Telefónicas 📞</h2>

      {/* 📌 Barra de Navegación con Fondo Celeste */}
      <ul class="nav nav-tabs mb-4" style={{ backgroundColor: "#A1C7E0", padding: "10px", borderRadius: "5px" }}>
        <li class="nav-item">
          <button class={`nav-link ${vistaActual() === "clientes" ? "active" : ""}`} 
            style={{ backgroundColor: vistaActual() === "clientes" ? "#0099DD" : "" }} 
            onClick={() => setVistaActual("clientes")}>
            👥 Clientes
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
          <button class={`nav-link ${vistaActual() === "Fichas" ? "active" : ""}`} 
            onClick={() => setVistaActual("Fichas")}>
            🛠️ Fichas técnicas
          </button>
        </li>
        <li class="nav-item">
  <button
    class={`nav-link ${vistaActual() === "dashboard" ? "active" : ""}`}
    onClick={() => setVistaActual("dashboard")}
  >
    🧑‍💼 Dashboard Cliente
  </button>
</li>
<li class="nav-item">
  <button
    class={`nav-link ${vistaActual() === "servicios" ? "active" : ""}`}
    onClick={() => setVistaActual("servicios")}
  >
    🩺 servicios
  </button>
</li>


      </ul>


      {vistaActual() === "clientes" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📋 Gestión de Clientes</h5>
            <ClientesView />
          </div>

        </div>
      )}

      {vistaActual() === "polizas" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Administración de Pólizas</h5>
            <PolizasTM />
          </div>
        </div>
      )}

      {vistaActual() === "hospitales" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>🏥 Información de Hospitales</h5>
            <HospitalesTM />
          </div>
        </div>
      )}


{vistaActual() === "citas" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Buscar disponibilidad de citas en hospitales </h5>
          <Citas/>
          </div>
        </div>
      )}

{vistaActual() === "ARservicios" && (
        <div class="w-100">
        <div class="card p-3 mb-4 shadow-sm">
            <h5>📄Aprobación y rechazo de organizaciones </h5>
        <AprobacionOrgView/>
        </div>
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄Aprobación y rechazo de servicios </h5>
        <AprobacionView/>
        </div>
        </div>
      )}

{vistaActual() === "Reportes" && (
        <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄Generar reportes mensuales de servicios prestados </h5>
            <ReportesView/>
          </div>
        </div>
      )}

{vistaActual() === "Fichas" && (
  <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>📄 Ficha Técnica</h5>
            <FichasTM />
          </div>
  </div>
)}
{vistaActual() === "dashboard" && (
  <div class="w-100">
    <div class="card p-3 mb-4 shadow-sm">
      <DashboardTrabajadorView />
    </div>
  </div>
)}
{vistaActual() === "servicios" && (
  <div class="w-100">
          <div class="card p-3 mb-4 shadow-sm">
            <h5>🔍 Servicios Utilizados</h5>
            <ServiciosTM />
          </div>
  </div>
)}

    </div>
  );
}
