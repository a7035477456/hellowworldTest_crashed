import pool from '../db/connection.js';

export const getSingles = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, job_title, description, email, phone, location, profile_image_url, created_at, updated_at FROM singles ORDER BY id ASC'
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
};

