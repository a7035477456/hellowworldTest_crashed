/**
 * Load be/.env before any other app code so DB_*, PORT, etc. are set
 * regardless of process cwd. Must be imported first in server_be.js.
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '.env');
let result = dotenv.config({ path: envPath });

// If DB_* still missing, try cwd/be/.env (e.g. when started from project root)
if (!process.env.DB_HOST) {
  const cwdBeEnv = path.resolve(process.cwd(), 'be', '.env');
  if (fs.existsSync(cwdBeEnv)) {
    result = dotenv.config({ path: cwdBeEnv });
    if (process.env.DB_HOST) console.log('[loadEnv] Loaded from cwd/be/.env:', cwdBeEnv);
  }
}

if (result.error) {
  console.error('[loadEnv] Failed to load .env:', result.error.message);
  console.error('[loadEnv] Tried path:', envPath);
}
if (!process.env.DB_HOST) {
  const exists = fs.existsSync(envPath);
  console.error('[loadEnv] DB_HOST still undefined. File exists?', exists, 'Path:', envPath);
  console.error('[loadEnv] Create be/.env from be/.env.example and set DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD.');
}
