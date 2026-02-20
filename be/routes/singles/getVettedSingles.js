import pool from '../../db/connection.js';

export async function getVettedSingles(req, res) {
  try {
    const result = await pool.query(
      `SELECT s.singles_id, s.profile_image_url, s.profile_image_pk, s.vetted_status
       FROM public.singles s
       WHERE s.vetted_status = true
       ORDER BY COALESCE(s.updated_at, s.created_at) DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching vetted singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
}
