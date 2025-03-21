import { createSignal, onMount, Show } from "solid-js";
import {
  obtenerEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado
} from "../services/empleadoService.js";

const EmpleadosView = () => {
  const [empleados, setEmpleados] = createSignal([]);
  const [showModal, setShowModal] = createSignal(false);
  const [isEdit, setIsEdit] = createSignal(false);

  const [usuarioActual, setUsuarioActual] = createSignal({
    correo: "",
    contrasena: "",
    rol_id: "67d652351d30a899ff50a40c"
  });

  const [empleadoActual, setEmpleadoActual] = createSignal({
    nombre: "",
    apellido: "",
    documento: "",
    telefono: "",
    fechaNacimiento: "",
    direccion: "",
    detallesTrabajo: {
      puesto: "",
      sucursal: "",
      fechaIngreso: "",
      estado: "activo"
    }
  });

  onMount(async () => {
    await cargarEmpleados();
  });

  const cargarEmpleados = async () => {
    try {
      const data = await obtenerEmpleados();
      setEmpleados(data);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  const abrirModalCrear = () => {
    setIsEdit(false);
    setEmpleadoActual({
      nombre: "",
      apellido: "",
      documento: "",
      telefono: "",
      fechaNacimiento: "",
      direccion: "",
      detallesTrabajo: {
        puesto: "",
        sucursal: "",
        fechaIngreso: "",
        estado: "activo"
      }
    });
    setUsuarioActual({
      correo: "",
      contrasena: "",
      rol_id: "67d652351d30a899ff50a40c"
    });
    setShowModal(true);
  };

  const abrirModalEditar = (empleado) => {
    setIsEdit(true);
    setEmpleadoActual({ ...empleado });
    setUsuarioActual({
      correo: empleado.usuarioId?.correo || "",
      contrasena: "",
      rol_id: "67d652351d30a899ff50a40c"
    });
    setShowModal(true);
  };

  const guardarEmpleado = async (e) => {
    e.preventDefault();
    try {
      const empleadoData = { ...empleadoActual() };
      const usuarioData = { ...usuarioActual() };
  
      // Aplanar los campos que el servidor espera
      const payload = {
        ...empleadoData,
        puesto: empleadoData.detallesTrabajo.puesto,
        sucursal: empleadoData.detallesTrabajo.sucursal,
        fechaIngreso: empleadoData.detallesTrabajo.fechaIngreso,
        estado: empleadoData.detallesTrabajo.estado,
        ...usuarioData,
      };
  
      if (isEdit()) {
        await actualizarEmpleado(empleadoActual()._id, payload);
      } else {
        await crearEmpleado(payload);
      }
  
      setShowModal(false);
      await cargarEmpleados();
    } catch (error) {
      console.error("Error al guardar empleado:", error);
    }
  };
  

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar este empleado?")) {
      try {
        await eliminarEmpleado(id);
        await cargarEmpleados();
      } catch (error) {
        console.error("Error al eliminar empleado:", error);
      }
    }
  };

  return (
    <div class="container mt-4">
      <h2 class="mb-3">Empleados</h2>
      <button class="btn btn-primary mb-3" onClick={abrirModalCrear}>
        Agregar Empleado
      </button>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Documento</th>
            <th>Teléfono</th>
            <th>Fecha de Nacimiento</th>
            <th>Dirección</th>
            <th>Puesto</th>
            <th>Sucursal</th>
            <th>Fecha de Ingreso</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados().map((emp) => (
            <tr key={emp._id}>
              <td>{emp.nombre}</td>
              <td>{emp.apellido}</td>
              <td>{emp.usuarioId?.correo || "Sin correo"}</td>
              <td>{emp.documento}</td>
              <td>{emp.telefono}</td>
              <td>{new Date(emp.fechaNacimiento).toLocaleDateString()}</td>
              <td>{emp.direccion}</td>
              <td>{emp.detallesTrabajo.puesto}</td>
              <td>{emp.detallesTrabajo.sucursal}</td>
              <td>{new Date(emp.detallesTrabajo.fechaIngreso).toLocaleDateString()}</td>
              <td>{emp.detallesTrabajo.estado === "activo" ? "Activo" : "Inactivo"}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" onClick={() => abrirModalEditar(emp)}>
                  Editar
                </button>
                <button class="btn btn-danger btn-sm" onClick={() => handleEliminar(emp._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Show when={showModal()}>
        <div class="modal fade show d-block" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <form onSubmit={guardarEmpleado}>
                <div class="modal-header">
                  <h5 class="modal-title">
                    {isEdit() ? "Editar Empleado" : "Nuevo Empleado"}
                  </h5>
                  <button type="button" class="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label class="form-label">Nombre</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      value={empleadoActual().nombre}
                      onInput={(e) =>
                        setEmpleadoActual({ ...empleadoActual(), nombre: e.target.value })
                      }
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Apellido</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      value={empleadoActual().apellido}
                      onInput={(e) =>
                        setEmpleadoActual({ ...empleadoActual(), apellido: e.target.value })
                      }
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Correo</label>
                    <input
                      type="email"
                      class="form-control"
                      required
                      value={usuarioActual().correo}
                      onInput={(e) =>
                        setUsuarioActual({ ...usuarioActual(), correo: e.target.value })
                      }
                    />
                  </div>
                  {/* Campo de Contraseña */}
                  <div class="mb-3">
                    <label class="form-label">Contraseña</label>
                    <input
                      type="password"
                      class="form-control"
                      required
                      value={usuarioActual().contrasena}
                      onInput={(e) =>
                        setUsuarioActual({ ...usuarioActual(), contrasena: e.target.value })
                      }
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Documento</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      value={empleadoActual().documento}
                      onInput={(e) =>
                        setEmpleadoActual({ ...empleadoActual(), documento: e.target.value })
                      }
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Teléfono</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      value={empleadoActual().telefono}
                      onInput={(e) =>
                        setEmpleadoActual({ ...empleadoActual(), telefono: e.target.value })
                      }
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      class="form-control"
                      required
                      value={empleadoActual().fechaNacimiento}
                      onInput={(e) =>
                        setEmpleadoActual({ ...empleadoActual(), fechaNacimiento: e.target.value })
                      }
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Dirección</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      value={empleadoActual().direccion}
                      onInput={(e) =>
                        setEmpleadoActual({ ...empleadoActual(), direccion: e.target.value })
                      }
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Puesto</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      value={empleadoActual().detallesTrabajo.puesto}
                      onInput={(e) =>
                        setEmpleadoActual({
                          ...empleadoActual(),
                          detallesTrabajo: {
                            ...empleadoActual().detallesTrabajo,
                            puesto: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Sucursal</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      value={empleadoActual().detallesTrabajo.sucursal}
                      onInput={(e) =>
                        setEmpleadoActual({
                          ...empleadoActual(),
                          detallesTrabajo: {
                            ...empleadoActual().detallesTrabajo,
                            sucursal: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Fecha de Ingreso</label>
                    <input
                      type="date"
                      class="form-control"
                      required
                      value={empleadoActual().detallesTrabajo.fechaIngreso}
                      onInput={(e) =>
                        setEmpleadoActual({
                          ...empleadoActual(),
                          detallesTrabajo: {
                            ...empleadoActual().detallesTrabajo,
                            fechaIngreso: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Estado</label>
                    <select
                      class="form-select"
                      required
                      value={empleadoActual().detallesTrabajo.estado}
                      onChange={(e) =>
                        setEmpleadoActual({
                          ...empleadoActual(),
                          detallesTrabajo: {
                            ...empleadoActual().detallesTrabajo,
                            estado: e.target.value
                          }
                        })
                      }
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                    </select>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" class="btn btn-primary">
                    {isEdit() ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show"></div>
      </Show>
    </div>
  );
};

export default EmpleadosView;
