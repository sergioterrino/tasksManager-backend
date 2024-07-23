import app from './app.js';
import { connectDB } from './db.js';
// import 'dotenv/config';
import dotenv from 'dotenv';
// dotenv.config();
// Decide qué archivo de configuración cargar basado en NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

dotenv.config({ path: envFile });

connectDB();
app.listen(process.env.PORT_BACKEND || 3000);