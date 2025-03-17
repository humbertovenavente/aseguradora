import "bootstrap/dist/css/bootstrap.min.css";
import './cheatsheet.scss';

import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import App from "./App";
import Home from "./views/HomeView";
import Users from "./views/UsersView";
import PolizasView from "./views/PolizasView";
import ClientesView from "./views/ClientesView";
import Signup from "./views/Signup";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import { restoreSession, isLoggedIn, userRole } from "./stores/authStore";

// Restaurar sesión al iniciar la app
restoreSession();

// Middleware para proteger rutas
const requireRole = (role: string, Component: any) => {
    return () => (isLoggedIn() && userRole() === role ? <Component /> : <NotFound />);
};

render(() => (
    <Router>
        <Route path="/" component={App}>
            <Route path="/" component={Home} />
            <Route path="/users" component={Users} />
            <Route path="/clientes" component={ClientesView} />
            <Route path="/polizas" component={requireRole("admin", PolizasView)} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
), document.getElementById("root") as HTMLElement);
