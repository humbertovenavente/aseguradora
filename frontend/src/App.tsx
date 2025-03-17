import { A, useNavigate } from "@solidjs/router";
import { isLoggedIn, userRole, logout } from "./stores/authStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";

export default function App(props: any) {
    const navigate = useNavigate();

    return (
        <>
            {/* NAVBAR */}
            <nav class="main-nav">
                <A href="/">Home</A>
                <A href="/subhome1">subhome1</A>
                <A href="/subhome2">subhome2</A>
                <A href="/historia">historia</A>
                <A href="/testimonios">testimonios</A>
                <A href="/proveedores">proveedores</A>
                <A href="/FAQ">FAQ</A>
                <A href="/contacto">contacto</A>
                {isLoggedIn() && <A href="/users">Users</A>}
                {userRole() === "admin" && <A href="/polizas">Pólizas</A>}
                {userRole() === "admin" && <A href="/clientes">Clientes</A>}    
                {userRole() === "admin" && <A href="/pagos">Pagos</A>}
                {userRole() === "admin" && <A href="/coberturas">Coberturas</A>}     
                {userRole() === "admin" && <A href="/hospitales">Hospitales</A>}      
                {userRole() === "admin" && <A href="/servicios-cubiertos">Servicios</A>}           

                {/* Botón de logout */}
                {isLoggedIn() ? (
                    <button class="btn btn-danger ms-3" onClick={() => logout(navigate)}>Logout</button>
                ) : (
                    <A href="/login">Iniciar Sesión</A>
                )}
            </nav>

            {/* Contenido dinámico de cada vista */}
            <main>
                {props.children} {/* 🔥 CORREGIDO: Renderizar las rutas aquí */}
            </main>

            {/* FOOTER */}
            <footer class="main-footer">
                <p>© 2025 Mi Empresa. Todos los derechos reservados.</p>
            </footer>
        </>
    );
}
