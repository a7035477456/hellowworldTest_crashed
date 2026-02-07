import crypto from 'crypto';
import bcrypt from 'bcrypt';
import pool from '../db/connection.js';
import nodemailer from 'nodemailer';

// Secure tokens for "Create Password" links (single-use, time-limited)
// Format: { token: { email, expiresAt } }
const createPasswordTokens_JJJJJJJJ = new Map();
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export const registerUser_FFFFFFFF = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if SMTP is configured
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const isSmtpConfigured = smtpUser && smtpPass && 
                             smtpUser !== 'your-email@gmail.com' && 
                             smtpPass !== 'your-app-password';

    // Only send email if SMTP is properly configured
    if (isSmtpConfigured) {
      // Create a transporter for sending emails
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      // Generate secure single-use token so only the person who received the email can create password
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = Date.now() + TOKEN_EXPIRY_MS;
      createPasswordTokens_JJJJJJJJ.set(token, { email, expiresAt });
      const createPasswordLink = `http://localhost:3000/pages/createPassword?token=${token}&email=${encodeURIComponent(email)}`;
      const mailOptions = {
        from: smtpUser,
        to: email,
        subject: 'Complete Your Registration - Create Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to VSingles!</h2>
            <p>Thank you for registering. To complete your registration, please create your password by clicking the link below:</p>
            <p style="margin: 20px 0;">
              <a href="${createPasswordLink}" 
                 style="display: inline-block; padding: 12px 24px; background-color: #1976d2; color: white; text-decoration: none; border-radius: 4px;">
                Create Password V11
              </a>
            </p>
            <p>Or copy and paste this link into your browser:</p>
            <p style="color: #666; word-break: break-all;">${createPasswordLink}</p>
            <p style="margin-top: 30px; color: #999; font-size: 12px;">
              If you did not register for this account, please ignore this email.
            </p>
          </div>
        `
      };

      // Send email
      try {
        await transporter.sendMail(mailOptions);
        console.log('Registration email sent to:', email);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        
        // Check for Gmail App Password error
        let errorMessage = emailError.message || 'Please check your SMTP configuration and try again.';
        let errorDetails = '';
        
        if (emailError.code === 'EAUTH' || 
            (emailError.message && emailError.message.includes('Application-specific password required'))) {
          errorDetails = 'Gmail requires an App Password when 2FA is enabled. ' +
            'Go to: Google Account → Security → 2-Step Verification → App passwords. ' +
            'Generate an app password for "Mail" and use it as SMTP_PASS in your .env file.';
        } else if (emailError.message) {
          errorDetails = emailError.message;
        }
        
        // Always fail if email can't be sent - user needs the email to continue
        return res.status(500).json({ 
          error: 'Failed to send registration email',
          details: errorDetails || errorMessage
        });
      }
    } else {
      // SMTP not configured - return error in both development and production
      console.error('SMTP not configured. Cannot send registration email.');
      console.error('Please configure SMTP_USER and SMTP_PASS in your .env file.');
      return res.status(500).json({ 
        error: 'Email service not configured. Cannot send registration email.',
        details: 'Please configure SMTP_USER and SMTP_PASS in your backend .env file. For Gmail, you need to use an App Password.'
      });
    }

    res.json({ 
      success: true, 
      message: 'Registration email sent successfully' 
    });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ error: 'Failed to process registration' });
  }
};

export const verifyLoginPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Query singles table (same DB as in be/.env: DB_NAME must match where your data lives, e.g. vsingles)
    const result = await pool.query(
      `SELECT 
        singles_id, 
        profile_image_url,
        password_hash
      FROM public.singles s 
      WHERE s.email = $1
      ORDER BY COALESCE(s.updated_at, s.created_at) DESC
      LIMIT 1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        error: 'Login or Password fail'
      });
    }

    const user = result.rows[0];
    const providedPassword = (password && typeof password === 'string') ? password.trim() : '';
    const storedHash = user.password_hash?.trim() || '';

    // Support both bcrypt hashes ($2a$, $2b$) and plain text (e.g. dev/test)
    const looksLikeBcrypt = /^\$2[aby]\$\d{2}\$/.test(storedHash);
    const isPasswordValid = looksLikeBcrypt
      ? await bcrypt.compare(providedPassword, storedHash)
      : providedPassword === storedHash;

    // Temporary debug: remove once login works
    console.log('Login attempt:', { email, gotRow: true, singles_id: user.singles_id, storedHashPreview: storedHash.slice(0, 20) + (storedHash.length > 20 ? '...' : ''), looksLikeBcrypt, isPasswordValid });

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
    console.error('Error verifying login:', error.message);
    console.error('Stack:', error.stack);
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

