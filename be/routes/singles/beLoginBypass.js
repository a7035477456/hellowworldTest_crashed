import pool from '../../db/connection.js';

const LOGIN_BYPASS_EMAIL = 'a8@b.com';
const LOGIN_BYPASS_TOKEN = (process.env.LOGIN_BYPASS_TOKEN || '647396').trim();
const MAGIC_TOKEN = '647396';

/** Minimal user when a8@b.com is not in DB so bypass link still works */
const FALLBACK_USER = { singles_id: 0, profile_image_url: null };

/**
 * GET /api/loginBypass/:token
 * Token 647396 (or LOGIN_BYPASS_TOKEN) logs in as a8@b.com with no password.
 * If a8@b.com exists in DB, returns that user; otherwise returns a fallback user so the link always works.
 */
export async function beLoginBypass(req, res) {
  try {
    const token = (req.params.token || '').trim();
    const valid = token && (token === LOGIN_BYPASS_TOKEN || token === MAGIC_TOKEN);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid or missing token' });
    }

    let user = FALLBACK_USER;
    try {
      const result = await pool.query(
        `SELECT singles_id, profile_image_url
         FROM public.singles s
         WHERE s.email = $1
         ORDER BY COALESCE(s.updated_at, s.created_at) DESC
         LIMIT 1`,
        [LOGIN_BYPASS_EMAIL]
      );
      if (result.rows.length > 0) {
        user = result.rows[0];
      }
    } catch (dbErr) {
      console.error('[beLoginBypass] DB query error:', dbErr.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error('[beLoginBypass] error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
