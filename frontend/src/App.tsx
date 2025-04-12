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

  const hasMenuOptions = () => isLoggedIn() || userRole() === "admin";

  return (
    <>
      {/* NAVBAR */}
      <nav class="main-nav">
        {hasMenuOptions() && (
          <button class="btn menu-btn" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu">☰</button>
        )}

        {/* Menú principal dinámico */}
        <div class="nav-links">
          <Show when={menuPrincipal.loading}><span>Cargando menú...</span></Show>
          <Show when={menuPrincipal()?.items}>
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
            {userRole() === "admin" && <A href="/operadoras"> OPERADORAS</A>}
            {isLoggedIn() && <A href="/users">Users</A>}
            {userRole() === "admin" && <A href="/clientes">Clientes</A>}
            {userRole() === "admin" && <A href="/seguros">Informacion de Aseguradora</A>}
            {userRole() === "admin" && <A href="/empleados">Empleados</A>}
            {userRole() === "admin" && <A href="/fichastecnicas">Ficha Técnica</A>}
            {userRole() === "admin" && <A href="/servicios-cubiertos">Servicios</A>}
            {userRole() === "admin" && <A href="/polizas">Pólizas</A>}
            {userRole() === "admin" && <A href="/coberturas">Coberturas</A>}
            {userRole() === "admin" && <A href="/citas">Citas</A>}
            {userRole() === "admin" && <A href="/managecitas">Manejar Citas</A>}
            {userRole() === "admin" && <A href="/reportes">Reportes</A>}
            {userRole() === "admin" && <A href="/aprobacion">Aprobación</A>}
            {userRole() === "admin" && <A href="/hospitales">Hospitales</A>}
            {userRole() === "admin" && <A href="/aprobacion-org">Aprobación Recetas</A>}
            {userRole() === "admin" && <A href="/pages">Páginas editables</A>}
            {userRole() === "admin" && <A href="/solicitudes">Solicitud Servicios</A>}

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