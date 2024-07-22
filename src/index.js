import app from './app.js';
import { connectDB } from './db.js';
// import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config();

connectDB();
app.listen(process.env.PORT_BACKEND || 3000);