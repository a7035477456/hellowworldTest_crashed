import pool from '../../db/connection.js';

const LOGIN_BYPASS_EMAIL = 'a8@b.com';
const LOGIN_BYPASS_TOKEN = process.env.LOGIN_BYPASS_TOKEN || '647396';

/**
 * GET /api/loginBypass/:token
 * If token matches, returns { success: true, user } for a8@b.com (no login screen).
 * Used for support / direct link to dashboard.
 */
export async function beLoginBypass(req, res) {
  try {
    const token = req.params.token;
    if (!token || token !== LOGIN_BYPASS_TOKEN) {
      return res.status(401).json({ error: 'Invalid or missing token' });
    }

    const result = await pool.query(
      `SELECT singles_id, profile_image_url, profile_image_pk
       FROM public.singles s
       WHERE s.email = $1
       ORDER BY COALESCE(s.updated_at, s.created_at) DESC
       LIMIT 1`,
      [LOGIN_BYPASS_EMAIL]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    return res.json({ success: true, user });
  } catch (err) {
    console.error('[beLoginBypass] error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
