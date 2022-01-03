import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

import { dbConnectionString } from '../settings';

export const pool = new Pool({
  connectionString: dbConnectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
