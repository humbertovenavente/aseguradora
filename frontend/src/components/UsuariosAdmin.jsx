import { createSignal, createEffect } from "solid-js";
import { getUsuarios, asignarRol, desactivarUsuario } from "../services/usuariosService";
import { getRoles } from "../services/rolesService"; 
const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = createSignal([]);
    const [roles, setRoles] = createSignal([]);
    const [selectedUser, setSelectedUser] = createSignal(null);
    const [selectedRole, setSelectedRole] = createSignal("");

    // Cargar usuarios y roles
    const fetchUsuarios = async () => {
        const data = await getUsuarios();
        setUsuarios(data);
    };

    const fetchRoles = async () => {
        const data = await getRoles();
        setRoles(data);
    };

    createEffect(() => {
        fetchUsuarios();
        fetchRoles();
    });

    // Manejar la asignación de rol y activación de usuario
    const handleAsignarRol = async () => {
        if (selectedUser() && selectedRole()) {
            await asignarRol(selectedUser(), selectedRole());
            fetchUsuarios(); // Recargar la lista de usuarios
            closeModal();
        }
    };

    // Abrir el modal con el usuario seleccionado
    const openModal = (userId) => {
        setSelectedUser(userId);
        document.getElementById("modalRoles").style.display = "block";
    };

    // Cerrar el modal
    const closeModal = () => {
        document.getElementById("modalRoles").style.display = "none";
        setSelectedUser(null);
        setSelectedRole("");
    };

    return (
        <div class="container">
            <h2>Administrar Usuarios</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Fecha Creación</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios().map(usuario => (
                        <tr>
                            <td>{usuario.correo}</td>
                            <td>{usuario.contrasena}</td>
                            <td>{new Date(usuario.fecha_creacion).toLocaleDateString()}</td>
                            <td>{usuario.rol_id ? usuario.rol_id.role_name : "Sin rol"}</td>
                            <td>{usuario.estado === 1 ? "Activo" : "Inactivo"}</td>
                            <td>
                                {usuario.estado === 0 ? (
                                    <button
                                        class="btn btn-success"
                                        onClick={() => openModal(usuario._id)}
                                    >
                                        Asignar Rol y Activar
                                    </button>
                                ) : (
                                    <button
                                        class="btn btn-danger"
                                        onClick={() => desactivarUsuario(usuario._id).then(fetchUsuarios)}
                                    >
                                        Desactivar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para asignar rol */}
            <div id="modalRoles" class="modal" style="display: none;">
                <div class="modal-content">
                    <h3>Seleccionar Rol</h3>
                    <select class="form-control" onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="">Seleccione un rol</option>
                        {roles().map(rol => (
                            <option value={rol._id}>{rol.role_name}</option>
                        ))}
                    </select>
                    <br />
                    <button class="btn btn-primary" onClick={handleAsignarRol}>Asignar y Activar</button>
                    <button class="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};


export default UsuariosAdmin;
