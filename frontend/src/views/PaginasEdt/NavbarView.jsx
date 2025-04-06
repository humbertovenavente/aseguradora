import { createSignal, createResource, For } from "solid-js";
import { obtenerMenuPorTipo, actualizarMenu } from "../../services/menuService";

export default function AdminNavbarEditor() {
  const [menu, { mutate, refetch }] = createResource(() => "principal", obtenerMenuPorTipo);
  const [editando, setEditando] = createSignal(false);

  // Manejo de cambios en campos individuales
  const actualizarItem = (index, campo, valor) => {
    const nuevo = [...menu()?.items];
    nuevo[index][campo] = valor;
    mutate({ ...menu(), items: nuevo });
  };

  const agregarItem = () => {
    const nuevo = {
      titulo: "Nuevo",
      icono: "",
      ruta: "/nueva-ruta",
      permiso: "ver"
    };
    mutate({ ...menu(), items: [...menu()?.items, nuevo] });
  };

  const eliminarItem = (index) => {
    const nuevo = [...menu()?.items];
    nuevo.splice(index, 1);
    mutate({ ...menu(), items: nuevo });
  };

  const guardarCambios = async () => {
    await actualizarMenu("principal", menu());
    setEditando(false);
    await refetch();
    alert("¡Menú actualizado correctamente!");
  };

  return (
    <div class="container mt-4">
      <h2>🧭 Editor del Menú Principal</h2>

      <button class="btn btn-primary my-2" onClick={() => setEditando(true)}>
        Editar menú
      </button>

      {editando() && (
        <>
          <For each={menu()?.items ?? []}>
            {(item, index) => (
              <div class="mb-3 border rounded p-3 bg-light">
                <label>Título</label>
                <input
                  class="form-control mb-1"
                  value={item.titulo}
                  onInput={(e) => actualizarItem(index(), "titulo", e.target.value)}
                />
                <label>Ruta</label>
                <input
                  class="form-control mb-1"
                  value={item.ruta}
                  onInput={(e) => actualizarItem(index(), "ruta", e.target.value)}
                />
                <label>Icono</label>
                <input
                  class="form-control mb-1"
                  value={item.icono}
                  onInput={(e) => actualizarItem(index(), "icono", e.target.value)}
                />

                <button class="btn btn-danger mt-2" onClick={() => eliminarItem(index())}>
                  Eliminar
                </button>
              </div>
            )}
          </For>

          <button class="btn btn-secondary mt-2 me-2" onClick={agregarItem}>
            ➕ Agregar ítem
          </button>
          <button class="btn btn-success mt-2" onClick={guardarCambios}>
            💾 Guardar cambios
          </button>
        </>
      )}

      {!editando() && (
        <ul class="list-group mt-3">
          <For each={menu()?.items}>
            {(item) => (
              <li class="list-group-item">
                <strong>{item.titulo}</strong> – <code>{item.ruta}</code>
              </li>
            )}
          </For>
        </ul>
      )}
    </div>
  );
}
