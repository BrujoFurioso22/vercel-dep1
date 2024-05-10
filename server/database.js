import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  max: 40, // número máximo de clientes en el pool
  idleTimeoutMillis: 30000, // cierra y elimina un cliente que ha estado inactivo durante 30 segundos
  connectionTimeoutMillis: 5000, // retorna un error si una conexión no se ha establecido en 2 segundos
});
