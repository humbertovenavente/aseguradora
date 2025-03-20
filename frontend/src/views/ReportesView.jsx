// ReportesView.jsx
import { createSignal, onMount } from "solid-js";

const hospitalesDataFicticia = [
  {
    id: 1,
    nombreHospital: "Hospital Central",
    mes: 3,
    anio: 2025,
    servicios: [
      {
        servicio: "Consulta General",
        costoSeguro: 500,
        costoRealHospital: 700,
        polizaCubierta: "90%",
        comentarios: "Cliente estable",
      },
      {
        servicio: "Rayos X",
        costoSeguro: 800,
        costoRealHospital: 1000,
        polizaCubierta: "90%",
        comentarios: "Se necesitó radiografía de pierna",
      },
    ],
    totalPagar: 1300,
  },
  {
    id: 2,
    nombreHospital: "Hospital Regional",
    mes: 3,
    anio: 2025,
    servicios: [
      {
        servicio: "Cirugía Menor",
        costoSeguro: 3000,
        costoRealHospital: 4000,
        polizaCubierta: "70%",
        comentarios: "Apendicitis",
      },
    ],
    totalPagar: 3000,
  },
  {
    id: 3,
    nombreHospital: "Hospital del Norte",
    mes: 2,
    anio: 2025,
    servicios: [
      {
        servicio: "Consulta Pediatría",
        costoSeguro: 400,
        costoRealHospital: 600,
        polizaCubierta: "90%",
        comentarios: "Revisión de rutina",
      },
    ],
    totalPagar: 400,
  },
];

const farmaciasDataFicticia = [
  {
    id: 1,
    nombreFarmacia: "Farmacia Central",
    mes: 3,
    anio: 2025,
    medicinas: [
      {
        nombre: "Antibiótico X",
        costoSeguro: 100,
        costoRealFarmacia: 150,
        polizaCubierta: "90%",
        comentarios: "Tratamiento de infección leve",
      },
      {
        nombre: "Analgésico Y",
        costoSeguro: 50,
        costoRealFarmacia: 70,
        polizaCubierta: "90%",
        comentarios: "Para dolor postoperatorio",
      },
    ],
    totalPagar: 150,
  },
  {
    id: 2,
    nombreFarmacia: "Farmacia Salud",
    mes: 3,
    anio: 2025,
    medicinas: [
      {
        nombre: "Vitamina C",
        costoSeguro: 80,
        costoRealFarmacia: 100,
        polizaCubierta: "70%",
        comentarios: "Refuerzo de defensas",
      },
    ],
    totalPagar: 80,
  },
  {
    id: 3,
    nombreFarmacia: "Farmacia del Norte",
    mes: 2,
    anio: 2025,
    medicinas: [
      {
        nombre: "Antialérgico Z",
        costoSeguro: 60,
        costoRealFarmacia: 80,
        polizaCubierta: "70%",
        comentarios: "Alergia estacional",
      },
    ],
    totalPagar: 60,
  },
];

