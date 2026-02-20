import pool from '../../db/connection.js';

const LOGIN_BYPASS_EMAIL = 'a8@b.com';

/** Minimal user when a8@b.com is not in DB so bypass link still works */
const FALLBACK_USER = { singles_id: 0, profile_image_url: null };

/**
 * GET /api/loginBypass
 * Hidden backdoor: only the frontend route /pages/login-bypass/647396 leads here.
 * Logs in as a8@b.com with no password. Remove in production.
 */
export async function beLoginBypass(req, res) {
  try {
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
