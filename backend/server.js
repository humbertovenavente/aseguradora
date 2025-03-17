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
