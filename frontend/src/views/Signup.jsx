import { useNavigate } from "@solidjs/router";
import SignupForm from "../components/SignupForm";
import { signup } from "../services/authService";
import { sendEmail } from "../utils/email";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (e, { correo, contrasena }) => {
    e.preventDefault();
    try {
      const res = await signup({ correo, contrasena });
      if (res.status === 201) {
        const emailResponse = await sendEmail(correo, "pending");
        if (!emailResponse.success) {
          alert("Error al enviar correo de activación");
        } else {
          alert("Registro exitoso. Se ha enviado un correo de activación. Redirigiendo al login...");
        }
        setTimeout(() => navigate("/login", { replace: true }), 4000);
      } else {
        alert("Error en el registro. Código de respuesta: " + res.status);
      }
    } catch (error) {
      alert("Error en el registro");
    }
  };

  return (
    <>
      {/* Estilos locales para la tarjeta y botón */}
      <style>
        {`
          .card-signup {
            background-size: cover;
          }
          .signup-btn {
            background-color: #FF9933 !important;
            color: #fff !important;
          }
        `}
      </style>
      <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div class="card card-signup shadow-sm p-4" style="width: 25rem;">
          <h2 class="text-center mb-4">Registrarse</h2>
          <SignupForm onSubmit={handleSignup} />
          <div class="text-center mt-3">
            <p class="mb-0">
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" class="text-primary fw-bold">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}


