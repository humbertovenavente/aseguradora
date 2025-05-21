import { A, useNavigate } from "@solidjs/router";
import { isLoggedIn, userRole, logout } from "./stores/authStore";
import { createResource, For, Show } from "solid-js";
import { obtenerMenuPorTipo } from "./services/menuService";
import { obtenerFooter } from "./services/footerService";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./Navbar.css";

// Tipos
type MenuItem = { titulo: string; icono: string; ruta: string };
type Menu = { tipo: string; items: MenuItem[] };
type FooterData = { contenido: string };

export default function App(props: any) {
  const navigate = useNavigate();
  const [menuPrincipal] = createResource<string, Menu>(() => "principal", obtenerMenuPorTipo);
  const [footer] = createResource<FooterData>(obtenerFooter);

  const hasMenuOptions = () =>
    isLoggedIn() && ["admin", "empleado", "inter"].includes(userRole());

  return (
    <>
      {/* NAVBAR */}
      <nav class="main-nav">
        {hasMenuOptions() && (
          <button class="btn menu-btn" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu">
            ☰
          </button>
        )}

        {/* Menú principal dinámico (oculto para 'inter') */}
        <div class="nav-links">
          <Show when={menuPrincipal.loading}>
            <span>Cargando menú...</span>
          </Show>
          <Show when={menuPrincipal()?.items && userRole() !== "inter"}>
            <For each={menuPrincipal()?.items ?? []}>
              {(item) => <A href={item.ruta}>{item.icono} {item.titulo}</A>}
            </For>
          </Show>
        </div>

        {/* Botón de login/logout */}
        {isLoggedIn() ? (
          <button class="btn btn-danger ms-auto" onClick={() => logout(navigate)}>Logout</button>
        ) : (
          <A href="/login" class="ms-auto">Iniciar Sesión</A>
        )}
      </nav>

      {/* SIDEBAR */}
      {hasMenuOptions() && (
        <div class="offcanvas offcanvas-start sidebar-menu" tabindex="-1" id="sidebarMenu">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title">Menú</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
          </div>
          <div class="offcanvas-body">
            {/* Opciones para Admin */}
            {userRole() === "admin" && <>
              <A href="/operadoras">Operadoras</A>
              <A href="/users">Usuarios</A>
              <A href="/clientes">Clientes</A>
              <A href="/farmacias">Farmacia Solicitud</A>
              <A href="/seguros">Información Aseguradora</A>
              <A href="/fichastecnicas">Ficha Técnica</A>
              <A href="/servicios-cubiertos">Servicios</A>
              <A href="/polizas">Pólizas</A>
              <A href="/coberturas">Coberturas</A>
              <A href="/citas">Citas</A>
              <A href="/managecitas">Manejar Citas</A>
              <A href="/reportes">Reportes</A>
              <A href="/aprobacion">Aprobación Servicios</A>
              <A href="/hospitales">Hospitales</A>
              <A href="/aprobacion-org">Aprobación Recetas</A>
              <A href="/pages">Páginas Editables</A>
              <A href="/solicitudes">Solicitudes</A>
              <A href="/resultados">Resultados de Citas</A>
            </>}

            {/* Opciones para admin */}
            {userRole() === "admin" && <>
              <A href="/operadoras">Operadoras</A>
            </>}

            {/* Opciones para Cliente */}
            {userRole() === "inter" && <>
              <A href="/hospitales">Hospitales</A>
              <A href="/solicitudes">Solicitudes</A>
              <A href="/aprobacion">Aprobación Servicios</A>
              <A href="/aprobacion-org">Aprobación Recetas</A>
              <A href="/resultados">Resultados de Citas</A>
              <A href="/farmacias">Farmacia Solicitud</A>
            </>}
          </div>
        </div>
      )}

      {/* CONTENIDO */}
      <main>
        {props.children}
      </main>

      {/* FOOTER dinámico */}
      <footer class="main-footer">
        <span>{footer()?.contenido || "Cargando..."}</span>
      </footer>
    </>
  );
}
