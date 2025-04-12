import { createSignal, createEffect } from "solid-js";
import { obtenerClientes } from "../services/clientesService";
import { obtenerHospitales } from "../services/hospitalService";
import { obtenerServicios } from "../services/servicioService";
import { obtenerCitas, agendarCita } from "../services/citaService";
import CalendarioCitas from "../components/CalendarioCitas";

export default function Citas() {
    const [clientes, setClientes] = createSignal([]);
    const [hospitales, setHospitales] = createSignal([]);
    const [servicios, setServicios] = createSignal([]);
    const [subServicios, setSubServicios] = createSignal([]);
    const [citas, setCitas] = createSignal([]);
    const [filtroCliente, setFiltroCliente] = createSignal("");
    const [mostrarClientes, setMostrarClientes] = createSignal(false);

    const [cita, setCita] = createSignal({
        idPaciente: "",   
        nombreCliente: "",
        documentoCliente: "",
        idHospital: "",
        idServicio: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        motivo: "",
        diagnostico: "",
        idAseguradora: "67f84c1741019fe432da579c",
        resultados: ""
    });

    createEffect(() => {
        cargarHospitales();
        cargarServicios();
        cargarCitas();
    });

    async function cargarHospitales() {
        try {
            const response = await obtenerHospitales();
            setHospitales(response);
        } catch (error) {
            console.error("Error al obtener hospitales:", error);
        }
    }

    async function cargarServicios() {
        try {
            const response = await obtenerServicios();
            setServicios(response);
        } catch (error) {
            console.error("Error al obtener servicios:", error);
        }
    }

    async function cargarCitas() {
        try {
            const response = await obtenerCitas();
            setCitas(response);
        } catch (error) {
            console.error("Error al obtener citas:", error);
        }
    }

    function seleccionarServicioPadre(servicioId) {
        const servicioSeleccionado = servicios().find(s => s._id === servicioId);

        if (!servicioSeleccionado) {
            setSubServicios([]);
            return;
        }

        if (Array.isArray(servicioSeleccionado.subservicios) && servicioSeleccionado.subservicios.length > 0) {
            setSubServicios(servicioSeleccionado.subservicios);
            setCita({ ...cita(), idServicio: "" });
        } else {
            setSubServicios([]);
            setCita({ ...cita(), idServicio: servicioId });
        }
    }

    async function buscarClientes() {
        if (filtroCliente().length < 3) {
            setMostrarClientes(false);
            return;
        }

        try {
            const response = await obtenerClientes();
            setClientes(response.filter(c =>
                c.nombre.toLowerCase().includes(filtroCliente().toLowerCase()) ||
                c.documento.includes(filtroCliente())
            ));
            setMostrarClientes(true);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
        }
    }

    function seleccionarCliente(cliente) {
        setCita({ 
            ...cita(), 
            idPaciente: cliente._id, 
            nombreCliente: cliente.nombre, 
            documentoCliente: cliente.documento 
        });
        setFiltroCliente("");
        setMostrarClientes(false);
    }

    function generarHorasDisponibles() {
        const horas = [];
        let hora = 8;
        let minutos = 0;
        while (hora < 16 || (hora === 16 && minutos === 0)) {
            const horaTexto = `${hora.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
            const ocupada = citas().some(c => c.horaInicio === horaTexto && c.fecha === cita().fecha);

            if (!ocupada) {
                horas.push(horaTexto);
            }

            minutos += 30;
            if (minutos === 60) {
                minutos = 0;
                hora++;
            }
        }
        return horas;
    }

    function actualizarHoraFin(horaInicio) {
        const [h, m] = horaInicio.split(":").map(Number);
        let nuevaHora = h;
        let nuevosMinutos = m + 30;

        if (nuevosMinutos === 60) {
            nuevosMinutos = 0;
            nuevaHora++;
        }

        const nuevaHoraFin = `${nuevaHora.toString().padStart(2, "0")}:${nuevosMinutos.toString().padStart(2, "0")}`;
        setCita({ ...cita(), horaInicio, horaFin: nuevaHoraFin });
    }

    function obtenerCitasDeHoy() {
        const hoy = new Date().toISOString().split("T")[0];
        return citas().filter(c => {
            const fechaCita = new Date(c.fecha).toISOString().split("T")[0];
            return fechaCita === hoy;
        });
    }
    
    

    async function guardarCita() {
        try {
            console.log("📝 Datos enviados:", cita());
            await agendarCita(cita());
            alert("✅ Cita agendada con éxito.");
            setCita({
                idPaciente: "", nombreCliente: "", documentoCliente: "", idHospital: "",
                idServicio: "", fecha: "", horaInicio: "", horaFin: "", motivo: "",
                idAseguradora: null, diagnostico: "", resultados: ""
            });
            cargarCitas();
        } catch (error) {
            console.error("❌ Error al agendar cita:", error);
            alert("Hubo un error al agendar la cita.");
        }
    }

    return (
        <div class="container mt-4">
            <h2 class="text-center">Gestión de Citas</h2>

            <div class="row">
                {/* Formulario */}
                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Buscar Cliente</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Ingrese nombre o documento"
                            value={filtroCliente()}
                            onInput={(e) => {
                                setFiltroCliente(e.target.value);
                                buscarClientes();
                            }}
                        />
                        {mostrarClientes() && (
                            <ul class="list-group mt-2">
                                {clientes().map(cliente => (
                                    <li
                                        key={cliente._id}
                                        class="list-group-item list-group-item-action"
                                        onClick={() => seleccionarCliente(cliente)}
                                    >
                                        {cliente.nombre} - {cliente.documento}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); guardarCita(); }}>
                        <div class="mb-3">
                            <label class="form-label">Nombre del Paciente</label>
                            <input
                                type="text"
                                class="form-control"
                                value={`${cita().nombreCliente || "-"} - ${cita().documentoCliente || "-"}`}
                                readOnly
                            />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Hospital</label>
                            <select
                                class="form-select"
                                onChange={(e) => setCita({ ...cita(), idHospital: e.target.value })}
                            >
                                <option value="">Seleccione un hospital</option>
                                {hospitales().map(hospital => (
                                    <option key={hospital._id} value={hospital._id}>
                                        {hospital.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Servicio</label>
                            <select
                                class="form-select"
                                onChange={(e) => seleccionarServicioPadre(e.target.value)}
                            >
                                <option value="">Seleccione un servicio</option>
                                {servicios().map(servicio => (
                                    <option key={servicio._id} value={servicio._id}>
                                        {servicio.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Fecha</label>
                            <input
                                type="date"
                                class="form-control"
                                value={cita().fecha}
                                onInput={(e) => setCita({ ...cita(), fecha: e.target.value })}
                                required
                            />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Hora Inicio</label>
                            <select
                                class="form-select"
                                value={cita().horaInicio}
                                onChange={(e) => actualizarHoraFin(e.target.value)}
                            >
                                <option value="">Seleccione una hora</option>
                                {generarHorasDisponibles().map(hora => (
                                    <option key={hora} value={hora}>
                                        {hora}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Hora Fin</label>
                            <input
                                type="text"
                                class="form-control"
                                value={cita().horaFin}
                                readOnly
                            />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Motivo</label>
                            <input
                                type="text"
                                class="form-control"
                                onInput={(e) => setCita({ ...cita(), motivo: e.target.value })}
                            />
                        </div>

                        <button type="submit" class="btn btn-primary w-100">Agendar Cita</button>
                    </form>
                </div>

                {/* Calendario */}
                <div class="col-md-8">
                    <h4 class="mb-3">Citas Procesadas</h4>
                    {citas().length === 0 ? (
                        <p>No hay citas registradas.</p>
                    ) : (
                        <div class="table-responsive">
                           <CalendarioCitas citas={citas()} key={citas().length} />
                           <hr class="my-4" />
<h4 class="mb-3">Historial de Citas de Hoy</h4>

{obtenerCitasDeHoy().length === 0 ? (
    <p>No hay citas para hoy.</p>
) : (
    <div class="table-responsive">
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Paciente</th>
                    <th>Documento</th>
                    <th>Servicio</th>
                    <th>Hospital</th>
                    <th>Hora</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {obtenerCitasDeHoy().map(c => (
                    <tr key={c._id}>
                        <td>{c.idPaciente?.nombre} {c.idPaciente?.apellido || ""}</td>
                        <td>{c.idPaciente?.documento || "N/A"}</td>
                        <td>{c.idServicio?.nombre || "N/A"}</td>
                        <td>{c.idHospital?.nombre || "N/A"}</td>
                        <td>{c.horaInicio} - {c.horaFin}</td>
                        <td>{c.estado}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}


                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}
