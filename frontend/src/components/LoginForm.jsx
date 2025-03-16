import { createSignal } from "solid-js";

export default function LoginForm({ onSubmit }) {
    const [correo, setCorreo] = createSignal("");
    const [contrasena, setContrasena] = createSignal("");

    return (
        <form onSubmit={(e) => onSubmit(e, { correo: correo(), contrasena: contrasena() })}>
            <div class="mb-3">
                <label class="form-label">Correo</label>
                <input type="email" class="form-control" onInput={(e) => setCorreo(e.target.value)} required />
            </div>
            <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input type="password" class="form-control" onInput={(e) => setContrasena(e.target.value)} required />
            </div>
            <button type="submit" class="btn btn-success">Iniciar Sesión</button>
        </form>
    );
}
