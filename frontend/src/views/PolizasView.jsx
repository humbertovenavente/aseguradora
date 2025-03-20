import { createSignal } from "solid-js";
import Polizas from "../components/Polizas";
import FormularioPoliza from "../components/FormularioPoliza";
import "bootstrap/dist/css/bootstrap.min.css";

function PolizasView() {
  const [polizaEdit, setPolizaEdit] = createSignal(null);

  const actualizarLista = () => {
    setPolizaEdit(null);
  };

  return (
    <div class="container">
      <h1 class="fw-bold text-center mt-4">Gestion de Polizas</h1>
      {polizaEdit() ? (
        <FormularioPoliza poliza={polizaEdit()} actualizarLista={actualizarLista} />
      ) : (
        <Polizas onEdit={setPolizaEdit} />
      )}
    </div>
  );
}

export default PolizasView;
