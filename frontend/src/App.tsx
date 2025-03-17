import { A, useNavigate } from "@solidjs/router";
import { isLoggedIn, userRole, logout } from "./stores/authStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Necesario para el menú off-canvas
import "./navbar.css";

export default function App(props: any) {
    const navigate = useNavigate();

    return (
        <>
            {/* NAVBAR PRINCIPAL */}
            <nav class="main-nav">
                <button class="btn menu-btn" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu">
                    ☰
                </button>
                <A href="/">Home</A>
                <A href="/subhome1">subhome1</A>
                <A href="/subhome2">subhome2</A>
                <A href="/historia">historia</A>
                <A href="/testimonios">testimonios</A>
                <A href="/proveedores">proveedores</A>
                <A href="/FAQ">FAQ</A>
                <A href="/contacto">contacto</A>

                {/* Botón de logout o login */}
                {isLoggedIn() ? (
                    <button class="btn btn-danger ms-auto" onClick={() => logout(navigate)}>Logout</button>
                ) : (
                    <A href="/login" class="ms-auto">Iniciar Sesión</A>
                )}
            </nav>

            {/* MENÚ HAMBURGUESA (OFFCANVAS) */}
            <div class="offcanvas offcanvas-start sidebar-menu" tabindex="-1" id="sidebarMenu">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title">Menú</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>
                <div class="offcanvas-body">
                    {isLoggedIn() && <A href="/users">Users</A>}
                    {userRole() === "admin" && <A href="/polizas">Pólizas</A>}
                    {userRole() === "admin" && <A href="/clientes">Clientes</A>}    
                    {userRole() === "admin" && <A href="/pagos">Pagos</A>}
                    {userRole() === "admin" && <A href="/coberturas">Coberturas</A>}     
                    {userRole() === "admin" && <A href="/hospitales">Hospitales</A>}      
                    {userRole() === "admin" && <A href="/servicios-cubiertos">Servicios</A>}    
                    {userRole() === "admin" && <A href="/seguros">Seguros</A>}      
                </div>
            </div>

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
