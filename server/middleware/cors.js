import cors from "cors";

const DEFAULT_ACCEPTED_ORIGINS = [
  "https://vercel-dep1-client.vercel.app",
  "http://localhost:3005",
];

export const corsMiddleware = ({
  acceptedOrigins = DEFAULT_ACCEPTED_ORIGINS,
} = {}) =>
  cors({
    origin: (origin, callback) => {
      // Permitir solicitudes sin origen (como herramientas de desarrollo local)
      if (!origin) {
        console.log("Solicitud recibida sin origen específico:", origin);
        // return callback(null, false);
      }

      // Permitir solicitudes de orígenes que están en la lista de aceptados
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Rechazar cualquier otro origen con un mensaje de error específico
      const msg =
        "El origen de tu solicitud no está permitido por la política de CORS";
      return callback(msg, false);
    },
  });
