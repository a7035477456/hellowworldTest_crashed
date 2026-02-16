import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import os from 'os';
import fs from 'fs';

const homeEnvPath = path.join(os.homedir(), '.ssh', 'be', '.env');
// Reload ~/.ssh/be/.env if loadEnv didn't run first (e.g. script run directly from db/) or vars still missing
if (!process.env.DB_HOST) {
  const result = dotenv.config({ path: homeEnvPath });
  if (result.error) console.error('[connection] dotenv fallback:', result.error.message);
  if (!process.env.DB_HOST && fs.existsSync(homeEnvPath)) console.error('[connection] .env exists but DB_HOST not set – check variable names (DB_HOST=, DB_PORT=, etc.)');
}

console.log ('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const dbPassword = process.env.DB_PASSWORD;
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 50010,
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: dbPassword != null && dbPassword !== '' ? String(dbPassword) : '',
});

// Test connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  console.error('Please check your database connection settings in .env file');
  process.exit(-1);
});

// Test connection on startup (uses DB_* from ~/.ssh/be/.env)
pool.query('SELECT NOW()')
  .then(() => {
    console.log('Database connection test successful');
  })
  .catch((err) => {
    console.error('Database connection test failed:', err.message);
    console.error('Using: host=%s port=%s database=%s   username=%s password=%s', process.env.DB_HOST , process.env.DB_PORT, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);
    console.error('Fix: ensure PostgreSQL is running and ~/.ssh/be/.env has correct DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD (e.g. port 50010, database vsingles)');
  });

export default pool;

