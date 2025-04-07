import { createSignal, createEffect } from "solid-js";
import {
  generarReporteHospital,
  obtenerReportesPorMes,
  eliminarReporte
} from "../services/reportesService";
import { format } from "date-fns";
import emailjs from "@emailjs/browser";

export default function ReportesMensualesView() {
  const hoy = new Date();
  const mesActual = format(hoy, "yyyy-MM");
  const [mes, setMes] = createSignal(mesActual);
  const [reportes, setReportes] = createSignal([]);
  const [cargando, setCargando] = createSignal(false);
  const [correoDestino, setCorreoDestino] = createSignal("");
  const [enviandoCorreo, setEnviandoCorreo] = createSignal(false);
  const [modalVisible, setModalVisible] = createSignal(false);
  const [reporteSeleccionado, setReporteSeleccionado] = createSignal(null);

  createEffect(() => {
    cargarReportes();
  });

  const cargarReportes = async () => {
    try {
      setCargando(true);
      const data = await obtenerReportesPorMes("hospital", mes());
      const ordenados = data.sort((a, b) => new Date(b.fechaGeneracion) - new Date(a.fechaGeneracion));
      setReportes(ordenados);
    } catch (err) {
      console.error("Error al obtener reportes:", err);
    } finally {
      setCargando(false);
    }
  };

  const manejarGenerar = async () => {
    const confirmar = confirm("¿Deseas generar el reporte del mes actual?");
    if (!confirmar) return;

    try {
      setCargando(true);
      await generarReporteHospital(mes());
      alert("Reporte generado correctamente.");
      await cargarReportes();
    } catch (err) {
      alert("Error al generar reporte.");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const manejarEliminar = async (id) => {
    const confirmar = confirm("¿Estás seguro que deseas eliminar este reporte?");
    if (!confirmar) return;

    try {
      await eliminarReporte(id);
      alert("Reporte eliminado correctamente.");
      await cargarReportes();
    } catch (err) {
      alert("Error al eliminar reporte.");
      console.error(err);
    }
  };

  const manejarAbrirModal = (reporte) => {
    setReporteSeleccionado(reporte);
    setCorreoDestino("");
    setModalVisible(true);
  };

  const enviarCorreo = async () => {
    if (!correoDestino() || !reporteSeleccionado()) {
      alert("Por favor, ingresa un correo válido.");
      return;
    }

    setEnviandoCorreo(true);

    const nombreArchivo = reporteSeleccionado().archivoExcelUrl.split("/").pop();

    const templateParams = {
        file_name: `reportes/${nombreArchivo}`,
        period: mes(),
        to_email: correoDestino(),
        attachment: reporteSeleccionado().archivoExcelBase64
      };
      

    try {
      await emailjs.send(
        "service_tst77nt",
        "template_tmm6do4",
        templateParams,
        "YnI0y5QCdPsyVachN"
      );
      alert("Correo enviado correctamente con el archivo adjunto.");
      setModalVisible(false);
    } catch (error) {
      console.error("Error al enviar correo:", error);
      alert("Hubo un error al enviar el correo.");
    } finally {
      setEnviandoCorreo(false);
    }
  };

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString();
  };

  const serviciosUnicos = (servicios) => {
    const set = new Set();
    servicios.forEach(s => set.add(s.servicioNombre));
    return Array.from(set).join(", ");
  };

  return (
    <div class="container mt-4">
      <h2>Reportes Mensuales de Hospitales</h2>

      <div class="mb-3">
        <label for="mes">Mes:</label>
        <input
          type="month"
          id="mes"
          class="form-control"
          value={mes()}
          onInput={(e) => setMes(e.target.value)}
        />
      </div>

      <button class="btn btn-primary mb-3" onClick={manejarGenerar}>
        Generar Reporte Manual
      </button>

      {cargando() ? (
        <p>Cargando reportes...</p>
      ) : reportes().length === 0 ? (
        <p>No hay reportes generados para este mes.</p>
      ) : (
        <>
          <p><strong>Mostrando {reportes().length} reporte(s)</strong></p>
          {reportes().map((reporte) => (
            <div class="card mb-3" key={reporte._id}>
              <div class="card-body">
                <h5 class="card-title">{reporte.nombreEntidad}</h5>
                <p><strong>Total del mes:</strong> ${reporte.totalMes}</p>
                <p><strong>Servicios:</strong> {serviciosUnicos(reporte.servicios)}</p>
                <p><strong>Generado el:</strong> {formatearFecha(reporte.fechaGeneracion)}</p>
                <a
                  class="btn btn-success me-2"
                  href={`http://localhost:5001/${reporte.archivoExcelUrl}`}
                  download
                >
                  Descargar Excel
                </a>
                <button class="btn btn-danger me-2" onClick={() => manejarEliminar(reporte._id)}>
                  Eliminar
                </button>
                <button class="btn btn-secondary" onClick={() => manejarAbrirModal(reporte)}>
                  Enviar correo
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Modal de correo */}
      {modalVisible() && (
        <div class="modal d-block" style="background-color: rgba(0,0,0,0.5)">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Enviar Reporte por Correo</h5>
                <button type="button" class="btn-close" onClick={() => setModalVisible(false)}></button>
              </div>
              <div class="modal-body">
                <label>Correo destinatario:</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="ejemplo@correo.com"
                  value={correoDestino()}
                  onInput={(e) => setCorreoDestino(e.target.value)}
                />
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" onClick={() => setModalVisible(false)}>
                  Cancelar
                </button>
                <button class="btn btn-primary" onClick={enviarCorreo} disabled={enviandoCorreo()}>
                  {enviandoCorreo() ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
