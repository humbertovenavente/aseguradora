import { createSignal, onMount } from "solid-js";
import { obtenerRedProveedores, actualizarRedProveedores } from "../../services/PaginasEdt/redProveedoresService";

function AdminRedProveedores() {
  const [proveedores, setProveedores] = createSignal([]);

  onMount(async () => {
    try {
      const data = await obtenerRedProveedores();
      if (data && data.proveedores) {
        setProveedores(data.proveedores);
      } else {
        setProveedores([]);
      }
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
    }
  });

  const handleItemChange = (index, field, value) => {
    const newProveedores = [...proveedores()];
    newProveedores[index][field] = value;
    setProveedores(newProveedores);
  };

  const handleAddProveedor = () => {
    setProveedores([...proveedores(), { nombre: "", descripcion: "", imagenUrl: "" }]);
  };

  const handleRemoveProveedor = (index) => {
    const newProveedores = proveedores().filter((_, i) => i !== index);
    setProveedores(newProveedores);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarRedProveedores({ proveedores: proveedores() });
      alert("Proveedores actualizados con éxito!");
    } catch (error) {
      console.error("Error al actualizar proveedores:", error);
      alert("Error al actualizar proveedores");
    }
  };

  return (
    <div class="container my-5">
      <h2 class="mb-4">Editar Proveedores</h2>
      <form onSubmit={handleSubmit}>
        {proveedores().map((proveedor, index) => (
          <div class="card mb-3" key={index}>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label">Nombre:</label>
                <input
                  type="text"
                  class="form-control"
                  value={proveedor.nombre}
                  onInput={(e) => handleItemChange(index, "nombre", e.currentTarget.value)}
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Descripción:</label>
                <textarea
                  class="form-control"
                  rows="3"
                  value={proveedor.descripcion}
                  onInput={(e) => handleItemChange(index, "descripcion", e.currentTarget.value)}
                ></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">URL de la imagen:</label>
                <input
                  type="text"
                  class="form-control"
                  value={proveedor.imagenUrl}
                  onInput={(e) => handleItemChange(index, "imagenUrl", e.currentTarget.value)}
                />
              </div>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => handleRemoveProveedor(index)}
              >
                Eliminar Proveedor
              </button>
            </div>
          </div>
        ))}
        <div class="mb-3">
          <button type="button" class="btn btn-secondary" onClick={handleAddProveedor}>
            Agregar Proveedor
          </button>
        </div>
        <button type="submit" class="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default AdminRedProveedores;