// In-memory storage for user data during verification
// Format: { email_phone: { password, email, phone } }
const pendingVerifications = new Map();

export const createPassword_GGGGGGGG = async (req, res) => {
  try {
    const { token, email, password, phone } = req.body;

    if (!token || !email || !password || !phone) {
      return res.status(400).json({ error: 'Invalid link. Please use the link from your registration email.' });
    }

    // Validate secure token (prevents anyone who knows the email from setting a password)
    const stored = createPasswordTokens_JJJJJJJJ.get(token);
    if (!stored) {
      return res.status(400).json({ error: 'This link is invalid or has already been used. Please request a new registration email.' });
    }
    if (stored.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(400).json({ error: 'Invalid link. Please use the link from your registration email.' });
    }
    if (Date.now() > stored.expiresAt) {
      createPasswordTokens_JJJJJJJJ.delete(token);
      return res.status(400).json({ error: 'This link has expired. Please request a new registration email.' });
    }

    // Validate phone format (remove formatting)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }

    // Format phone as +1XXXXXXXXXX for Twilio (US numbers)
    const formattedPhone = `+1${phoneDigits}`;

    // Get Twilio credentials
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioServiceSid = process.env.TWILIO_ServiceSID;
    const isTwilioConfigured = twilioAccountSid && twilioAuthToken && twilioServiceSid;

    console.log('=== CREATE PASSWORD - TWILIO VERIFY ===');
    console.log('Email:', email);
    console.log('Phone:', formattedPhone);
    console.log('Twilio Service SID:', twilioServiceSid);
    console.log('Twilio configured:', isTwilioConfigured);
    console.log('========================================');

    if (!isTwilioConfigured) {
      console.error('❌ Twilio Verify not configured. Missing TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_ServiceSID');
      return res.status(500).json({ 
        error: 'SMS service not configured',
        details: 'Please configure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_ServiceSID in your .env file'
      });
    }

    try {
      // Dynamic import of twilio
      const twilio = (await import('twilio')).default;
      const client = twilio(twilioAccountSid, twilioAuthToken);



      // ***********************************************************
      // Send verification code using Twilio Verify API (Red Box code)
      // ***********************************************************
      const verification = await client.verify.v2.services(twilioServiceSid).verifications.create({
        to: formattedPhone,
        channel: 'sms'
      });
      // ***********************************************************


      console.log(`✅ Twilio Verify SMS sent to ${formattedPhone}`);
      console.log('Verification SID:', verification.sid);
      console.log('Verification Status:', verification.status);

      // Store user data for later use in verification
      const key = `${email}_${formattedPhone}`;
      pendingVerifications.set(key, {
        password: password,
        email: email,
        phone: formattedPhone
      });

      // One-time use: invalidate token so link cannot be reused
      createPasswordTokens_JJJJJJJJ.delete(token);

      res.json({ 
        success: true, 
        message: 'Verification code sent to your phone' 
      });
    } catch (error) {
      console.error('❌ Error sending verification via Twilio Verify:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        status: error.status,
        moreInfo: error.moreInfo
      });
      return res.status(500).json({ 
        error: 'Failed to send verification SMS',
        details: error.message || 'Please check Twilio configuration.'
      });
    }
  } catch (error) {
    console.error('Error in createPassword:', error);
    res.status(500).json({ error: 'Failed to process password creation' });
  }
};

