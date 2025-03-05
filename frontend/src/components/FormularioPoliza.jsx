import { createSignal, createEffect } from "solid-js";
import { crearPoliza, actualizarPoliza } from "../services/polizasService";

export default function FormularioPoliza({ poliza, actualizarLista }) {
    const [nombre, setNombre] = createSignal(poliza ? poliza.nombre : "");
    const [tipoCobertura, setTipoCobertura] = createSignal(poliza ? poliza.tipoCobertura : "");
    const [porcentajeCobertura, setPorcentajeCobertura] = createSignal(poliza ? poliza.porcentajeCobertura : "");
    const [costo, setCosto] = createSignal(poliza ? poliza.costo : "");
    const [vigencia, setVigencia] = createSignal(poliza ? poliza.vigencia : "");

    createEffect(() => {
        if (poliza) {
            setNombre(poliza.nombre);
            setTipoCobertura(poliza.tipoCobertura);
            setPorcentajeCobertura(poliza.porcentajeCobertura);
            setCosto(poliza.costo);
            setVigencia(poliza.vigencia);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevaPoliza = { 
            nombre: nombre(), 
            tipoCobertura: tipoCobertura(), 
            porcentajeCobertura: porcentajeCobertura(), 
            costo: costo(), 
            vigencia: vigencia() 
        };

        if (poliza) {
            await actualizarPoliza(poliza._id, nuevaPoliza);
        } else {
            await crearPoliza(nuevaPoliza);
        }

        actualizarLista(); // Oculta el formulario y recarga la lista
    };

    return (
        <div className="container mt-4">
            <h2 className="fw-bold">{poliza ? "Editar Póliza" : "Nueva Póliza"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={nombre()} onInput={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo de Cobertura</label>
                    <input type="text" className="form-control" value={tipoCobertura()} onInput={(e) => setTipoCobertura(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Porcentaje de Cobertura</label>
                    <input type="number" className="form-control" value={porcentajeCobertura()} onInput={(e) => setPorcentajeCobertura(e.target.value)} required />
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
