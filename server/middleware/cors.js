const cors = require("cors");

const ACCEPTED_ORIGINS = [
  "https://vercel-dep1-client.vercel.app",
  // "http://localhost:3005",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      // Permite a las herramientas de desarrollo locales sin CORS
      return callback(null, true);
    }
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true);
    } else {
      // Rechaza el resto de orígenes
      return callback(new Error('Origen no permitido por la política CORS'), false);
    }
  }
};

module.exports = corsOptions;
