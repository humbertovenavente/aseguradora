import { createSignal } from "solid-js";
import { sendEmail } from "../utils/email";

export default function ReportesView() {
  const [nombre, setNombre] = createSignal("");
  const [correo, setCorreo] = createSignal("");
  const [mensaje, setMensaje] = createSignal("");
  const [error, setError] = createSignal("");
  const [exito, setExito] = createSignal("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    try {
      // Se utiliza sendEmail para enviar el mensaje de contacto
      // Se asume que la función sendEmail acepta un tercer parámetro para datos adicionales
      const respuesta = await sendEmail(correo(), "contact", { nombre: nombre(), mensaje: mensaje() });
      if (respuesta.success) {
        setExito("Mensaje enviado exitosamente.");
      } else {
        setError("Error al enviar el mensaje.");
      }
    } catch (err) {
      setError("Error al enviar el mensaje.");
    }
  };

  return (
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Contacto</h1>
      <form onSubmit={handleSubmit} class="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre()}
          onInput={(e) => setNombre(e.currentTarget.value)}
          class="border p-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={correo()}
          onInput={(e) => setCorreo(e.currentTarget.value)}
          class="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Mensaje"
          value={mensaje()}
          onInput={(e) => setMensaje(e.currentTarget.value)}
          class="border p-2 rounded w-full"
        ></textarea>
        <button type="submit" class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Enviar
        </button>
      </form>
      {error() && <p class="text-red-600 mt-4">{error()}</p>}
      {exito() && <p class="text-green-600 mt-4">{exito()}</p>}
    </div>
  );
}