function ReportesView() {
  // Se inicializan con valores por defecto para mostrar el reporte inmediatamente
  const [mesSeleccionado, setMesSeleccionado] = createSignal("3");
  const [anioSeleccionado, setAnioSeleccionado] = createSignal("2025");

  // Señales para los reportes filtrados
  const [hospitalesFiltrados, setHospitalesFiltrados] = createSignal([]);
  const [farmaciasFiltradas, setFarmaciasFiltradas] = createSignal([]);
  const [totalGlobal, setTotalGlobal] = createSignal(0);

  // Función para filtrar los datos según mes y año
  const handleGenerarReporte = (e) => {
    e?.preventDefault();
    const mesNum = Number(mesSeleccionado());
    const anioNum = Number(anioSeleccionado());

    const hospFiltrados = hospitalesDataFicticia.filter(
      (h) => h.mes === mesNum && h.anio === anioNum
    );
    const farmaFiltradas = farmaciasDataFicticia.filter(
      (f) => f.mes === mesNum && f.anio === anioNum
    );

    const totalHosp = hospFiltrados.reduce((acc, h) => acc + h.totalPagar, 0);
    const totalFarm = farmaFiltradas.reduce((acc, f) => acc + f.totalPagar, 0);

    setHospitalesFiltrados(hospFiltrados);
    setFarmaciasFiltradas(farmaFiltradas);
    setTotalGlobal(totalHosp + totalFarm);
  };

  // Ejecutar al montar el componente para que se muestre el reporte de inmediato
  onMount(() => {
    handleGenerarReporte();
  });

  const handleEnviarCorreo = () => {
    alert("Reporte enviado a cada hospital y farmacia (simulado).");
    console.log("Hospitales:", hospitalesFiltrados());
    console.log("Farmacias:", farmaciasFiltradas());
    console.log("Total global:", totalGlobal());
  };

  return (
    <div class="container mt-4">
      <h1 class="mb-4">Reportes Mensuales del Seguro</h1>

      {/* Formulario de selección (puede actualizarse para filtrar otro mes/año) */}
      <form onSubmit={handleGenerarReporte} class="mb-4">
        <div class="row mb-3">
          <div class="col-md-6">
            <label class="form-label">Mes (1-12):</label>
            <input
              type="number"
              min="1"
              max="12"
              class="form-control"
              value={mesSeleccionado()}
              onInput={(e) => setMesSeleccionado(e.currentTarget.value)}
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Año:</label>
            <input
              type="number"
              min="2020"
              class="form-control"
              value={anioSeleccionado()}
              onInput={(e) => setAnioSeleccionado(e.currentTarget.value)}
              required
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Actualizar Reporte</button>
      </form>

      {/* Mostrar reporte detallado */}
      {hospitalesFiltrados().length === 0 && farmaciasFiltradas().length === 0 ? (
        <p>No hay datos para el mes y año seleccionados.</p>
      ) : (
        <>
          <h2>Detalle de Servicios por Hospital</h2>
          {hospitalesFiltrados().map((hospital) => (
            <div class="card mb-4" key={hospital.id}>
              <div class="card-header">
                <strong>{hospital.nombreHospital}</strong> - Total a Pagar: Q{hospital.totalPagar}
              </div>
              <div class="card-body">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Servicio</th>
                      <th>Costo Seguro</th>
                      <th>Costo Real</th>
                      <th>Póliza Cubierta</th>
                      <th>Comentarios</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospital.servicios.map((serv, idx) => (
                      <tr key={idx}>
                        <td>{serv.servicio}</td>
                        <td>Q{serv.costoSeguro}</td>
                        <td>Q{serv.costoRealHospital}</td>
                        <td>{serv.polizaCubierta}</td>
                        <td>{serv.comentarios}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <h2>Detalle de Medicinas por Farmacia</h2>
          {farmaciasFiltradas().map((farmacia) => (
            <div class="card mb-4" key={farmacia.id}>
              <div class="card-header">
                <strong>{farmacia.nombreFarmacia}</strong> - Total a Pagar: Q{farmacia.totalPagar}
              </div>
              <div class="card-body">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Medicina</th>
                      <th>Costo Seguro</th>
                      <th>Costo Real</th>
                      <th>Póliza Cubierta</th>
                      <th>Comentarios</th>
                    </tr>
                  </thead>
                  <tbody>
                    {farmacia.medicinas.map((med, idx) => (
                      <tr key={idx}>
                        <td>{med.nombre}</td>
                        <td>Q{med.costoSeguro}</td>
                        <td>Q{med.costoRealFarmacia}</td>
                        <td>{med.polizaCubierta}</td>
                        <td>{med.comentarios}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div class="alert alert-info">
            <h4>Total Global a Pagar: Q{totalGlobal()}</h4>
          </div>

          <button onClick={handleEnviarCorreo} class="btn btn-secondary">
            Enviar Reporte por Correo
          </button>
        </>
      )}
    </div>
  );
}

export default ReportesView;
