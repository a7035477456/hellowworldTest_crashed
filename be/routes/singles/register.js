import crypto from 'crypto';
import nodemailer from 'nodemailer';
import pool from '../../db/connection.js';
import { createPasswordTokens, TOKEN_EXPIRY_MS } from './store.js';

const EMAIL_EXISTS_ERROR = 'Account with this email already exists. Please enter another email or login with link below';

export async function registerUser(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const emailTrimmed = String(email).trim().toLowerCase();
    let existing;
    try {
      existing = await pool.query('SELECT 1 FROM public.singles WHERE LOWER(email) = $1', [emailTrimmed]);
    } catch (dbError) {
      console.error('DB error checking existing email:', dbError);
      return res.status(500).json({
        error: 'Failed to process registration',
        details: 'Database error while checking email. Please try again.'
      });
    }
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: EMAIL_EXISTS_ERROR });
    }

    const smtpUser = process.env.SMTP_USER;
    // Gmail app passwords are 16 chars; if stored with spaces (e.g. "xxxx xxxx xxxx xxxx"), use without spaces
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
    const isSmtpConfigured = smtpUser && smtpPass &&
      smtpUser !== 'your-email@gmail.com' &&
      smtpPass !== 'your-app-password';

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPortNum = parseInt(process.env.SMTP_PORT, 10) || 587;
    const maskPass = (p) => (p && p.length >= 4) ? p.slice(0, 2) + '****' + p.slice(-2) : '(not set or too short)';
    console.log('[SMTP] Using: SMTP_HOST=' + smtpHost + ' SMTP_PORT=' + smtpPortNum + ' SMTP_USER=' + (smtpUser || '(not set)') + ' SMTP_PASS=' + maskPass(smtpPass));

    if (isSmtpConfigured) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPortNum,
          secure: false,
          auth: { user: smtpUser, pass: smtpPass }
        });

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = Date.now() + TOKEN_EXPIRY_MS;
        createPasswordTokens.set(token, { email: emailTrimmed, expiresAt });
        const createPasswordLink = `https://vsingles.club/pages/createPassword?token=${token}&email=${encodeURIComponent(emailTrimmed)}`;
        const mailOptions = {
          from: '"VSingles Support" <support@vsingles.club>',
          to: emailTrimmed,
          subject: 'Complete Your Registration - Create Password',
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to VSingles!</h2>
            <p>Thank you for registering. To complete your registration, please create your password by clicking the link below:</p>
            <p style="margin: 20px 0;">
              <a href="${createPasswordLink}" style="display: inline-block; padding: 12px 24px; background-color: #1976d2; color: white; text-decoration: none; border-radius: 4px;">Create Password</a>
            </p>
            <p>Or copy and paste this link into your browser:</p>
            <p style="color: #666; word-break: break-all;">${createPasswordLink}</p>
            <p style="margin-top: 30px; color: #999; font-size: 12px;">If you did not register for this account, please ignore this email.</p>
          </div>
        `
        };

        await transporter.sendMail(mailOptions);
        console.log('Registration email sent to:', emailTrimmed);
      } catch (emailError) {
        console.error('Error in registration email step:', emailError);
        let errorDetails = '';
        if (emailError.code === 'EAUTH' || (emailError.message && emailError.message.includes('Application-specific password required'))) {
          errorDetails = 'Gmail requires an App Password when 2FA is enabled. Go to: Google Account → Security → 2-Step Verification → App passwords. Generate an app password for "Mail" and use it as SMTP_PASS in your .env file.';
        } else if (emailError.message) {
          errorDetails = emailError.message;
        }
        return res.status(500).json({
          error: 'Failed to send registration email',
          details: errorDetails || (emailError.message || '') || 'Please check your SMTP configuration and try again.'
        });
      }
    } else {
      const detailsMsg = 'SMTP_USER and SMTP_PASS must be set in backend .env (and not placeholders). For Gmail use an App Password.';
      console.error('SMTP not configured. Cannot send registration email.', detailsMsg);
      return res.status(500).json({
        error: 'Email service not configured. Cannot send registration email.',
        details: detailsMsg
      });
    }

    res.json({ success: true, message: 'Registration email sent successfully' });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({
      error: 'Failed to process registration',
      details: error.message || 'An unexpected error occurred.'
    });
  }
}
