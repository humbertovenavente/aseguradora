import { A, useNavigate } from "@solidjs/router";
import { isLoggedIn, userRole, logout } from "./stores/authStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./navbar.css";

export default function App(props: any) {
    const navigate = useNavigate();

    // Mostrar el botón hamburguesa solo si hay elementos en el menú lateral
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
                <A href="/">Home</A>
                <A href="/subhome1">subhome1</A>
                <A href="/subhome2">subhome2</A>
                <A href="/catalogo">catalogo</A>
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
            {hasMenuOptions() && (
                <div class="offcanvas offcanvas-start sidebar-menu" tabindex="-1" id="sidebarMenu">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title">Menú</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                    </div>
                    <div class="offcanvas-body">
                        {isLoggedIn() && <A href="/users">Users</A>}
                       
                        
                        {userRole() === "admin" && <A href="/clientes">Clientes</A>}
                        {userRole() === "admin" && <A href="/seguros">Informacion de Aseguradora</A>} 
                       {/* {userRole() === "admin" && <A href="/historial-servicios">Historial de Servicios</A>} */}
                        {userRole() === "admin" && <A href="/empleados">Empleados</A>}
                        {userRole() === "admin" && <A href="/fichastecnicas">Ficha Técnica</A>}

                        {userRole() === "admin" && <A href="/servicios-cubiertos">Servicios</A>} 
                        {userRole() === "admin" && <A href="/polizas">Pólizas</A>}
                        {userRole() === "admin" && <A href="/coberturas">Coberturas</A>} 

                        {userRole() === "admin" && <A href="/citas">Citas</A>}
                        {userRole() === "admin" && <A href="/operadoras">Operadoras</A>}
                        


                        {userRole() === "admin" && <A href="/reportes">Reportes</A>}  
                        {userRole() === "admin" && <A href="/aprobacion">Aprobacion</A>}
                        {userRole() === "admin" && <A href="/pagos">Pagos</A>}
                       { /*{userRole() === "admin" && <A href="/copago">xxxxx</A>} */}

                           
                        {userRole() === "admin" && <A href="/hospitales">Hospitales</A>} 
                        {userRole() === "admin" && <A href="/aprobacion-org">Aprobación Organizaciones</A>}     
                           
                         
                        
                     
                        
                        {userRole() === "admin" && <A href="/pages">Paginas editables</A>}
                        


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
