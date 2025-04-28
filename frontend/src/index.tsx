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

// Páginas informativas
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
import ManageCitas from "./views/ManageCitas";
import FichasTM from "./views/FichasTM";
import FichasDetalleTM from "./views/FichasDetalleTM";
import EmpleadosView from "./views/EmpleadosView";
import Citas from "./views/Citas";
import Copago from "./views/copagoView";
import SolicitudServiceView from "./views/SolicitudServiceView.jsx";
import FarmaciasView from "./views/FarmaciasView.jsx";
import Resultados from "./views/Resultados.jsx";

import PaginasView from "./views/PaginasEdt/PaginasView";
import AdminHistoriaView from "./views/PaginasEdt/AdminHistoriaView";
import AdminContactoView from "./views/PaginasEdt/AdminContactoView";
import AdminFaqView from "./views/PaginasEdt/AdminFaqView";
import AdminRedProveedores from "./views/PaginasEdt/AdminRedProveedores";
import AdminTestimoniosView from "./views/PaginasEdt/AdminTestimoniosView";
import AdminHomeView from "./views/PaginasEdt/AdminHomeView";
import NavbarView from "./views/PaginasEdt/NavbarView";
import FooterEdit from "./views/PaginasEdt/FooterEdit";
import ModeracionView from "./views/PaginasEdt/ModeracionView";
import DraftEditorView from "./views/PaginasEdt/DraftEditorView";
import PerfilPaciente from "./views/PerfilPaciente";

import { restoreSession, isLoggedIn, userRole } from "./stores/authStore";

// Restaurar sesión al iniciar la app
restoreSession();

// Middleware para proteger rutas
const ProtectedRoute = (allowedRoles: string[], Component: any) => {
  return () => (isLoggedIn() && allowedRoles.includes(userRole()) ? <Component /> : <NotFound />);
};

render(() => (
  <Router>
    <Route path="/" component={App}>
      {/* Rutas públicas */}
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

      {/* Rutas protegidas para Admin y Empleado */}
      <Route path="/operadoras" component={ProtectedRoute(["admin", "empleado"], OperadorasView)} />
      <Route path="/clientes" component={ProtectedRoute(["admin"], ClientesView)} />
      <Route path="/servicios-cubiertos" component={ProtectedRoute(["admin"], ServiciosView)} />
      <Route path="/reportes" component={ProtectedRoute(["admin"], ReportesView)} />
      <Route path="/citas" component={ProtectedRoute(["admin"], Citas)} />
      <Route path="/managecitas" component={ProtectedRoute(["admin"], ManageCitas)} />
      <Route path="/solicitudes" component={ProtectedRoute(["admin"], SolicitudServiceView)} />
      <Route path="/resultados" component={ProtectedRoute(["admin"], Resultados)} />

      {/* Rutas protegidas para cliente */}
      <Route path="/perfil-paciente" component={ProtectedRoute(["cliente"], PerfilPaciente)} />      

      {/* Rutas solo para Admin */}
      <Route path="/users" component={ProtectedRoute(["admin"], Users)} />
      <Route path="/hospitales-afiliados" component={ProtectedRoute(["admin"], HospitalesAView)} />
      <Route path="/hospitales" component={ProtectedRoute(["admin"], HospitalesView)} />
      <Route path="/polizas" component={ProtectedRoute(["admin"], PolizasView)} />
      <Route path="/pagos" component={ProtectedRoute(["admin"], PagosView)} />
      <Route path="/coberturas" component={ProtectedRoute(["admin"], CoberturasView)} />
      <Route path="/seguros" component={ProtectedRoute(["admin"], SegurosView)} />
      <Route path="/aprobacion" component={ProtectedRoute(["admin"], AprobacionView)} />
      <Route path="/aprobacion-org" component={ProtectedRoute(["admin"], AprobacionOrgView)} />
      <Route path="/farmacias" component={ProtectedRoute(["admin"], FarmaciasView)} />
      <Route path="/fichastecnicas" component={ProtectedRoute(["admin"], FichaTecnicaView)} />
      <Route path="/fichastecnicas/:id" component={ProtectedRoute(["admin"], FichaTecnicaDetail)} />
      <Route path="/operadoras/fichastm" component={ProtectedRoute(["admin"], FichasTM)} />
      <Route path="/operadoras/fichastm/:id" component={ProtectedRoute(["admin"], FichasDetalleTM)} />
      <Route path="/copago" component={ProtectedRoute(["admin"], Copago)} />

      {/* Páginas de edición de contenido (solo admin) */}
      <Route path="/pages" component={ProtectedRoute(["admin"], PaginasView)} />
      <Route path="/pages-historia" component={ProtectedRoute(["admin"], AdminHistoriaView)} />
      <Route path="/pages-contacto" component={ProtectedRoute(["admin"], AdminContactoView)} />
      <Route path="/pages-faq" component={ProtectedRoute(["admin"], AdminFaqView)} />
      <Route path="/pages-proveedores" component={ProtectedRoute(["admin"], AdminRedProveedores)} />
      <Route path="/pages-testimonios" component={ProtectedRoute(["admin"], AdminTestimoniosView)} />
      <Route path="/pages-home" component={ProtectedRoute(["admin"], AdminHomeView)} />
      <Route path="/pages-navbar" component={ProtectedRoute(["admin"], NavbarView)} />
      <Route path="/pages-footer" component={ProtectedRoute(["admin"], FooterEdit)} />
      <Route path="/moderacion" component={ProtectedRoute(["admin"], ModeracionView)} />
      <Route path="/drafts/:id" component={ProtectedRoute(["admin"], DraftEditorView)} />

      {/* Autenticación */}
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      
      {/* Ruta de error */}
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById("root") as HTMLElement);
