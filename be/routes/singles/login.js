import bcrypt from 'bcrypt';
import pool from '../../db/connection.js';

export async function verifyLoginPassword(req, res) {
  const log = (msg, data = {}) => console.log('[verifyLoginPassword]', msg, Object.keys(data).length ? data : '');
  try {
    log('entry', { bodyKeys: req.body ? Object.keys(req.body) : [] });
    const { email, password } = req.body;

    if (!email || !password) {
      log('reject: missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }
    log('query start', { email, passwordLength: typeof password === 'string' ? password.length : 'not-string' });

    const result = await pool.query(
      `SELECT singles_id, profile_image_url, password_hash
       FROM public.singles s
       WHERE s.email = $1
       ORDER BY COALESCE(s.updated_at, s.created_at) DESC
       LIMIT 1`,
      [email]
    );

    log('query done', { rowCount: result.rows.length });

    if (result.rows.length === 0) {
      log('reject: no user found');
      return res.status(401).json({ error: 'Login or Password fail' });
    }

    const user = result.rows[0];
    const providedPassword = (password && typeof password === 'string') ? password.trim() : '';
    const rawStored = user.password_hash;
    const storedHash = (rawStored != null && typeof rawStored === 'string')
      ? String(rawStored).trim()
      : '';

    log('password fields', {
      singles_id: user.singles_id,
      rawStoredType: typeof rawStored,
      rawStoredLength: rawStored == null ? null : (typeof rawStored === 'string' ? rawStored.length : String(rawStored).length),
      storedHashLength: storedHash.length,
      storedHashPreview: storedHash.length ? storedHash.slice(0, 15) + (storedHash.length > 15 ? '...' : '') : '(empty)',
    });

    const looksLikeBcrypt = storedHash.length >= 59 && /^\$2[aby]\$\d{2}\$/.test(storedHash);
    log('bcrypt check', { looksLikeBcrypt, storedHashLength: storedHash.length });

    let isPasswordValid = false;
    if (looksLikeBcrypt) {
      try {
        log('bcrypt.compare start');
        isPasswordValid = await bcrypt.compare(providedPassword, storedHash);
        log('bcrypt.compare done', { isPasswordValid });
      } catch (bcryptErr) {
        console.error('[verifyLoginPassword] bcrypt.compare error:', bcryptErr.message);
        console.error('[verifyLoginPassword] bcrypt stack:', bcryptErr.stack);
        return res.status(401).json({ error: 'Login or Password fail' });
      }
    } else {
      isPasswordValid = providedPassword === storedHash;
      log('plaintext compare', { isPasswordValid });
    }

    log('result', { isPasswordValid, singles_id: user.singles_id });

    if (!isPasswordValid) {
      log('reject: password invalid');
      return res.status(401).json({ error: 'Login or Password fail' });
    }

    const { password_hash, ...userWithoutPassword } = user;
    log('success', { singles_id: user.singles_id });
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('[verifyLoginPassword] CAUGHT ERROR:', error.message);
    console.error('[verifyLoginPassword] stack:', error.stack);
    res.status(500).json({ error: 'Failed to verify login' });
  }
}
