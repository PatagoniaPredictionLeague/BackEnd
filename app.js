import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
//Exporto las rutas
import userRoutes from './routes/User.Routes.js';
import userTablaRoutes from './routes/UserTabla.Routes.js';
import tablaRoutes from './routes/Tabla.Routes.js';
import competicionRoutes from './routes/Competicion.Routes.js';
import partidoRoutes from './routes/Partido.Routes.js';
import prediccionRoutes from './routes/Prediccion.Routes.js';
import fechaRoutes from './routes/Fecha.Routes.js';

dotenv.config();
//Configuracion del CORS
const app = express();

app.use(cors());



//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Routes
app.use(userRoutes);
app.use(partidoRoutes);
app.use(prediccionRoutes);
app.use(competicionRoutes);
app.use(tablaRoutes);
app.use(userTablaRoutes);
app.use(fechaRoutes);

export default app;


