import bcrypt from 'bcrypt';
import pool from '../../db/connection.js';

export async function verifyLoginPassword(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await pool.query(
      `SELECT singles_id, profile_image_url, password_hash
       FROM public.singles s
       WHERE s.email = $1
       ORDER BY COALESCE(s.updated_at, s.created_at) DESC
       LIMIT 1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Login or Password fail' });
    }

    const user = result.rows[0];
    const providedPassword = (password && typeof password === 'string') ? password.trim() : '';
    const storedHash = (user.password_hash != null && typeof user.password_hash === 'string')
      ? String(user.password_hash).trim()
      : '';

    const looksLikeBcrypt = storedHash.length >= 59 && /^\$2[aby]\$\d{2}\$/.test(storedHash);
    let isPasswordValid = false;
    if (looksLikeBcrypt) {
      try {
        isPasswordValid = await bcrypt.compare(providedPassword, storedHash);
      } catch (bcryptErr) {
        console.error('bcrypt.compare error:', bcryptErr.message);
        return res.status(401).json({ error: 'Login or Password fail' });
      }
    } else {
      isPasswordValid = providedPassword === storedHash;
    }

    console.log('Login attempt:', { email, gotRow: true, singles_id: user.singles_id, storedHashPreview: storedHash.slice(0, 20) + (storedHash.length > 20 ? '...' : ''), looksLikeBcrypt, isPasswordValid });

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Login or Password fail' });
    }

    const { password_hash, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Error verifying login:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: 'Failed to verify login' });
  }
}
