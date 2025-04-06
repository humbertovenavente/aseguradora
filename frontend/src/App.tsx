import { A, useNavigate } from "@solidjs/router";
import { isLoggedIn, userRole, logout } from "./stores/authStore";
import { createResource, For, Show } from "solid-js";
import { obtenerMenuPorTipo } from "./services/menuService";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./navbar.css";

// 🧠 Definición de tipos para menú
type MenuItem = {
  titulo: string;
  icono: string;
  ruta: string;
};

type Menu = {
  tipo: string;
  items: MenuItem[];
};

export default function App(props: any) {
  const navigate = useNavigate();

  // ✅ Usamos el tipo Menu en el recurso
  const [menuPrincipal] = createResource<string, Menu>(() => "principal", obtenerMenuPorTipo);

  const hasMenuOptions = () => isLoggedIn() || userRole() === "admin";

  return (
    <>
      {/* NAVBAR PRINCIPAL */}
      <nav class="main-nav">
        {hasMenuOptions() && (
          <button class="btn menu-btn" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu">
            ☰
          </button>
        )}

<Show when={menuPrincipal.loading}>
  <span>Cargando menú...</span>
</Show>


<Show when={menuPrincipal()?.items}>
  <For each={menuPrincipal()?.items ?? []}>
    {(item) => (
      <A href={item.ruta}>{item.icono} {item.titulo}</A>
    )}
  </For>
</Show>




        {/* Botón de logout o login */}
        {isLoggedIn() ? (
          <button class="btn btn-danger ms-auto" onClick={() => logout(navigate)}>Logout</button>
        ) : (
          <A href="/login" class="ms-auto">Iniciar Sesión</A>
        )}
      </nav>

      {/* MENÚ HAMBURGUESA (OFFCANVAS) */}
      {hasMenuOptions() && (
        <div class="offcanvas offcanvas-start sidebar-menu" tabindex="-1" id="sidebarMenu">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title">Menú</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
          </div>
          <div class="offcanvas-body">
            {userRole() === "admin" && <A href="/operadoras">🛎️ OPERADORAS</A>}
            {isLoggedIn() && <A href="/users">Users</A>}
            {userRole() === "admin" && <A href="/clientes">Clientes</A>}
            {userRole() === "admin" && <A href="/seguros">Informacion de Aseguradora</A>}
            {userRole() === "admin" && <A href="/empleados">Empleados</A>}
            {userRole() === "admin" && <A href="/fichastecnicas">Ficha Técnica</A>}
            {userRole() === "admin" && <A href="/servicios-cubiertos">Servicios</A>}
            {userRole() === "admin" && <A href="/polizas">Pólizas</A>}
            {userRole() === "admin" && <A href="/coberturas">Coberturas</A>}
            {userRole() === "admin" && <A href="/citas">Citas</A>}
            {userRole() === "admin" && <A href="/reportes">Reportes</A>}
            {userRole() === "admin" && <A href="/aprobacion">Aprobación</A>}
            {userRole() === "admin" && <A href="/hospitales">Hospitales</A>}
            {userRole() === "admin" && <A href="/aprobacion-org">Aprobación Organizaciones</A>}
            {userRole() === "admin" && <A href="/pages">Páginas editables</A>}
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main>
        {props.children}
      </main>

      {/* FOOTER */}
      <footer class="main-footer">
        <p>© 2025 Mi Empresa. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
