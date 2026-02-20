import pool from '../../db/connection.js';

/**
 * GET /api/photo/:id
 * Serves image from public.photos by photos_id.
 */
export async function getPhoto(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id) || id < 1) {
      return res.status(400).json({ error: 'Invalid photo id' });
    }

    const result = await pool.query(
      `SELECT image_data, content_type FROM public.photos WHERE photos_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Photo not found');
    }

    const { image_data, content_type } = result.rows[0];
    const type = content_type || 'image/jpeg';
    res.setHeader('Content-Type', type);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(image_data);
  } catch (error) {
    console.error('[getPhoto] Error:', error);
    res.status(500).send('Failed to load photo');
  }
}
