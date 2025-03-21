import { createSignal } from "solid-js";

function FarmaciasView() {
  return (
    <>
      <style>{`
        .farmacias-card {
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border-radius: 8px;
          padding: 1.5rem;
          transition: transform 0.2s ease;
          background-color: #fff;
          margin-bottom: 1rem;
        }
        .farmacias-card:hover {
          transform: translateY(-3px);
        }
        .farmacias-btn {
          font-size: 1rem;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
        }
      `}</style>
      <div class="w-100">
        <div class="farmacias-card">
          <h5>📄 Administración de Farmacias aprobadas por seguro</h5>
          <p>Gestiona las farmacias aprobadas para el seguro.</p>
          <button class="btn btn-primary farmacias-btn">Gestionar Farmacias</button>
        </div>
        <div class="farmacias-card">
          <h5>📄 Asignar medicamentos cubiertos y definir precio</h5>
          <p>Configura los medicamentos cubiertos y establece sus precios.</p>
          <button class="btn btn-primary farmacias-btn">Asignar Medicamentos</button>
        </div>
        <div class="farmacias-card">
          <h5>📄 Autorizar o rechazar recetas médicas</h5>
          <p>Revisa y decide la autorización de las recetas médicas.</p>
          <button class="btn btn-primary farmacias-btn">Gestionar Recetas</button>
        </div>
        <div class="farmacias-card">
          <h5>📄 Razones de rechazo de recetas</h5>
          <p>Consulta y define las razones por las cuales se rechazan recetas.</p>
          <button class="btn btn-primary farmacias-btn">Ver Razones</button>
        </div>
      </div>
    </>
  );
}

export default FarmaciasView;
