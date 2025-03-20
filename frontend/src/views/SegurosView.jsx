import { createSignal, onMount } from "solid-js";
import {
    obtenerSeguros,
    obtenerSeguroPorId,
    crearSeguro,
    actualizarSeguro,
    eliminarSeguro
} from "../services/seguroService";

export default function SeguroForm() {
    const [seguros, setSeguros] = createSignal([]);
    const [formData, setFormData] = createSignal({
        nombre: "",
        codigo: "",
        direccion: "",
        telefono: "",
        correo: ""
    });
    const [editId, setEditId] = createSignal(null);

    onMount(async () => {
        const data = await obtenerSeguros();
        setSeguros(data);
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData(), [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId()) {
            await actualizarSeguro(editId(), formData());
            setEditId(null);
        } else {
            await crearSeguro(formData());
        }
        const data = await obtenerSeguros();
        setSeguros(data);
        setFormData({ nombre: "", codigo: "", direccion: "", telefono: "", correo: "" });
    };

    const handleEdit = async (id) => {
        const seguro = await obtenerSeguroPorId(id);
        setFormData(seguro);
        setEditId(id);
    };

    const handleDelete = async (id) => {
        await eliminarSeguro(id);
        const data = await obtenerSeguros();
        setSeguros(data);
    };

    return (
        <div class="container mt-4">
            <h2 class="text-center mb-4">Aseguradora</h2>

            

            <h3 class="mt-5">Aseguradora</h3>
            <table class="table table-striped mt-3">
                <thead class="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Código</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {seguros().map((seguro) => (
                        <tr>
                            <td>{seguro.nombre}</td>
                            <td>{seguro.codigo}</td>
                            <td>{seguro.direccion}</td>
                            <td>{seguro.telefono}</td>
                            <td>{seguro.correo}</td>
                            <td>
                                <button class="btn btn-warning btn-sm me-2" onClick={() => handleEdit(seguro._id)}>Editar</button>
                     
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}