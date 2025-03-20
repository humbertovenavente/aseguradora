import { createSignal, createEffect } from "solid-js";
import { crearPoliza, actualizarPoliza } from "../services/polizasService";
import { obtenerCoberturas } from "../services/coberturaService";
import { obtenerSeguros } from "../services/seguroService";

export default function FormularioPoliza({ poliza, actualizarLista }) {
  const [nombre, setNombre] = createSignal(poliza ? poliza.nombre : ""); // Nombre de la póliza

  const [coberturaId, setCoberturaId] = createSignal(poliza ? poliza.coberturaId?._id : ""); // ID de la cobertura
  const [id_seguro, setIdSeguro] = createSignal(poliza ? poliza.id_seguro?._id : ""); // ID del seguro
  const [costo, setCosto] = createSignal(poliza ? poliza.costo : ""); // Costo de la póliza
  const [vigencia, setVigencia] = createSignal(poliza ? poliza.vigencia : ""); // Fecha de vigencia

  const [coberturas, setCoberturas] = createSignal([]);
  const [seguros, setSeguros] = createSignal([]);

  // Cargar coberturas y seguros disponibles
  createEffect(async () => {
    setCoberturas(await obtenerCoberturas());
    setSeguros(await obtenerSeguros());
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Asegúrate de que se prevenga el comportamiento por defecto del formulario

    const nuevaPoliza = {
      nombre: nombre(),
      
      coberturaId: coberturaId(),
      id_seguro: id_seguro(),
      costo: costo(),
      vigencia: new Date(vigencia()), // Convierte la vigencia a un objeto Date si es necesario
    };

    try {
      if (poliza) {
        await actualizarPoliza(poliza._id, nuevaPoliza); // Actualiza la póliza si es edición
      } else {
        await crearPoliza(nuevaPoliza); // Crea la póliza si es nueva
      }
      actualizarLista(); // Actualiza la lista de pólizas
    } catch (error) {
      console.error("Error al guardar la póliza:", error);
      alert("Error al guardar la póliza: " + error.message); // Muestra el error si lo hay
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">{poliza ? "Editar Póliza" : "Nueva Póliza"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre de la Póliza</label>
          <input
            type="text"
            className="form-control"
            value={nombre()}
            onInput={(e) => setNombre(e.target.value)}
            required
          />
        </div>
       
        <div className="mb-3">
          <label className="form-label">Cobertura</label>
          <select className="form-control" value={coberturaId()} onChange={(e) => setCoberturaId(e.target.value)} required>
            <option value="">Selecciona una cobertura</option>
            {coberturas().map((cobertura) => (
              <option key={cobertura._id} value={cobertura._id}>
                {cobertura.nombre} - {cobertura.porcentajeCobertura}%
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Seguro</label>
          <select className="form-control" value={id_seguro()} onChange={(e) => setIdSeguro(e.target.value)} required>
            <option value="">Selecciona un seguro</option>
            {seguros().map((seguro) => (
              <option key={seguro._id} value={seguro._id}>
                {seguro.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Costo</label>
          <input type="number" className="form-control" value={costo()} onInput={(e) => setCosto(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Vigencia</label>
          <input type="date" className="form-control" value={vigencia()} onInput={(e) => setVigencia(e.target.value)} required />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            {poliza ? "Actualizar" : "Guardar"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => actualizarLista(null)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

