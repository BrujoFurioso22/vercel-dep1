import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString:
    "postgres://default:0lcnJvxqICD9@ep-purple-band-a4xckkje.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
});
