import { render } from "solid-js/web";
import { Router, Route, A } from "@solidjs/router";
import "./navbar.css";
import Home from "./views/HomeView";
import Users from "./views/UsersView";
import PolizasView from "./views/PolizasView";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./views/NotFound";

// Componente principal
const App = (props) => (
  <>
    {/* NAVBAR */}
    <nav class="main-nav">
      <A href="/">Home</A>
      <A href="/users">Users</A>
      <A href="/polizas">Polizas</A>
     
      <A href="/login">Iniciar Sesión</A>
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
      <Route path="/users" component={Users} />
      <Route path="/polizas" component={PolizasView} />
      <Route path="*paramName" component={NotFound} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);

export default App;
