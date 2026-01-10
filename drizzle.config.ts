// drizzle.config.js
import 'dotenv/config';
import { url } from 'node:inspector';

export default {
  out: './src/drizzle',        
  schema: './src/config/schema.js', 
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'mysql://root:@localhost:3300/storebook',
  },
};