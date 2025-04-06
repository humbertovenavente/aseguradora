import "bootstrap/dist/css/bootstrap.min.css";
import './cheatsheet.scss';

import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import App from "./App";
import Home from "./views/HomeView";
import Users from "./views/UsersView";
import PolizasView from "./views/PolizasView";
import ClientesView from "./views/ClientesView";
import HistorialServiciosView from "./views/HistorialServiciosView.jsx";
import Signup from "./views/Signup";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
//paginas informativas
import SubhomeView from "./views/SubhomeView";
import OperadorasView from "./views/OperadorasView";
import Subhome2View from "./views/Subhome2View";
import HistoriaView from "./views/HistoriaView";
import TestimoniosView from "./views/TestimoniosView";
import RedProveedores from "./views/RedProveedores";
import AprobacionOrgView from "./views/AprobacionOrgView";
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
import AprobacionView from "./views/AprobacionView.jsx";
import FichaTecnicaView from "./views/FichaTecnicaView";
import FichaTecnicaDetail from "./views/FichaTecnicaDetail";

import FichasTM from "./views/FichasTM";
import FichasDetalleTM from "./views/FichasDetalleTM";
import EmpleadosView from "./views/EmpleadosView";
import Citas from "./views/Citas";
import Copago from "./views/copagoView";


import PaginasView from "./views/PaginasEdt/PaginasView";
import AdminHistoriaView from "./views/PaginasEdt/AdminHistoriaView";
import AdminContactoView from "./views/PaginasEdt/AdminContactoView";
import AdminFaqView from "./views/PaginasEdt/AdminFaqView";
import AdminRedProveedores from "./views/PaginasEdt/AdminRedProveedores";
import AdminTestimoniosView from "./views/PaginasEdt/AdminTestimoniosView";
import AdminHomeView from "./views/PaginasEdt/AdminHomeView";
import NavbarView from "./views/PaginasEdt/NavbarView";

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
            <Route path="/empleados" component={EmpleadosView} />          
            <Route path="/operadoras" component={OperadorasView} />
            <Route path="/catalogo/:id" component={CatalogoServicios} />
            <Route path="/historia" component={HistoriaView} />
            <Route path="/testimonios" component={TestimoniosView} />
            <Route path="/proveedores" component={RedProveedores} />
            <Route path="/FAQ" component={FaqView} />
            <Route path="/contacto" component={ContactoView} />
            <Route path="/users" component={Users} />
            <Route path="/reportes" component={ReportesView} />
            <Route path="/clientes" component={requireRole("admin", ClientesView)} />
            <Route path="/historial-servicios/:id" component={requireRole("admin", HistorialServiciosView)} />
            <Route path="/hospitales-afiliados" component={requireRole("admin", HospitalesAView)} />
            <Route path="/servicios-cubiertos" component={requireRole("admin", ServiciosView)} />
            <Route path="/reportes" component={requireRole("admin", ReportesView)} />
            <Route path="/polizas" component={requireRole("admin", PolizasView)} />
            <Route path="/pagos" component={requireRole("admin", PagosView)} />
            <Route path="/coberturas" component={requireRole("admin", CoberturasView)} />
            <Route path="/aprobacion-org" component={requireRole("admin", AprobacionOrgView)} />
            <Route path="/hospitales" component={requireRole("admin", HospitalesView)} />
            <Route path="/seguros" component={requireRole("admin", SegurosView)} />
            <Route path="/aprobacion" component={requireRole("admin", AprobacionView)} />
            <Route path="/fichastecnicas" component={requireRole("admin", FichaTecnicaView)} />
            <Route path="/fichastecnicas/:id" component={requireRole("admin", FichaTecnicaDetail)} />
            
            <Route path="/operadoras/fichastm" component={requireRole("admin", FichasTM)} />
            <Route path="/operadoras/fichastm/:id" component={requireRole("admin", FichasDetalleTM)} />
            <Route path="/citas" component={requireRole("admin", Citas)} /> 
            <Route path="/copago" component={requireRole("admin", Copago)} /> 
            <Route path="/pages-historia" component={requireRole("admin", AdminHistoriaView)} />
            <Route path="/pages-contacto" component={requireRole("admin", AdminContactoView)} />
            <Route path="/pages-faq" component={requireRole("admin", AdminFaqView)} />
            <Route path="/pages-proveedores" component={requireRole("admin", AdminRedProveedores)} />
            <Route path="/pages-testimonios" component={requireRole("admin", AdminTestimoniosView)} />
            <Route path="/pages-home" component={requireRole("admin", AdminHomeView)} />
            <Route path="/pages-navbar" component={requireRole("admin", NavbarView)} />
            <Route path="/pages" component={requireRole("admin", PaginasView)} />


            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
), document.getElementById("root") as HTMLElement);