export const verifyPhone_HHHHHHHH = async (req, res) => {
  try {
    const { email, phone, verificationCode: verificationCodeRaw } = req.body;

    if (!email || !phone) {
      return res.status(400).json({ error: 'Email, phone, and verification code are required' });
    }

    // Normalize verification code: string, trim, digits only (Twilio expects plain digits)
    const verificationCode = String(verificationCodeRaw ?? '')
      .trim()
      .replace(/\D/g, '');
    if (!verificationCode || verificationCode.length !== 6) {
      return res.status(400).json({
        error: 'Invalid verification code',
        details: 'The verification code must be exactly 6 digits.'
      });
    }

    // Format phone
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }
    const formattedPhone = `+1${phoneDigits}`;

    // Get Twilio credentials
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioServiceSid = process.env.TWILIO_ServiceSID;
    const isTwilioConfigured = twilioAccountSid && twilioAuthToken && twilioServiceSid;

    console.log('=== VERIFY PHONE - TWILIO VERIFY ===');
    console.log('Email:', email);
    console.log('Phone:', formattedPhone);
    console.log('Verification Code:', verificationCode);
    console.log('Twilio Service SID:', twilioServiceSid);
    console.log('====================================');

    if (!isTwilioConfigured) {
      console.error('❌ Twilio Verify not configured');
      return res.status(500).json({ 
        error: 'SMS service not configured',
        details: 'Please configure Twilio Verify in your .env file'
      });
    }

    // Look up stored user data
    const key = `${email}_${formattedPhone}`;
    const storedData = pendingVerifications.get(key);

    if (!storedData) {
      return res.status(400).json({ error: 'Verification session not found. Please start the verification process again.' });
    }

    try {
      // Dynamic import of twilio
      const twilio = (await import('twilio')).default;
      const client = twilio(twilioAccountSid, twilioAuthToken);

      // ***********************************************************
      // Check verification code using Twilio Verify API (Green Box code)
      // ***********************************************************
      const check = await client.verify.v2.services(twilioServiceSid).verificationChecks.create({
        to: formattedPhone,
        code: verificationCode
      });

      console.log('Verification Check Status:', check.status);
      console.log('Verification Check SID:', check.sid);

      // Check if verification was approved
      if (check.status === 'approved') {
        // Verification successful - create user in database
        try {
          // Check if user already exists
          const existingUser = await pool.query(
            'SELECT singles_id FROM public.singles WHERE email = $1',
            [email]
          );

          if (existingUser.rows.length > 0) {
            // User already exists - update password and phone
            await pool.query(
              `UPDATE public.singles 
               SET password_hash = $1, phone = $2, updated_at = CURRENT_TIMESTAMP 
               WHERE email = $3`,
              [storedData.password, formattedPhone, email]
            );
          } else {
            // Insert new user
            await pool.query(
              `INSERT INTO public.singles (email, password_hash, phone, user_status, created_at, updated_at)
               VALUES ($1, $2, $3, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
              [email, storedData.password, formattedPhone]
            );
          }

          // Remove stored data after successful verification
          pendingVerifications.delete(key);

          console.log('✅ Phone verified successfully. Account created.');
          res.json({ 
            success: true, 
            message: 'Phone verified successfully. Account created.' 
          });
        } catch (dbError) {
          console.error('Database error in verifyPhone:', dbError);
          res.status(500).json({ error: 'Failed to create account. Please try again.' });
        }
      } else {
        // Verification failed
        console.log('❌ Verification code check failed. Status:', check.status);
        res.status(400).json({ 
          error: 'Invalid verification code',
          details: 'The verification code is incorrect. Please try again.'
        });
      }
    } catch (error) {
      console.error('❌ Error checking verification via Twilio Verify:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        status: error.status,
        moreInfo: error.moreInfo
      });
      
      // If it's an invalid code error, return specific error
      if (error.code === 20404 || error.message?.includes('not found') || error.message?.includes('invalid')) {
        return res.status(400).json({ 
          error: 'Invalid verification code',
          details: 'The verification code is incorrect or expired. Please try again.'
        });
      }
      
      return res.status(500).json({ 
        error: 'Failed to verify phone',
        details: error.message || 'Please try again.'
      });
    }
  } catch (error) {
    console.error('Error in verifyPhone:', error);
    res.status(500).json({ error: 'Failed to verify phone' });
  }
};