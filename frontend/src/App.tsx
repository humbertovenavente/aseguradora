import { A, useNavigate } from "@solidjs/router";
import { isLoggedIn, userRole, logout } from "./stores/authStore";
import "./navbar.css";

export default function App(props: any) {
    const navigate = useNavigate();

    return (
        <>
            {/* NAVBAR */}
            <nav class="main-nav">
                <A href="/">Home</A>
                {isLoggedIn() && <A href="/users">Users</A>}
                {userRole() === "admin" && <A href="/polizas">Pólizas</A>}
                {userRole() === "admin" && <A href="/clientes">Clientes</A>}                

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
