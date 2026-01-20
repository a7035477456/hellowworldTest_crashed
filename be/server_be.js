import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getSingles_BBBBBBBB } from './routes/singles_be.js';
import { getVettedSingles_CCCCCCCC } from './routes/singles_be.js';
import { getSinglesInterested_DDDDDDD } from './routes/singles_be.js';
import { getSinglesRequest_EEEEEEEE } from './routes/singles_be.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/allSingles', getSingles_BBBBBBBB);
app.get('/api/vettedSingles', getVettedSingles_CCCCCCCC);
app.get('/api/interestedSingles', getSinglesInterested_DDDDDDD);
app.get('/api/requestedSingles', getSinglesRequest_EEEEEEEE);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
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

