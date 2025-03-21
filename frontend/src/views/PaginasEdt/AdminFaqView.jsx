import { createSignal, onMount } from "solid-js";
import { obtenerFaq, actualizarFaq } from "../../services/PaginasEdt/faqService";

function AdminFaq() {
  const [items, setItems] = createSignal([]);

  onMount(async () => {
    try {
      const data = await obtenerFaq();
      if (data && data.items) {
        setItems(data.items);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("Error al obtener FAQ:", error);
    }
  });

  const handleItemChange = (index, field, value) => {
    const newItems = [...items()];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items(), { pregunta: "", respuesta: "" }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items().filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarFaq({ items: items() });
      alert("FAQ actualizada con éxito!");
    } catch (error) {
      console.error("Error al actualizar FAQ:", error);
      alert("Error al actualizar FAQ");
    }
  };

  return (
    <div class="container my-5">
      <h2 class="mb-4">Editar FAQ</h2>
      <form onSubmit={handleSubmit}>
        {items().map((item, index) => (
          <div class="card mb-3" key={index}>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label">Pregunta:</label>
                <input
                  type="text"
                  class="form-control"
                  value={item.pregunta}
                  onInput={(e) =>
                    handleItemChange(index, "pregunta", e.currentTarget.value)
                  }
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Respuesta:</label>
                <textarea
                  class="form-control"
                  rows="3"
                  value={item.respuesta}
                  onInput={(e) =>
                    handleItemChange(index, "respuesta", e.currentTarget.value)
                  }
                ></textarea>
              </div>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => handleRemoveItem(index)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        <div class="mb-3">
          <button
            type="button"
            class="btn btn-secondary"
            onClick={handleAddItem}
          >
            Agregar Pregunta
          </button>
        </div>
        <button type="submit" class="btn btn-primary">
          Guardar FAQ
        </button>
      </form>
    </div>
  );
}

export default AdminFaq;
