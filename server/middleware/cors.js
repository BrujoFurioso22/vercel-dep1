const cors = require("cors");

const ACCEPTED_ORIGINS = [
  "https://vercel-dep1-client.vercel.app",
  // "http://localhost:3005",
];

const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      // Permitir solicitudes sin origen (como solicitudes locales/no CORS)
      if (!origin) {
        console.log("Solicitud recibida sin origen específico");
        return callback(null, true);
      }

      // Permitir solicitudes solo desde los orígenes aceptados
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Rechazar cualquier otro origen
      return callback(
        new Error("Origen no permitido por la política CORS"),
        false
      );
    },
  });

module.exports = corsMiddleware;
