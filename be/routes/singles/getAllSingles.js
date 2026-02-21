import pool from '../../db/connection.js';

export async function getAllSingles(req, res) {
  try {
    const result = await pool.query(
      `SELECT singles_id, profile_image_url
       FROM public.singles s
       ORDER BY s.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
}
