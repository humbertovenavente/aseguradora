// src/views/FarmaciasSolicitudesView.jsx
import { createSignal, onMount } from "solid-js";
import {
  fetchFarmacias,
  crearFarmacia,
  editarFarmacia,
  eliminarFarmacia,
  procesarSolicitudDescuento
} from "../utils/api";

export default function FarmaciasSolicitudesView() {
  // — CRUD Farmacias —
  const [farmacias, setFarmacias]   = createSignal([]);
  const [editId, setEditId]         = createSignal(null);
  const [nombre, setNombre]         = createSignal("");
  const [baseUrl, setBaseUrl]       = createSignal("");
  const [crudMsg, setCrudMsg]       = createSignal("");

  // — Solicitudes —
  const [solicitudes, setSolicitudes]  = createSignal([]);
  const [selectedBaseUrl, setSelected] = createSignal("");
  const [msg, setMsg]                  = createSignal("");

  // Carga inicial de farmacias
  const cargarFarmacias = async () => {
    try {
      setFarmacias(await fetchFarmacias());
    } catch (err) {
      console.error("Error cargando farmacias:", err);
    }
  };

  onMount(() => {
    cargarFarmacias();
  });

  // Submit del formulario (crear o editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCrudMsg("");
    try {
      if (editId()) {
        await editarFarmacia(editId(), { nombre: nombre(), baseUrl: baseUrl() });
        setCrudMsg("✅ Farmacia actualizada");
      } else {
        await crearFarmacia({ nombre: nombre(), baseUrl: baseUrl() });
        setCrudMsg("✅ Farmacia creada");
      }
      setEditId(null);
      setNombre("");
      setBaseUrl("");
      await cargarFarmacias();
    } catch (err) {
      console.error(err);
      setCrudMsg("❌ " + err.message);
    }
  };

  // Iniciar edición
  const handleEdit = (f) => {
    setEditId(f._id);
    setNombre(f.nombre);
    setBaseUrl(f.baseUrl);
    setCrudMsg("");
  };

  // Borrar farmacia
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar esta farmacia?")) return;
    try {
      await eliminarFarmacia(id);
      setCrudMsg("🗑️ Farmacia eliminada");
      if (selectedBaseUrl() === farmacias().find(f => f._id === id)?.baseUrl) {
        setSolicitudes([]);
        setSelected("");
      }
      await cargarFarmacias();
    } catch (err) {
      console.error(err);
      setCrudMsg("❌ " + err.message);
    }
  };

  // Al seleccionar farmacia, cargo sus solicitudes
  const handleSelect = async (e) => {
    const base = e.currentTarget.value;
    setSelected(base);
    setMsg("");
    if (!base) {
      setSolicitudes([]);
      return;
    }
    try {
      const res = await fetch(`${base}/discount/listar`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setSolicitudes(data.map(sol => ({ ...sol, farmaciaBaseUrl: base })));
    } catch (err) {
      console.error("Error cargando solicitudes:", err);
      setSolicitudes([]);
    }
  };

  // Aprobar / Rechazar solicitud
  const handleProcesar = async (sol, aprobar) => {
    setMsg("");
    try {
      await procesarSolicitudDescuento(
        sol.farmaciaBaseUrl,
        sol._id,
        aprobar,
        sol.nuevoDescuento
      );
      setMsg(aprobar ? "✅ Solicitud aprobada" : "❌ Solicitud rechazada");
      // recargo las solicitudes de la misma farmacia
      await handleSelect({ currentTarget: { value: selectedBaseUrl() } });
    } catch (err) {
      console.error("Error procesando solicitud:", err);
      setMsg("❌ Error al procesar solicitud");
    }
  };

  return (
    <div class="container mt-4">

      {/* — Formulario Crear / Editar Farmacia — */}
      <h4>{editId() ? "Editar Farmacia" : "Registrar Nueva Farmacia"}</h4>
      <form onSubmit={handleSubmit} class="row g-2 align-items-end mb-3">
        <div class="col-md-5">
          <label class="form-label">Nombre</label>
          <input
            class="form-control"
            value={nombre()}
            onInput={e => setNombre(e.currentTarget.value)}
            placeholder="Ej. Farmacia Central"
            required
          />
        </div>
        <div class="col-md-5">
          <label class="form-label">URL base</label>
          <input
            class="form-control"
            value={baseUrl()}
            onInput={e => setBaseUrl(e.currentTarget.value)}
            placeholder="Ej. http://192.168.1.50:5000"
            required
          />
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary w-100">
            {editId() ? "Guardar" : "Agregar"}
          </button>
        </div>
      </form>
      {crudMsg() && <div class="alert alert-info">{crudMsg()}</div>}

      <hr/>

      {/* — Selector de Farmacia para ver solicitudes — */}
      <h4>Solicitudes de Descuento</h4>
      <select class="form-select mb-3" onChange={handleSelect} value={selectedBaseUrl()}>
        <option value="">-- Selecciona una farmacia --</option>
        {farmacias().map(f => (
          <option key={f._id} value={f.baseUrl}>
            {f.nombre} ({f.baseUrl})
          </option>
        ))}
      </select>
      {msg() && <div class="alert alert-info">{msg()}</div>}

      {/* — Tabla de Solicitudes — */}
      <table class="table table-striped mb-5">
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>% Solicitado</th>
            <th>Estado</th>
            <th>Aprobar</th>
            <th>Rechazar</th>
          </tr>
        </thead>
        <tbody>
          {!selectedBaseUrl() && (
            <tr><td colSpan="5" class="text-center text-muted">Elige una farmacia arriba</td></tr>
          )}
          {selectedBaseUrl() && solicitudes().length === 0 && (
            <tr><td colSpan="5" class="text-center text-muted">Sin solicitudes</td></tr>
          )}
          {solicitudes().map(sol => (
            <tr key={sol._id}>
              <td>{sol.medicamento?.nombre ?? "–"}</td>
              <td>{sol.porcentajeDescuento}%</td>
              <td>{sol.estado}</td>
              <td>
                <button
                  class="btn btn-sm btn-success"
                  onClick={() => handleProcesar(sol, true)}
                  disabled={sol.estado !== "pendiente"}
                >✅</button>
              </td>
              <td>
                <button
                  class="btn btn-sm btn-danger"
                  onClick={() => handleProcesar(sol, false)}
                  disabled={sol.estado !== "pendiente"}
                >❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr/>

      {/* — Tabla de Farmacias (Edición + Borrado) — */}
      <h4>Farmacias Registradas</h4>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>URL Base</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {farmacias().map(f => (
            <tr key={f._id}>
              <td>{f.nombre}</td>
              <td><code>{f.baseUrl}</code></td>
              <td>
                <button class="btn btn-sm btn-warning me-2" onClick={() => handleEdit(f)}>✎ Editar</button>
                <button class="btn btn-sm btn-danger" onClick={() => handleDelete(f._id)}>🗑️ Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
