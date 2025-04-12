import { createSignal, onMount, For, Show } from "solid-js";
import { obtenerCitas, actualizarCita } from "../services/citaService";
import { obtenerHospitales } from "../services/hospitalService";
import { obtenerServicios } from "../services/servicioService";
import { enviarCitaAlHospital } from "../services/citaSolicitud";
import Modal from "bootstrap/js/dist/modal";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ManageCitas() {
  const [citas, setCitas] = createSignal([]);
  const [hospitales, setHospitales] = createSignal([]);
  const [servicios, setServicios] = createSignal([]);
  const [modalRef, setModalRef] = createSignal(null);
  const [citaSeleccionada, setCitaSeleccionada] = createSignal(null);
  const [formData, setFormData] = createSignal({});
  const [errorMensaje, setErrorMensaje] = createSignal("");

  const fetchData = async () => {
    const data = await obtenerCitas();
    setCitas(data);
    const hosps = await obtenerHospitales();
    setHospitales(hosps);
    const servs = await obtenerServicios();
    setServicios(servs);
  };

  onMount(() => {
    fetchData();
  });

  const abrirModal = (cita) => {
    setCitaSeleccionada(cita);
    setErrorMensaje("");
    setFormData({
      fecha: cita.fecha.slice(0, 10),
      horaInicio: cita.horaInicio,
      horaFin: cita.horaFin,
      motivo: cita.motivo,
      idHospital: cita.idHospital._id,
      idServicio: cita.idServicio._id,
    });
    const modal = new Modal(document.getElementById("editarModal"));
    setModalRef(modal);
    modal.show();
  };

  const handleChange = (e) => {
    setFormData({ ...formData(), [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    const citaId = citaSeleccionada()._id;
    const { fecha, horaInicio, horaFin, motivo, idHospital, idServicio } = formData();

    const fechaDate = new Date(fecha);

    if (isNaN(fechaDate.getTime())) {
      setErrorMensaje("⚠️ Fecha inválida al actualizar cita.");
      return;
    }

    try {
      const citaData = {
        fecha: fechaDate.toISOString(),
        horaInicio,
        horaFin,
        motivo,
        idHospital,
        idServicio,
      };

      await actualizarCita(citaId, citaData);
      modalRef().hide();
      await fetchData();
    } catch (err) {
      setErrorMensaje(err.response?.data?.mensaje || "Error al actualizar la cita.");
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarCita(id, { estado: nuevoEstado });

      if (nuevoEstado === "Confirmada") {
        const citaConfirmada = citas().find((c) => c._id === id);
        if (!citaConfirmada) return;

        const payload = {
          dpi: citaConfirmada.idPaciente?.documento,
          nombre: citaConfirmada.idPaciente?.nombre,
          apellido: citaConfirmada.idPaciente?.apellido,
          fecha: citaConfirmada.fecha,
          horaInicio: citaConfirmada.horaInicio,
          horaFin: citaConfirmada.horaFin,
          motivo: citaConfirmada.motivo,
          idHospital: citaConfirmada.idHospital?._id,
          idServicio: citaConfirmada.idServicio?._id,
          idAseguradora: citaConfirmada.idAseguradora?._id || null,
          numeroAutorizacion: citaConfirmada.numeroAutorizacion || "GEN-AUTO",
        };

        try {
          await enviarCitaAlHospital(payload);
          alert("✅ Cita confirmada y enviada al hospital.");
        } catch (error) {
          alert("⚠️ La cita fue confirmada, pero hubo un error al enviarla al hospital.");
        }
      }

      await fetchData();
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al actualizar el estado.");
    }
  };

  return (
    <div class="container mt-4">
      <h2>Gestión de Citas</h2>
      <table class="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>Cita</th>
            <th>Paciente</th>
            <th>Documento</th>
            <th>Hospital</th>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Motivo</th>
            <th>Aseguradora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <For each={citas()}>
            {(cita) => (
              <tr>
                <td>{cita._id.slice(-6)}</td>
                <td>{cita.idPaciente?.nombre} {cita.idPaciente?.apellido}</td>
                <td>{cita.idPaciente?.documento}</td>
                <td>{cita.idHospital?.nombre}</td>
                <td>{cita.idServicio?.nombre}</td>
                <td>{cita.fecha?.slice(0, 10)}</td>
                <td>{cita.horaInicio}</td>
                <td>{cita.horaFin}</td>
                <td>{cita.motivo}</td>
                <td>{cita.idAseguradora?.nombre || "N/A"}</td>
                <td>{cita.estado}</td>
                <td>
                  <button class="btn btn-primary btn-sm me-1" onClick={() => abrirModal(cita)}>Editar</button>
                  <Show when={cita.estado === "Pendiente"}>
                    <button class="btn btn-success btn-sm me-1" onClick={() => cambiarEstado(cita._id, "Confirmada")}>Aprobar</button>
                    <button class="btn btn-danger btn-sm" onClick={() => cambiarEstado(cita._id, "Cancelada")}>Cancelar</button>
                  </Show>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>

      <div class="modal fade" id="editarModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Editar Cita</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <Show when={errorMensaje()}>
                <div class="alert alert-danger">{errorMensaje()}</div>
              </Show>
              <label>Fecha:</label>
              <input type="date" class="form-control mb-2" name="fecha" value={formData().fecha} onInput={handleChange} />
              <label>Hora Inicio:</label>
              <input type="time" class="form-control mb-2" name="horaInicio" value={formData().horaInicio} onInput={handleChange} />
              <label>Hora Fin:</label>
              <input type="time" class="form-control mb-2" name="horaFin" value={formData().horaFin} onInput={handleChange} />
              <label>Motivo:</label>
              <input type="text" class="form-control mb-2" name="motivo" value={formData().motivo} onInput={handleChange} />
              <label>Hospital:</label>
              <select class="form-control mb-2" name="idHospital" value={formData().idHospital} onChange={handleChange}>
                <For each={hospitales()}>
                  {(h) => <option value={h._id}>{h.nombre}</option>}
                </For>
              </select>
              <label>Servicio:</label>
              <select class="form-control mb-2" name="idServicio" value={formData().idServicio} onChange={handleChange}>
                <For each={servicios()}>
                  {(s) => <option value={s._id}>{s.nombre}</option>}
                </For>
              </select>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button class="btn btn-primary" onClick={guardarCambios}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}