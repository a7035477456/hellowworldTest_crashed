import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
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

// Test connection on startup
pool.query('SELECT NOW()')
  .then(() => {
    console.log('Database connection test successful');
  })
  .catch((err) => {
    console.error('Database connection test failed:', err.message);
    console.error('Please ensure PostgreSQL is running and .env file is configured correctly');
  });

export default pool;

