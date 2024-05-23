// Importar módulos necesarios
import express from 'express';
import { userRouter } from './routes/user.router.js';
import { tablasRouter } from './routes/tablas.router.js';
import { corsMiddleware } from './middleware/cors.js';
import { descripcionesRouter } from './routes/descripciones.router.js';
import { ventasRouter } from './routes/ventas.router.js';
import { juegoRouter } from './routes/juego.router.js';
import { pdfRouter } from './routes/pdf.router.js';
import timeout from 'connect-timeout'; 
// Cargar las variables de entorno
const app = express();

// Aumentar el límite del tamaño del payload permitido
app.use(express.json({ limit: '50MB' }));
app.use(express.urlencoded({ limit: '50MB', extended: true }));

app.use(corsMiddleware());

// Desactivar la cabecera 'x-powered-by'
// app.disable('x-powered-by');

app.use(express.static('public'));

app.use(timeout('1000s'));  // 100 segundos de tiempo de espera


// Utilizar el enrutador de usuarios
app.use("/api/users", userRouter);
app.use("/api/tablas", tablasRouter);
app.use("/api/descripciones", descripcionesRouter);
app.use("/api/ventas", ventasRouter);
app.use("/api/juegos", juegoRouter);
app.use("/api/pdf", pdfRouter);

// Escuchar en el puerto definido en las variables de entorno
app.listen(process.env.PORT, () => console.log(`Server started on PORT ${process.env.PORT}`));
