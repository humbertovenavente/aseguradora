import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

// Señales para manejar la sesión
export const [userRole, setUserRole] = createSignal<string | null>(null);
export const [isLoggedIn, setIsLoggedIn] = createSignal<boolean>(false);
export const [userId, setUserId] = createSignal<string | null>(null);

// Función para establecer el usuario después del login
export const setUser = (id: string, roleName: string, navigate: any) => {
    setUserId(id);
    setUserRole(roleName);
    setIsLoggedIn(true);

    // Guardar en localStorage
    localStorage.setItem("userId", id);
    localStorage.setItem("userRole", roleName);

    // Redirigir según el rol
    switch (roleName) {
        case "admin":
            navigate("/");
            break;
        case "empleado":
            navigate("/");
            break;
        case "cliente":
            navigate("/");
            break;
        default:
            navigate("/");
    }
};

// Función para cerrar sesión
export const logout = (navigate: any) => {
    setUserRole(null);
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.clear();
    navigate("/");
};

// Restaurar la sesión si hay datos en localStorage al iniciar
export const restoreSession = () => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserRole = localStorage.getItem("userRole");

    if (storedUserId && storedUserRole) {
        setUserId(storedUserId);
        setUserRole(storedUserRole);
        setIsLoggedIn(true);
    }
};
