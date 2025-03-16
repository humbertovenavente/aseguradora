import "./diseño/RedProveedores.css";
import { For } from "solid-js";

const proveedores = [
  {
    id: 1,
    nombre: "Hospital Santa Ana",
    imagen: "/hospital.png",
    info: "Especialistas en cardiología y medicina general.",
  },
  {
    id: 2,
    nombre: "Farmacias Vida Saludable",
    imagen: "/farmacia.png",
    info: "Medicamentos de alta calidad y atención personalizada.",
  },
  {
    id: 3,
    nombre: "Clínica Médica Esperanza",
    imagen: "/clinica.png",
    info: "Consultas médicas integrales para toda la familia.",
  },
];

export default function RedProveedores() {
  return (
    <div class="proveedores-container">
      <h1 class="proveedores-title">Nuestra Red de Proveedores</h1>
      <div class="red-proveedores">
        <For each={proveedores}>
          {(proveedor) => (
            <div class="proveedor-card">
              <img
                class="proveedor-avatar"
                src={proveedor.imagen}
                alt={proveedor.nombre}
              />
              <div class="proveedor-nombre">{proveedor.nombre}</div>
              <p class="proveedor-info">{proveedor.info}</p>
              <a href="#" class="proveedor-button">Ver detalles</a>
            </div>
          )}
      </For>
      </div>
    </div>
  );
}
