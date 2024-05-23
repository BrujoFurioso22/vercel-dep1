import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  max: 80, // número máximo de clientes en el pool
  idleTimeoutMillis: 500000, // cierra y elimina un cliente que ha estado inactivo durante 500 segundos
  connectionTimeoutMillis: 50000, // retorna un error si una conexión no se ha establecido en 50 segundos
});
