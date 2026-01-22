import pool from '../db/connection.js';

export const verifyLoginPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // First, get the user by email along with their password (stored as plain text)
    const result = await pool.query(
      `SELECT 
        singles_id, 
        profile_image_url,
        password_hash
      FROM public.singles s 
      WHERE s.email = $1
      ORDER BY s.lastLoginTime DESC
      LIMIT 1`,
      [email]
    );

    if (result.rows.length === 0) {
      // User doesn't exist
      return res.status(401).json({ 
        error: 'Login or Password fail'
      });
    }

    const user = result.rows[0];
    
    // Debug logging to see what we're comparing
    console.log('=== LOGIN DEBUG ===');
    console.log('Email provided:', email);
    console.log('Password provided:', password);
    console.log('Password provided length:', password?.length);
    console.log('Password provided charCodes:', password?.split('').map(c => c.charCodeAt(0)));
    console.log('Password from DB:', user.password_hash);
    console.log('Password from DB length:', user.password_hash?.length);
    console.log('Password from DB charCodes:', user.password_hash?.split('').map(c => c.charCodeAt(0)));
    console.log('Password from DB is null/undefined?', user.password_hash == null);
    console.log('Are they equal (before trim)?', password === user.password_hash);
    console.log('Type of provided:', typeof password);
    console.log('Type of DB:', typeof user.password_hash);
    
    // Compare the provided password with the stored plain text password
    // Trim both values to handle any whitespace issues
    const providedPassword = password?.trim() || '';
    const storedPassword = user.password_hash?.trim() || '';
    const isPasswordValid = providedPassword === storedPassword;
    
    console.log('Provided (trimmed):', `"${providedPassword}"`);
    console.log('Stored (trimmed):', `"${storedPassword}"`);
    console.log('Are they equal (after trim)?', isPasswordValid);
    console.log('==================');

    if (!isPasswordValid) {
      // Password is wrong
      return res.status(401).json({ 
        error: 'Login or Password fail'
      });
    }

    // Remove password_hash from response for security
    const { password_hash, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Error verifying login:', error);
    res.status(500).json({ error: 'Failed to verify login' });
  }
};




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
        s.profile_image_url,
        s.vetted_status
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
      console.error('Error fetching singles:', error);
      res.status(500).json({ error: 'Failed to fetch singles from database' });
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