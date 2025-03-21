import express from 'express';
import cors from 'cors';
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
//paginas editables
import historiaRoutes from "./routes/PaginasEdt/historiaRoutes.js";
import contactoRoutes from "./routes/PaginasEdt/contactoRoutes.js";
import faqRoutes from "./routes/PaginasEdt/faqRoutes.js";
import redProveedoresRoutes from "./routes/PaginasEdt/redProveedoresRoutes.js";
import testimoniosRoutes from "./routes/PaginasEdt/testimoniosRoutes.js";

import fichaTecnicaRoutes from './routes/fichaTecnicaRoutes.js';
import copagoRoutes from './routes/copagoRoutes.js';

import citaRoutes from "./routes/citas.js";



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
app.use('/api/copagos', copagoRoutes);
<<<<<<< HEAD
app.use('/api/', copagoRoutes);

=======
//paginas editables
app.use('/api/historia', historiaRoutes);
app.use('/api/contacto', contactoRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/redProveedores', redProveedoresRoutes);
app.use('/api/testimonios', testimoniosRoutes);
>>>>>>> 9e9bdf5af91bd4a5420cae58959f85e01fc46ca4

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log(' Conectado a MongoDB'))
    .catch(err => console.error(' Error conectando a MongoDB:', err));

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


