import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import partidaRoutes from './routes/partidaRoutes';
import { PartidaModel } from './modules/partidaModel';
import pool from './modules/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(), express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'API Tres en Raya'
    });
});

app.use('/api/partidas', partidaRoutes);

const iniciarServidor = async () => {
    try {
        await pool.query('SELECT NOW()');
        await PartidaModel.crearTabla();
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

iniciarServidor();

// pool.query(): Manda una consulta SQL a la base de datos para verificar la conexión.