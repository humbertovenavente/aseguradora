import { render } from "solid-js/web";
import { Router, Route, A } from "@solidjs/router";
import "./navbar.css";
import Home from "./views/HomeView";
import SubhomeView from "./views/SubhomeView";
import Subhome2View from "./views/Subhome2View";
import HistoriaView from "./views/HistoriaView";
import RedProveedores from "./views/RedProveedores";
import TestimoniosView from "./views/TestimoniosView";
import Users from "./views/UsersView";
import PolizasView from "./views/PolizasView";
import ClientesView from "./views/ClientesView";
import NotFound from "./views/NotFound";

// Componente principal
const App = (props) => (
  <>
    {/* NAVBAR */}
    <nav class="main-nav">
      <A href="/">Home</A>
      <A href="/subhome1">Subhome</A>
      <A href="/subhome2">Subhome2</A>
      <A href="/historia">Historia</A>
      <A href="/testimonios">Testimonios</A>
      <A href="/proveedores">Red de proveedores</A>
      <A href="/FAQ">FAQ</A>
      <A href="/contacto">Contacto</A>
      <A href="/polizas">Polizas</A>
      <A href="/clientes">Clientes</A>
      <A href="/hospitales-afiliados">Hospitales afiliados</A>
      <A href="/servicios-cubiertos">Servicios cubiertos</A>
      <A href="/reportes">Reportes</A>
      <A href="/users">Users</A>

    </nav>
    <main>{props.children}</main>

    {/* FOOTER */}
    <footer class="main-footer">
      <p>© 2025 Mi Empresa. Todos los derechos reservados.</p>
    </footer>
  </>
);

// Renderizamos el router
render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/subhome1" component={SubhomeView}/>
      <Route path="/subhome2" component={Subhome2View} />
      <Route path="/historia" component={HistoriaView} />
      <Route path="/proveedores" component={RedProveedores} />
      <Route path="/testimonios" component={TestimoniosView} />
      <Route path="/users" component={Users} />
      <Route path="/polizas" component={PolizasView} />
      <Route path="*paramName" component={NotFound} />
      <Route path="/clientes" component={ClientesView} />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);

export default App;
