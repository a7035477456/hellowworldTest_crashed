import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

console.log ('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 50010,
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
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

// Test connection on startup (uses DB_* from be/.env)
pool.query('SELECT NOW()')
  .then(() => {
    console.log('Database connection test successful');
  })
  .catch((err) => {
    console.error('Database connection test failed:', err.message);
    console.error('Using: host=%s port=%s database=%s   username=%s password=%s', process.env.DB_HOST , process.env.DB_PORT, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);
    console.error('Fix: ensure PostgreSQL is running and be/.env has correct DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD (e.g. port 50010, database vsingles)');
  });

export default pool;

