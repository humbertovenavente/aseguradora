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

import usuariosRoutes from "./routes/usuariosRoutes.js";
import rolesRoutes from "./routes/rolesRoutes.js";

import fichaTecnicaRoutes from './routes/fichaTecnicaRoutes.js';

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
app.use('/api/hospitales', hospitalRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/seguros', seguroRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/roles", rolesRoutes);
app.use('/api/fichatecnica', fichaTecnicaRoutes);
app.use("/api/citas", citaRoutes);

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


