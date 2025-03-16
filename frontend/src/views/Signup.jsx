import { useNavigate } from "@solidjs/router";
import SignupForm from "../components/SignupForm";
import { signup } from "../services/authService";

export default function Signup() {
    const navigate = useNavigate();

    const handleSignup = async (e, { correo, contrasena }) => {
        e.preventDefault();
        try {
            const res = await signup({ correo, contrasena });

            if (res.status === 201) {
                alert("Registro exitoso. Redirigiendo al login...");
                navigate("/login", { replace: true });
            } else {
                alert("Error en el registro. Código de respuesta: " + res.status);
            }
        } catch (error) {
            alert("Error en el registro");
        }
    };

    return (
        <div class="container mt-5">
            <h2>Registro</h2>
            <SignupForm onSubmit={handleSignup} />
            <div class="mt-3">
                <p>¿Ya tienes una cuenta? <a href="/login" class="text-primary">Iniciar sesión</a></p>
            </div>
        </div>
    );
}
