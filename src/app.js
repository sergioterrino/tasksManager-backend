import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import 'dotenv/config';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN_RENDER, // permito que solo se conecte desde mi front
  credentials: true // xra que permita enviar cookies en la preflight
}))
app.use(morgan('dev')); // Esto facilita un log para las requests
app.use(express.json()); // para que acepte formatos json en el req.body
app.use(cookieParser()); // permite rescatar las cookies directamente

app.use('/api', authRoutes); // cargo las routes y le añado un contexto a todos los endpoints
app.use('/api', tasksRoutes);

export default app;