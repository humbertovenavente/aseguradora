import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import LoginForm from "../components/LoginForm";
import { login } from "../services/authService";
import { setUser } from "../stores/authStore";

export default function Login() {
  const [showModal, setShowModal] = createSignal(false);
  const navigate = useNavigate();

  const handleLogin = async (e, { correo, contrasena }) => {
    e.preventDefault();
    try {
      const res = await login({ correo, contrasena });
      const userData = res.data.usuario;

      if (userData) {
        console.log("Usuario autenticado:", userData);
        setUser(userData.id, userData.rol_nombre, navigate);

        // Si la cuenta está inactiva, muestra el modal
        if (userData.estado === 0) {
          setShowModal(true);
        }
      } else {
        alert("Error en la autenticación");
      }
    } catch (error) {
      alert("Cuenta no encontrada");
    }
  };

  return (
    <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div class="card shadow-sm p-4" style="width: 25rem;">
        <h2 class="text-center mb-4">Iniciar Sesión</h2>
        <LoginForm onSubmit={handleLogin} />
        <div class="text-center mt-3">
          <p class="mb-0">
            ¿No tienes cuenta?{" "}
            <a href="/signup" class="text-primary fw-bold">
              Regístrate
            </a>
          </p>
        </div>
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
                  class="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    localStorage.removeItem("user");
                  }}
                ></button>
              </div>
              <div class="modal-body">
                <p>
                  Tu cuenta aún no ha sido activada. Por favor, espera a que un
                  administrador la active.
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
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
