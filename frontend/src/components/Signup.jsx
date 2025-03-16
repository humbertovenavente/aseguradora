import { createSignal } from "solid-js";
import { signup } from "../services/authService";
import { useNavigate } from "@solidjs/router";

export default function Signup() {
    const [correo, setCorreo] = createSignal("");
    const [contrasena, setContrasena] = createSignal("");
    const [loading, setLoading] = createSignal(false);
    const navigate = useNavigate(); // Inicializa la navegación

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true); // Activamos el estado de carga
    
        // Imprime en la consola los datos antes de enviarlos
        console.log("Enviando datos:", {
            correo: correo(),
            contrasena: contrasena()
        });
    
        try {
            const res = await signup({ correo: correo(), contrasena: contrasena() });
    
            if (res.status === 201) {
                alert("Registro exitoso. Redirigiendo al login...");
                setTimeout(() => navigate("/login", { replace: true }), 2000);
            } else {
                alert("Error en el registro. Código de respuesta: " + res.status);
            }
        } catch (error) {
            console.error("Error en el registro:", error.response?.data || error);
            alert("Error en el registro: " + (error.response?.data?.mensaje || "Inténtalo nuevamente."));
        } finally {
            setLoading(false); // Desactivamos el estado de carga
        }
    };
    

    return (
        <div class="container mt-5">
            <h2>Registro</h2>
            <form onSubmit={handleSignup}>
                <div class="mb-3">
                    <label class="form-label">Correo</label>
                    <input type="email" class="form-control" onInput={(e) => setCorreo(e.target.value)} required />
                </div>
                <div class="mb-3">
                    <label class="form-label">Contraseña</label>
                    <input type="password" class="form-control" onInput={(e) => setContrasena(e.target.value)} required />
                </div>
                <button type="submit" class="btn btn-primary" disabled={loading()}>
                    {loading() ? "Registrando..." : "Registrarse"}
                </button>
            </form>

            {/* Mensaje para usuarios que ya tienen cuenta */}
            <div class="mt-3">
                <p>Already have an account? <a href="/login" class="text-primary">Log in</a></p>
            </div>
        </div>
    );
}
