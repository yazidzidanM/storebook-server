import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT,
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASS: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_DATABASE,
  NODE_ENV: process.env.NODE_ENV,
}

export default env