// Importar módulos necesarios
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.router.js';
import { corsMiddleware } from './middleware/cors.js';

// Cargar las variables de entorno
dotenv.config();

const app = express();

// Importar opciones de CORS desde un módulo

// Aplicar middleware de CORS con las opciones importadas
app.use(corsMiddleware());

// Desactivar la cabecera 'x-powered-by'
app.disable('x-powered-by');

// Middleware para parsear JSON
app.use(express.json());

// Utilizar el enrutador de usuarios
app.use("/api/users", userRouter);

// Escuchar en el puerto definido en las variables de entorno
app.listen(process.env.PORT, () => console.log(`Server started on PORT ${process.env.PORT}`));
