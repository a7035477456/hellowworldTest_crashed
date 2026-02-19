import './loadEnv.js'; // load ~/.ssh/be/.env first so DB_* etc. are set regardless of cwd
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import pool from './db/connection.js';
import {
  beVerifyLoginPassword,
  registerUser_FFFFFFFF,
  getAllSingles_BBBBBBBB,
  getVettedSingles_CCCCCCCC,
  getSinglesInterested_DDDDDDD,
  getSinglesRequest_EEEEEEEE,
  createPassword_GGGGGGGG,
  verifyPhone_HHHHHHHH,
  resendPhoneCode,
} from './routes/singles/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 40000;

// Middleware – CORS: allow FE origins (default cors() allows all; explicit for clarity and credentials)
const allowedOrigins = [
  'http://localhost:40000',
  'http://localhost:3000',
  'https://vsingles.club',
  'http://vsingles.club',
  'https://www.vsingles.club',
  'http://www.vsingles.club',
  /^https?:\/\/.*\.vsingles\.club$/
];
app.use(cors({
  origin: (origin, cb) => {
    const allowed = !origin || allowedOrigins.some(o => (typeof o === 'string' ? o === origin : o.test(origin)));
    cb(null, allowed ? (origin || true) : false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rate limiters for auth/SMS/email endpoints (brute-force, enumeration, Twilio abuse)
const authRateLimiter_KKKKK = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
const resendPhoneCodeRateLimiter_LLLLL = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { error: 'Too many code requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check for HAProxy (httpchk GET /health)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// DB health check for frontend – verifies DB before any API use
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.status(200).json({ status: 'ok', dbConnected: true });
  } catch (err) {
    console.error('Database connection check failed:', err.message);
    res.status(503).json({ error: 'E3', message: 'Database connection failed' });
  }
});

// Server info: internal IP of this machine (for footer display)
function getInternalIp() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return null;
}
app.get('/api/serverInfo', (req, res) => {
  res.status(200).json({ internalIp: getInternalIp() || req.socket?.localAddress || '' });
});

// API routes (auth/SMS/email protected by rate limits)
app.post('/api/verifyPassword', authRateLimiter_KKKKK, beVerifyLoginPassword);
app.post('/api/register', authRateLimiter_KKKKK, registerUser_FFFFFFFF);
app.post('/api/createPassword', authRateLimiter_KKKKK, createPassword_GGGGGGGG);
app.post('/api/verifyPhone', authRateLimiter_KKKKK, verifyPhone_HHHHHHHH);
app.post('/api/resendPhoneCode', resendPhoneCodeRateLimiter_LLLLL, resendPhoneCode);
app.get('/api/allSingles', getAllSingles_BBBBBBBB);
app.get('/api/vettedSingles', getVettedSingles_CCCCCCCC);
app.get('/api/interestedSingles', getSinglesInterested_DDDDDDD);
app.get('/api/requestedSingles', getSinglesRequest_EEEEEEEE);

// Serve built frontend (fe/dist) – run fe build first (febedev/febeprod).
// On Ubuntu: ensure both vsingles.club and www.vsingles.club route to this app so /assets/* (e.g. Login-*.js) are served.
app.use(express.static(path.join(__dirname, '../fe/dist'), { index: false }));

// SPA: all other GET routes serve index.html (no-cache so registration/auth get fresh code)
app.get('*', (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.sendFile(path.join(__dirname, '../fe/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API endpoint: http://localhost:${PORT}/api/allSingles`);
});

