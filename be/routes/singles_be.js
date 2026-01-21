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
    // Try query with interested field (boolean or date)
    let result;
    try {
      result = await pool.query(`
        SELECT
          r.singles_id_to,
          s.singles_id,
          s.profile_image_url,
          s.vetted_status
        FROM public.requests r
               JOIN public.singles s ON r.singles_id_to = s.singles_id
        WHERE r.interested = true 
        ORDER BY s.lastLoginTime DESC;
      `);
    } catch (fieldError) {
      // // If interested field doesn't exist, try without the WHERE clause
      // // This will return all requests (you may want to adjust this logic)
      // console.log('interested field not found, trying alternative query');
      // result = await pool.query(`
      //   SELECT
      //     r.singles_id_to,
      //     s.singles_id,
      //     s.profile_image_url
      //   FROM public.requests r
      //          JOIN public.singles s ON r.singles_id_to = s.singles_id
      //   ORDER BY s.lastLoginTime DESC;
      // `);
    }

    console.log('Backend - result.rows:', JSON.stringify(result.rows, null, 2));
    console.log('Backend - first row:', result.rows[0]);
    console.log('Backend - first row keys:', result.rows[0] ? Object.keys(result.rows[0]) : 'no rows');

    // Ensure singles_id_to is always present, use singles_id as fallback
    // Convert to string to ensure consistent type
    const processedRows = result.rows.map((row) => {
      const idValue = row.singles_id_to ?? row.singles_id;
      return {
        singles_id_to: idValue != null ? String(idValue) : null,
        profile_image_url: row.profile_image_url || null,
        vetted_status: row.vetted_status === true || row.vetted_status === 'true' || row.vetted_status === 1
      };
    }).filter((row) => row.singles_id_to != null); // Filter out any rows with null IDs

    console.log('Backend - processedRows:', JSON.stringify(processedRows, null, 2));
    res.json(processedRows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Database error' });
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