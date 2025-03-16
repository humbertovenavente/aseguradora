import { createSignal } from "solid-js";
import { login } from "../services/authService";

export default function Login() {
    const [correo, setCorreo] = createSignal("");
    const [contrasena, setContrasena] = createSignal("");
    const [usuario, setUsuario] = createSignal(null);
    const [showModal, setShowModal] = createSignal(false); // Estado del modal

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ correo: correo(), contrasena: contrasena() });
            setUsuario(res.data.usuario);

            if (res.data.usuario.estado === 0) {
                setShowModal(true); // Mostrar el modal si el usuario está inactivo
            }
        } catch (error) {
            alert("Account not found");
        }
    };

    return (
        <div class="container mt-5">
            <h2>Iniciar Sesión</h2>
            
            <form onSubmit={handleLogin}>
                <div class="mb-3">
                    <label class="form-label">Correo</label>
                    <input 
                        type="email" 
                        class="form-control" 
                        value={correo()} // ✅ Esto permite que se actualice al limpiar
                        onInput={(e) => setCorreo(e.target.value)} 
                        required 
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        value={contrasena()} // ✅ Esto permite que se actualice al limpiar
                        onInput={(e) => setContrasena(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" class="btn btn-success">Iniciar Sesión</button>
            </form>

            <div class="mt-3">
                <p>Don't have an account? <a href="/signup" class="text-primary">Create one</a></p>
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
                                        setCorreo("");  // ✅ Limpia el correo
                                        setContrasena("");  // ✅ Limpia la contraseña
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
                                        setCorreo("");  // ✅ Limpia el correo
                                        setContrasena("");  // ✅ Limpia la contraseña
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
