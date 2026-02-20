import pool from '../../db/connection.js';

const LOGIN_BYPASS_EMAIL = 'a8@b.com';
const LOGIN_BYPASS_TOKEN = (process.env.LOGIN_BYPASS_TOKEN || '647396').trim();

/**
 * GET /api/loginBypass/:token
 * If token matches LOGIN_BYPASS_TOKEN, returns { success: true, user } for a8@b.com.
 * Used for direct link login with no login/password dialog (e.g. /pages/login-bypass/647396).
 * Requires a8@b.com to exist in public.singles; default token is 647396 unless LOGIN_BYPASS_TOKEN is set.
 */
export async function beLoginBypass(req, res) {
  try {
    const token = (req.params.token || '').trim();
    if (!token || token !== LOGIN_BYPASS_TOKEN) {
      return res.status(401).json({ error: 'Invalid or missing token' });
    }

    const result = await pool.query(
      `SELECT singles_id, profile_image_url
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
