import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString:
    "postgres://default:AIl7cEO3GMXm@ep-red-truth-a2kily8j-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require",
});
