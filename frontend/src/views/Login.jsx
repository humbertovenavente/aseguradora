import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import LoginForm from "../components/LoginForm";
import { login } from "../services/authService";

export default function Login() {
    const [usuario, setUsuario] = createSignal(null);
    const [showModal, setShowModal] = createSignal(false);
    const navigate = useNavigate();

    const handleLogin = async (e, { correo, contrasena }) => {
        e.preventDefault();
        try {
            const res = await login({ correo, contrasena });
            const userData = res.data.usuario;
    
            if (userData) {
                console.log("Usuario autenticado:", userData); // Debug
                localStorage.setItem("user", JSON.stringify(userData));
                console.log("Datos guardados en localStorage:", localStorage.getItem("user")); // Verificar que se guardó
    
                // Si la cuenta está inactiva, muestra el modal
                if (userData.estado === 0) {
                    setShowModal(true);
                } else {
                    navigate("/", { replace: true });
                }
            } else {
                alert("Error en la autenticación");
            }
        } catch (error) {
            alert("Cuenta no encontrada");
        }
    };
    return (
        <div class="container mt-5">
            <h2>Iniciar Sesión</h2>

            <LoginForm onSubmit={handleLogin} />

            <div class="mt-3">
                <p>¿No tienes cuenta? <a href="/signup" class="text-primary">Regístrate</a></p>
            </div>

            {/* Modal Bootstrap */}
            {showModal() && (
                <div class="modal fade show d-block" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Cuenta Inactiva</h5>
                                <button 
                                    type="button" 
                                    class="close" 
                                    onClick={() => {
                                        setShowModal(false);
                                        localStorage.removeItem("user");
                                    }}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Tu cuenta aún no ha sido activada. Por favor, espera a que un administrador la active.</p>
                            </div>
                            <div class="modal-footer">
                                <button 
                                    type="button" 
                                    class="btn btn-secondary" 
                                    onClick={() => {
                                        setShowModal(false);
                                        setUsuario(null);
                                    }}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
