import { createSignal } from "solid-js";

const initialHospitals = [
  { id: 1, nombre: "Hospital Central", codigo: "HC-001", direccion: "Av. Reforma 123", status: "Pendiente", motivo: "" },
  { id: 2, nombre: "Hospital Regional", codigo: "HR-002", direccion: "Calle 8 #456", status: "Pendiente", motivo: "" },
];

const initialPharmacies = [
  { id: 1, nombre: "Farmacia Central", codigo: "FC-001", direccion: "Av. 5 de Mayo 789", status: "Pendiente", motivo: "" },
  { id: 2, nombre: "Farmacia Salud", codigo: "FS-002", direccion: "Blvd. Los Próceres 101", status: "Pendiente", motivo: "" },
];

function AprobacionOrgView() {
  const [hospitals, setHospitals] = createSignal(initialHospitals);
  const [pharmacies, setPharmacies] = createSignal(initialPharmacies);

  const updateStatus = (listSignal, id, newStatus, reason = "") => {
    const updated = listSignal().map(item =>
      item.id === id ? { ...item, status: newStatus, motivo: reason } : item
    );
    listSignal === hospitals ? setHospitals(updated) : setPharmacies(updated);
  };

  return (
    <div class="container mt-5">
      <h1 class="mb-4">Aprobación de Hospitales y Farmacias</h1>

      {/* Sección Hospitales */}
      <section class="mb-5">
        <h2>Hospitales Pendientes</h2>
        {hospitals().map(h => (
          <div class="card mb-3" key={h.id}>
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5>{h.nombre}</h5>
                <small>Código: {h.codigo} — Dirección: {h.direccion}</small>
                <p class="mt-1">
                  Estado: 
                  <span class={`badge ms-2 ${h.status === "Aprobado" ? "bg-success" : h.status === "Rechazado" ? "bg-danger" : "bg-warning"}`}>
                    {h.status}
                  </span>
                </p>
                {h.motivo && <p class="text-danger">Motivo: {h.motivo}</p>}
              </div>
              {h.status === "Pendiente" && (
                <div>
                  <button class="btn btn-success me-2" onClick={() => updateStatus(hospitals, h.id, "Aprobado")}>
                    Aprobar
                  </button>
                  <button class="btn btn-danger" onClick={() => updateStatus(hospitals, h.id, "Rechazado", "No cumple requisitos")}>
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Sección Farmacias */}
      <section>
        <h2>Farmacias Pendientes</h2>
        {pharmacies().map(f => (
          <div class="card mb-3" key={f.id}>
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5>{f.nombre}</h5>
                <small>Código: {f.codigo} — Dirección: {f.direccion}</small>
                <p class="mt-1">
                  Estado:
                  <span class={`badge ms-2 ${f.status === "Aprobado" ? "bg-success" : f.status === "Rechazado" ? "bg-danger" : "bg-warning"}`}>
                    {f.status}
                  </span>
                </p>
                {f.motivo && <p class="text-danger">Motivo: {f.motivo}</p>}
              </div>
              {f.status === "Pendiente" && (
                <div>
                  <button class="btn btn-success me-2" onClick={() => updateStatus(pharmacies, f.id, "Aprobado")}>
                    Aprobar
                  </button>
                  <button class="btn btn-danger" onClick={() => updateStatus(pharmacies, f.id, "Rechazado", "No cumple requisitos")}>
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AprobacionOrgView;
