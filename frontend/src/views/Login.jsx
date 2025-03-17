import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import LoginForm from "../components/LoginForm";
import { login } from "../services/authService";
import { setUser } from "../stores/authStore";

export default function Login() {
  const [showModal, setShowModal] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal(""); //  Para mostrar el mensaje en el modal
  const navigate = useNavigate();

  const handleLogin = async (e, { correo, contrasena }) => {
    e.preventDefault();
    try {
      const res = await login({ correo, contrasena });
      const userData = res.data.usuario;

      if (!userData) {
        alert("Error en la autenticación");
        return;
      }

      console.log("Usuario autenticado:", userData);

      //  Si el usuario está inactivo, no guardar datos en localStorage y mostrar el modal
      if (userData.estado !== 1) {
        setErrorMessage("Tu cuenta aún no ha sido activada. Contacta al administrador.");
        setShowModal(true);
        return; //  Detener el login aquí
      }

      // Si el usuario está activo, guardarlo en el sistema
      setUser(userData.id, userData.rol_nombre, navigate);
    } catch (error) {
      if (error.response?.status === 403) {
        setErrorMessage("Tu cuenta aún no ha sido activada. Contacta al administrador.");
        setShowModal(true);
      } else {
        alert("Cuenta no encontrada o credenciales incorrectas");
      }
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

      {/*  Modal Bootstrap para cuenta inactiva */}
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
                  }}
                ></button>
              </div>
              <div class="modal-body">
                <p>{errorMessage()}</p> {/* Ahora muestra el modal */}
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
