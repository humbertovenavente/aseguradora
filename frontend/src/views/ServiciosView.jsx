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
        setFormData({
            nombre: seguro.nombre,
            codigo: seguro.codigo,
            direccion: seguro.direccion,
            telefono: seguro.telefono,
            correo: seguro.correo
        });
        setEditId(id);
    };

    const handleDelete = async (id) => {
        const confirmar = confirm("¿Estás seguro de eliminar este seguro?");
        if (confirmar) {
            await eliminarSeguro(id);
            const data = await obtenerSeguros();
            setSeguros(data);
        }
    };

    return (
        <div class="container mt-4">
            <h2 class="text-center mb-4">Gestión de Aseguradoras</h2>

            {/* Formulario */}
            <form onSubmit={handleSubmit} class="mb-4">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Nombre</label>
                        <input
                            type="text"
                            class="form-control"
                            name="nombre"
                            value={formData().nombre}
                            onInput={handleChange}
                            required
                        />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Código</label>
                        <input
                            type="text"
                            class="form-control"
                            name="codigo"
                            value={formData().codigo}
                            onInput={handleChange}
                            required
                        />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Dirección</label>
                        <input
                            type="text"
                            class="form-control"
                            name="direccion"
                            value={formData().direccion}
                            onInput={handleChange}
                            required
                        />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Teléfono</label>
                        <input
                            type="text"
                            class="form-control"
                            name="telefono"
                            value={formData().telefono}
                            onInput={handleChange}
                            required
                        />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Correo</label>
                        <input
                            type="email"
                            class="form-control"
                            name="correo"
                            value={formData().correo}
                            onInput={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">
                    {editId() ? "Actualizar Seguro" : "Crear Seguro"}
                </button>
                {editId() && (
                    <button
                        type="button"
                        class="btn btn-secondary ms-2"
                        onClick={() => {
                            setFormData({
                                nombre: "",
                                codigo: "",
                                direccion: "",
                                telefono: "",
                                correo: ""
                            });
                            setEditId(null);
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            {/* Tabla de seguros */}
            <h3 class="mt-5">Listado de Aseguradoras</h3>
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
                                <button
                                    class="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(seguro._id)}
                                >
                                    Editar
                                </button>
                                <button
                                    class="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(seguro._id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
