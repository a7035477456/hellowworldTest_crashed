import pool from '../../db/connection.js';

export async function getSinglesInterested(req, res) {
  try {
    const result = await pool.query(`
      SELECT r.singles_id_to, s.singles_id, s.profile_image_url, s.vetted_status
      FROM public.requests r
      JOIN public.singles s ON r.singles_id_to = s.singles_id
      WHERE r.interested = true
      ORDER BY s.created_at DESC
    `);

    const processedRows = result.rows.map((row) => {
      const idValue = row.singles_id_to ?? row.singles_id;
      return {
        singles_id_to: idValue != null ? String(idValue) : null,
        profile_image_url: row.profile_image_url || null,
        vetted_status: row.vetted_status === true || row.vetted_status === 'true' || row.vetted_status === 1
      };
    }).filter((row) => row.singles_id_to != null);

    res.json(processedRows);
  } catch (error) {
    console.error('Error fetching interested singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
}
