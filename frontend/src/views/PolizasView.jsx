import { createSignal } from "solid-js";
import Polizas from "../components/Polizas";
import FormularioPoliza from "../components/FormularioPoliza";
import "bootstrap/dist/css/bootstrap.min.css";

function PolizasView() {
  const [polizaEdit, setPolizaEdit] = createSignal(null);

  return (
    <div class="container">
      <h1 class="fw-bold text-center mt-4">Sistema de Aseguradora</h1>
      {polizaEdit() !== null ? (
        <FormularioPoliza
          poliza={polizaEdit()}
          actualizarLista={() => setPolizaEdit(null)}
        />
      ) : (
        <Polizas onEdit={setPolizaEdit} />
      )}
    </div>
  );
}

export default PolizasView;
