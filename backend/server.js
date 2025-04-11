import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import polizaRoutes from './routes/polizaRoutes.js'; 
import authRoutes from './routes/authRoutes.js';
import clientesRoutes from './routes/clientesRoutes.js';
import pagoRoutes from './routes/pagoRoutes.js';
import coberturaRoutes from './routes/coberturaRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import servicioRoutes from './routes/servicioRoutes.js';
import seguroRoutes from './routes/seguroRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import empleadosRoutes from './routes/empleadosRoutes.js';
import usuariosRoutes from "./routes/usuariosRoutes.js";
import rolesRoutes from "./routes/rolesRoutes.js";
import aseguradoraRoutes from "./routes/aseguradoras.js";
import solicitudRoutes from './routes/solicitudesRoutes.js';
import recetasRoutes from './routes/recetasRoutes.js';
import solicitudAtencionRoutes from "./routes/solicitudAtencionRoutes.js";






// Páginas editables
import historiaRoutes from "./routes/PaginasEdt/historiaRoutes.js";
import contactoRoutes from "./routes/PaginasEdt/contactoRoutes.js";
import faqRoutes from "./routes/PaginasEdt/faqRoutes.js";
import redProveedoresRoutes from "./routes/PaginasEdt/redProveedoresRoutes.js";
import testimoniosRoutes from "./routes/PaginasEdt/testimoniosRoutes.js";

import fichaTecnicaRoutes from './routes/fichaTecnicaRoutes.js';

import citaRoutes from "./routes/citas.js";
import homeRoutes from "./routes/PaginasEdt/homeRoutes.js";
import clientePoliza from "./routes/clientePoliza.js";

import dashboardTrabajador from './routes/dashboardTrabajador.js';
import reporteRouter from './routes/reporte.js';
import menuRoutes from './routes/menuRoutes.js';
import footerRoutes from './routes/footerRoutes.js';
import moderacionRoutes from "./routes/moderacionRoutes.js";
import solicitudesFarmaciaRoutes from './routes/solicitudesFarmaciaRoutes.js';



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/polizas', polizaRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/coberturas', coberturaRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/hospitales', hospitalRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/seguros', seguroRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/roles", rolesRoutes);
app.use('/api/fichatecnica', fichaTecnicaRoutes);
app.use("/api/citas", citaRoutes);
app.use('/api/polizas-clientes', clientePoliza);
app.use('/api/dashboard-trabajador', dashboardTrabajador);
app.use("/api/solicitudes", solicitudRoutes);
app.use('/api/reporte', reporteRouter);
app.use('/api/recetas', recetasRoutes);
app.use("/api/solicitudes-atencion", solicitudAtencionRoutes);



// ✅ Servir archivos Excel de la carpeta /reportes
app.use('/reportes', express.static(path.join(process.cwd(), 'reportes')));

// ✅ Rutas
app.use('/api/reporte', reporteRouter);
// - Solicitudes de Hospital
app.use("/api/solicitudes/hospital", solicitudRoutes);
// - Solicitudes de Farmacia
app.use("/api/solicitudes/farmacia", solicitudesFarmaciaRoutes);
app.use("/api/aseguradoras", aseguradoraRoutes);




//  Rutas de páginas editables claramente definidas
app.use('/api/historia', historiaRoutes);
app.use('/api/contacto', contactoRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/redProveedores', redProveedoresRoutes);
app.use('/api/testimonios', testimoniosRoutes);
app.use("/api/home", homeRoutes);
//menu
app.use('/api/menu', menuRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/moderacion", moderacionRoutes);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error(' Error conectando a MongoDB:', err));

app.get('/', (req, res) => {
    res.send('🚀 API funcionando correctamente');
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


