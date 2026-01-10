import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT,
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASS: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_DATABASE,
  NODE_ENV: process.env.NODE_ENV,
  SECRET_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN_SECRET,
  SECRET_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN_SECRET,
  EXPIRES_IN_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  EXPIRES_IN_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
}

export default env