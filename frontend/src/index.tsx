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
//paginas informativas
import SubhomeView from "./views/SubhomeView";
import Subhome2View from "./views/Subhome2View";
import HistoriaView from "./views/HistoriaView";
import TestimoniosView from "./views/TestimoniosView";
import RedProveedores from "./views/RedProveedores";
import FaqView from "./views/FaqView";
import PagosView from "./views/PagosView";
import ContactoView from "./views/ContactoView";
import HospitalesAView from "./views/HospitalesAView";
import HospitalesView from "./views/HospitalesView";
import ServiciosView from "./views/ServiciosView";
import CatalogoServicios from "./views/CatalogoServicios.jsx";
import CoberturasView from "./views/CoberturasView";
import ReportesView from "./views/ReportesView";
import SegurosView from "./views/SegurosView";
import UsuariosAdmin from "./components/UsuariosAdmin.jsx";

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
            <Route path="/subhome1" component={SubhomeView} />
            <Route path="/subhome2" component={Subhome2View} />
            <Route path="/catalogo" component={CatalogoServicios} />
            <Route path="/catalogo/:id" component={CatalogoServicios} />
            <Route path="/historia" component={HistoriaView} />
            <Route path="/testimonios" component={TestimoniosView} />
            <Route path="/proveedores" component={RedProveedores} />
            <Route path="/FAQ" component={FaqView} />
            <Route path="/contacto" component={ContactoView} />
            <Route path="/users" component={Users} />
            <Route path="/clientes" component={requireRole("admin", ClientesView)} />
            <Route path="/hospitales-afiliados" component={requireRole("admin", HospitalesAView)} />
            <Route path="/servicios-cubiertos" component={requireRole("admin", ServiciosView)} />
            <Route path="/reportes" component={requireRole("admin", ReportesView)} />
            <Route path="/polizas" component={requireRole("admin", PolizasView)} />
            <Route path="/pagos" component={requireRole("admin", PagosView)} />
            <Route path="/coberturas" component={requireRole("admin", CoberturasView)} />
            <Route path="/hospitales" component={requireRole("admin", HospitalesView)} />
            <Route path="/seguros" component={requireRole("admin", SegurosView)} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
), document.getElementById("root") as HTMLElement);
