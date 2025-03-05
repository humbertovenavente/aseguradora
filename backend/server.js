import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import polizaRoutes from './routes/polizaRoutes.js'; 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/polizas', polizaRoutes); 

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error conectando a MongoDB:', err));

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
