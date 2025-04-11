import { createSignal, createEffect } from "solid-js";
import { getUsuarios, asignarRol, desactivarUsuario } from "../services/usuariosService";
import { getRoles } from "../services/rolesService"; 
import { sendEmail } from "../utils/email";
import { crearClienteDesdeUsuario } from "../services/clientesService";
import { crearEmpleadoDesdeUsuario } from "../services/empleadoService";
import API_BASE_URL from "../config";  


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
          try {
            await asignarRol(selectedUser(), selectedRole());
      
            const user = usuarios().find(u => u._id === selectedUser());
      
            // Rol Cliente
            if (user && selectedRole() === "67d652411d30a899ff50a40e") {
              const responseClientes = await fetch(`${API_BASE_URL}/clientes`);
              const todosLosClientes = await responseClientes.json();
              const yaExisteCliente = todosLosClientes.find(c => c.usuarioId?._id === user._id);
      
              if (!yaExisteCliente) {
                await crearClienteDesdeUsuario(user._id, {
                  documento: "DOC" + Date.now(),
                  numeroAfiliacion: "AFI" + Date.now(),
                  direccion: "Dirección por defecto",
                  aseguradora: "67f84c1741019fe432da579c",
                });
              }
            }
      
            // Rol Empleado
            if (user && selectedRole() === "67d652351d30a899ff50a40c") {
              const responseEmpleados = await fetch(`${API_BASE_URL}/empleados`);
              const empleados = await responseEmpleados.json();
              const yaExisteEmpleado = empleados.find(e => e.usuarioId?._id === user._id);
      
              if (!yaExisteEmpleado) {
                await crearEmpleadoDesdeUsuario(user._id, {
                  nombre: "Nuevo",
                  apellido: "Nuevo",
                  documento: "DOC" + Date.now(),
                  telefono: "Sin teléfono",
                  direccion: "Dirección por defecto",
                  fechaNacimiento: new Date("2000-01-01"),
                  puesto: "Empleado general",
                  sucursal: "Sucursal principal"
                });
              }
            }
      
            // Envío de email al usuario activado
            const emailResponse = await sendEmail(user.correo, "activated");
            if (!emailResponse.success) {
              alert("Rol asignado, pero hubo un problema al enviar el correo.");
            } else {
              alert("Rol asignado correctamente.");
            }
      
            fetchUsuarios();
            closeModal();
          } catch (error) {
            console.error("Error al asignar rol o crear usuario:", error);
            alert("Error al asignar el rol o crear usuario.");
          }
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
