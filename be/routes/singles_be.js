import pool from '../db/connection.js';

export const getAllSingles_BBBBBBBB = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        singles_id, 
        profile_image_url
      FROM public.singles s 
      ORDER BY s.lastLoginTime desc`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
};

export const getVettedSingles_CCCCCCCC = async (req, res) => {
  try {
    const result = await pool.query(
        `SELECT 
        s.singles_id,
        s.profile_image_url
      FROM public.singles s
      WHERE (s.vetted_status=true)
      ORDER BY s.lastLoginTime DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
};

export const getSinglesInterested_DDDDDDD = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        s.singles_id,
        s.profile_image_url,
        r.interested AS interested_date
      FROM public.singles s
      JOIN public.requests r ON s.singles_id = r.singles_id_from
      WHERE r.interested IS NOT NULL
      ORDER BY s.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
};

export const getSinglesRequest_EEEEEEEE = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        s.singles_id,
        r.*
      FROM public.singles s
      JOIN public.requests r ON s.singles_id = r.singles_id_from;
      ORDER BY s.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
};