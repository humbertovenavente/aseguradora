import { createSignal, createResource, For } from "solid-js";
import { obtenerMenuPorTipo } from "../../services/menuService";
import { crearPropuesta } from "../../services/moderacionService";

export default function AdminNavbarEditor() {
  const [menu, { mutate, refetch }] = createResource(() => "principal", obtenerMenuPorTipo);
  const [editando, setEditando] = createSignal(false);

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
    const usuario = JSON.parse(localStorage.getItem("usuario"))?.correo;

    if (!usuario) {
      alert("⚠️ No se pudo identificar al usuario logueado.");
      return;
    }

    const propuesta = {
      pagina: "navbar",
      contenido: {
        tipo: "principal",       // 👈 necesario para el switch-case del backend
        items: menu().items,     // solo mandamos lo necesario
      },
      creadoPor: usuario
    };

    try {
      await crearPropuesta(propuesta);
      setEditando(false);
      alert("✅ Propuesta enviada para revisión");
    } catch (error) {
      console.error("Error al enviar propuesta:", error);
      alert("❌ Error al enviar propuesta");
    }
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
            💾 Enviar a moderación
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
