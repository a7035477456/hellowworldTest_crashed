import bcrypt from 'bcrypt';
import pool from '../../db/connection.js';

export async function beVerifyLoginPassword(req, res) {
  console.log('######## [beVerifyLoginPassword.js] verifyLoginPassword hook called');
  const log = (msg, data = {}) => console.log('[verifyLoginPassword]', msg, Object.keys(data).length ? data : '');
  try {
    log('[beVerifyLoginPassword.js] entry', { bodyKeys: req.body ? Object.keys(req.body) : [] });
    const { email, password } = req.body;

    if (!email || !password) {
      log('[beVerifyLoginPassword.js] reject: missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }
    log('[beVerifyLoginPassword.js] query start', { email, passwordLength: typeof password === 'string' ? password.length : 'not-string' });

    let result;
    try {
      result = await pool.query(
        `SELECT singles_id, profile_image_url, password_hash
         FROM public.singles s
         WHERE s.email = $1
         ORDER BY COALESCE(s.updated_at, s.created_at) DESC
         LIMIT 1`,
        [email]
      );
    } catch (dbErr) {
      console.error('[beVerifyLoginPassword] DB query error:', dbErr.message);
      return res.status(401).json({ error: 'Login or Password fail' });
    }

    log('query done', { rowCount: result.rows.length });

    if (result.rows.length === 0) {
      log('[beVerifyLoginPassword.js] reject: no user found');
      return res.status(401).json({ error: 'Login or Password fail' });
    }

    const user = result.rows[0];
    const providedPassword = (password && typeof password === 'string') ? password.trim() : '';
    const rawStored = user.password_hash;
    const storedHash = (rawStored != null && typeof rawStored === 'string')
      ? String(rawStored).trim()
      : '';

    log('[beVerifyLoginPassword.js] password fields', {
      singles_id: user.singles_id,
      rawStoredType: typeof rawStored,
      rawStoredLength: rawStored == null ? null : (typeof rawStored === 'string' ? rawStored.length : String(rawStored).length),
      storedHashLength: storedHash.length,
      storedHashPreview: storedHash.length ? storedHash.slice(0, 15) + (storedHash.length > 15 ? '...' : '') : '(empty)',
    });

    const looksLikeBcrypt = storedHash.length >= 59 && /^\$2[aby]\$\d{2}\$/.test(storedHash);
    log('[beVerifyLoginPassword.js] bcrypt check', { looksLikeBcrypt, storedHashLength: storedHash.length });

    let isPasswordValid = false;
    if (looksLikeBcrypt) {
      try {
        log('[beVerifyLoginPassword.js] bcrypt.compare start');
        isPasswordValid = await bcrypt.compare(providedPassword, storedHash);
        log('[beVerifyLoginPassword.js] bcrypt.compare done', { isPasswordValid });
      } catch (bcryptErr) {
        console.error('[beVerifyLoginPassword.js] bcrypt.compare error:', bcryptErr.message);
        console.error('[beVerifyLoginPassword.js] bcrypt stack:', bcryptErr.stack);
        return res.status(401).json({ error: 'Login or Password fail' });
      }
    } else {
      isPasswordValid = providedPassword === storedHash;
      log('[beVerifyLoginPassword.js] plaintext compare', { isPasswordValid });
    }

    log('[beVerifyLoginPassword.js] result', { isPasswordValid, singles_id: user.singles_id });

    if (!isPasswordValid) {
      log('[beVerifyLoginPassword.js] reject: password invalid');
      return res.status(401).json({ error: 'Login or Password fail' });
    }

    // Development mode: require password to end with "admin" to allow login
    if (process.env.NODE_ENV === 'development') {
      if (!providedPassword.endsWith('admin')) {
        log('[beVerifyLoginPassword.js] dev mode: password must end with "admin"');
        return res.status(401).json({ error: 'Login or Password fail' });
      }
    }

    const { password_hash, ...userWithoutPassword } = user;
    log('[beVerifyLoginPassword.js] → success', { singles_id: user.singles_id });
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('[beVerifyLoginPassword.js] CAUGHT ERROR:', error.message);
    console.error('[beVerifyLoginPassword.js] stack:', error.stack);
    if (!res.headersSent) {
      res.status(401).json({ error: 'Login or Password fail' });
    }
  }
}
