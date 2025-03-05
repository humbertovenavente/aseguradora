import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import Polizas from "./components/Polizas";
import FormularioPoliza from "./components/FormularioPoliza";
import "bootstrap/dist/css/bootstrap.min.css";

const App: Component = () => {
    const [polizaEdit, setPolizaEdit] = createSignal(null);

    return (
        <div className="container">
            <h1 className="fw-bold text-center mt-4">Sistema de Aseguradora</h1>
            {polizaEdit() !== null ? (
                <FormularioPoliza poliza={polizaEdit()} actualizarLista={() => setPolizaEdit(null)} />
            ) : (
                <Polizas onEdit={setPolizaEdit} />
            )}
        </div>
    );
};

export default App;
