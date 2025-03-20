// AprobacionView.jsx
import { createSignal } from "solid-js";

const defaultMinCost = 250; // Umbral mínimo para aprobar recetas

// Solicitudes de servicios médicos simuladas
const initialServiceRequests = [
  {
    id: 1,
    hospital: "Hospital Central",
    affiliate: "12345",
    service: "Consulta General",
    monto: 500,
    isAffiliateValid: true,
    isUpToDate: true,
    hasCoverage: true,
    status: "Pendiente",
    authNumber: null,
    error: null,
  },
  {
    id: 2,
    hospital: "Hospital Regional",
    affiliate: "54321",
    service: "Cirugía Menor",
    monto: 3000,
    isAffiliateValid: false,
    isUpToDate: true,
    hasCoverage: true,
    status: "Pendiente",
    authNumber: null,
    error: null,
  },
];

// Solicitudes de medicinas simuladas
const initialMedicineRequests = [
  {
    id: 1,
    farmacia: "Farmacia Central",
    affiliate: "12345",
    medicine: "Antibiótico X",
    totalCost: 180, // Menor al umbral, se rechazaría
    status: "Pendiente",
    error: null,
  },
  {
    id: 2,
    farmacia: "Farmacia Salud",
    affiliate: "67890",
    medicine: "Vitamina C",
    totalCost: 300,
    status: "Pendiente",
    error: null,
  },
];

function AprobacionView() {
  const [serviceRequests, setServiceRequests] = createSignal(initialServiceRequests);
  const [medicineRequests, setMedicineRequests] = createSignal(initialMedicineRequests);

  // Función para aprobar solicitud de servicio
  const handleAprobarServicio = (id) => {
    const updatedRequests = serviceRequests().map((req) => {
      if (req.id === id) {
        // Validaciones simuladas
        if (!req.isAffiliateValid) {
          return { ...req, status: "Rechazado", error: "Afiliado no es válido" };
        }
        if (!req.isUpToDate) {
          return { ...req, status: "Rechazado", error: "Afiliado no está al día en sus pagos" };
        }
        if (!req.hasCoverage) {
          return { ...req, status: "Rechazado", error: "No tiene cobertura para este servicio" };
        }
        // Si pasa todas las validaciones, se aprueba y se genera un número de autorización
        const authNumber = "AUTH-" + Math.floor(Math.random() * 1000000);
        return { ...req, status: "Aprobado", authNumber, error: null };
      }
      return req;
    });
    setServiceRequests(updatedRequests);
  };

  // Función para rechazar manualmente solicitud de servicio
  const handleRechazarServicio = (id, reason) => {
    const updatedRequests = serviceRequests().map((req) => {
      if (req.id === id) {
        return { ...req, status: "Rechazado", error: reason };
      }
      return req;
    });
    setServiceRequests(updatedRequests);
  };

  // Función para aprobar solicitud de medicina
  const handleAprobarMedicina = (id) => {
    const updatedMedicines = medicineRequests().map((req) => {
      if (req.id === id) {
        if (req.totalCost < defaultMinCost) {
          return { ...req, status: "Rechazado", error: `El costo total es menor a Q${defaultMinCost}` };
        }
        return { ...req, status: "Aprobado", error: null };
      }
      return req;
    });
    setMedicineRequests(updatedMedicines);
  };

  // Función para rechazar manualmente solicitud de medicina
  const handleRechazarMedicina = (id, reason) => {
    const updatedMedicines = medicineRequests().map((req) => {
      if (req.id === id) {
        return { ...req, status: "Rechazado", error: reason };
      }
      return req;
    });
    setMedicineRequests(updatedMedicines);
  };

  return (
    <div class="container mt-4">
      <h1 class="mb-4">Aprobación de Solicitudes</h1>

      <h2>Solicitudes de Servicios Médicos</h2>
      {serviceRequests().map((req) => (
        <div class="card mb-3" key={req.id}>
          <div class="card-body">
            <h5 class="card-title">
              {req.hospital} - {req.service}
            </h5>
            <p class="card-text">
              Afiliado: {req.affiliate} <br />
              Monto: Q{req.monto} <br />
              Estado: {req.status} {req.authNumber ? `(Auth: ${req.authNumber})` : ""}
              <br />
              {req.error && <span class="text-danger">Error: {req.error}</span>}
            </p>
            {req.status === "Pendiente" && (
              <div>
                <button
                  class="btn btn-success me-2"
                  onClick={() => handleAprobarServicio(req.id)}
                >
                  Aprobar
                </button>
                <button
                  class="btn btn-danger"
                  onClick={() =>
                    handleRechazarServicio(req.id, "Manual: Rechazado por el administrador")
                  }
                >
                  Rechazar
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      <h2>Solicitudes de Medicinas</h2>
      {medicineRequests().map((req) => (
        <div class="card mb-3" key={req.id}>
          <div class="card-body">
            <h5 class="card-title">
              {req.farmacia} - {req.medicine}
            </h5>
            <p class="card-text">
              Afiliado: {req.affiliate} <br />
              Costo Total: Q{req.totalCost} <br />
              Estado: {req.status} <br />
              {req.error && <span class="text-danger">Error: {req.error}</span>}
            </p>
            {req.status === "Pendiente" && (
              <div>
                <button
                  class="btn btn-success me-2"
                  onClick={() => handleAprobarMedicina(req.id)}
                >
                  Aprobar
                </button>
                <button
                  class="btn btn-danger"
                  onClick={() =>
                    handleRechazarMedicina(req.id, "Manual: Rechazado por el administrador")
                  }
                >
                  Rechazar
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AprobacionView;
