import { createSignal, Show } from "solid-js";
import { A } from "@solidjs/router";

function PaginasView() {
  // Aquí simulo el rol de usuario, en tu caso lo obtendrás desde tu lógica de auth
  const [userRole, setUserRole] = createSignal("admin");

  // Definimos las rutas de las secciones que puede editar el admin
  const adminPages = [
    { path: "/moderacion", label: "Moderacion" },
    { path: "/pages-historia", label: "Historia" },
    { path: "/pages-contacto", label: "Contacto" },
    { path: "/pages-faq", label: "FAQ" },
    { path: "/pages-proveedores", label: "Red de Proveedores" },
    { path: "/pages-testimonios", label: "Testimonios" },
    { path: "/pages-home", label: "Home" },
    { path: "/pages-navbar", label: "Navbar" },
    { path: "/pages-footer", label: "Footer" },
  ];

  return (
    <>
      <style>
        {`
          .admin-button {
            font-size: 1.2rem;
            font-weight: 500;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            transition: transform 0.2s ease;
            /* Para que todos los botones tengan un mismo ancho máximo */
            width: 100%;
            max-width: 400px;
          }
          .admin-button:hover {
            transform: translateY(-2px);
          }
        `}
      </style>

      <div class="container my-5">
        <Show
          when={userRole() === "admin"}
          fallback={<p>No tienes permiso para ver esta página.</p>}
        >
          <h1 class="mb-4 text-center">Panel de Administración</h1>
          {/* 
            d-flex + flex-column = elementos en columna
            align-items-center = centra horizontalmente el contenido
            gap-3 = espacio vertical entre botones
          */}
          <div class="d-flex flex-column align-items-center gap-3">
            {adminPages.map((page) => (
              <A href={page.path} class="btn btn-primary btn-lg admin-button">
                {page.label}
              </A>
            ))}
          </div>
        </Show>
      </div>
    </>
  );
}

export default PaginasView;
