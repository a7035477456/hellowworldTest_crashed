import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import { verifyLoginPassword } from './routes/singles_be.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { registerUser_FFFFFFFF } from './routes/singles_be.js';
import { getAllSingles_BBBBBBBB } from './routes/singles_be.js';
import { getVettedSingles_CCCCCCCC } from './routes/singles_be.js';
import { getSinglesInterested_DDDDDDD } from './routes/singles_be.js';
import { getSinglesRequest_EEEEEEEE } from './routes/singles_be.js';
import { createPassword_GGGGGGGG } from './routes/singles_be.js';
import { verifyPhone_HHHHHHHH } from './routes/singles_be.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/verifyPassword', verifyLoginPassword);
app.post('/api/register', registerUser_FFFFFFFF);
app.post('/api/createPassword', createPassword_GGGGGGGG);
app.post('/api/verifyPhone', verifyPhone_HHHHHHHH);
app.get('/api/allSingles', getAllSingles_BBBBBBBB);
app.get('/api/vettedSingles', getVettedSingles_CCCCCCCC);
app.get('/api/interestedSingles', getSinglesInterested_DDDDDDD);
app.get('/api/requestedSingles', getSinglesRequest_EEEEEEEE);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve built frontend from fe/dist when present (same port as API)
const feDist = path.join(__dirname, '..', 'fe', 'dist');
if (fs.existsSync(feDist)) {
  app.use(express.static(feDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(feDist, 'index.html'));
  });
}

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

