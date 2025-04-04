import { onCleanup, onMount } from "solid-js";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function CalendarioCitas(props) {
    let calendarEl;
    let calendar; // Usado para limpieza posterior

    onMount(() => {
        const eventos = props.citas.map(cita => {
            const fechaStr = new Date(cita.fecha).toISOString().split("T")[0];
            return {
                title: `${cita.idPaciente?.nombre || "Paciente"} - ${cita.idServicio?.nombre || "Servicio"}\n(${cita.idHospital?.nombre || "Hospital"})`,
                start: `${fechaStr}T${cita.horaInicio}`,
                end: `${fechaStr}T${cita.horaFin}`,
                color:
                    cita.estado === "Completada" ? "green" :
                    cita.estado === "Cancelada" ? "red" :
                    cita.estado === "Confirmada" ? "blue" :
                    "orange"
            };
        });

        calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin],
            initialView: "dayGridMonth",
            events: eventos,
            locale: "es",
            eventClick: function (info) {
                const evento = info.event;
                alert(
                    `Detalle de Cita\n\n` +
                    `Paciente: ${evento.title}\n` +
                    `Inicio: ${evento.start.toLocaleString()}\n` +
                    `Fin: ${evento.end.toLocaleString()}`
                );
            }
        });

        calendar.render();
    });

    onCleanup(() => {
        if (calendar) calendar.destroy(); // Limpieza al desmontar
    });

    return <div ref={el => (calendarEl = el)} />;
}
