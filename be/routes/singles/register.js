import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { createPasswordTokens, TOKEN_EXPIRY_MS } from './store.js';

export async function registerUser(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const smtpUser = process.env.SMTP_USER;
    // Gmail app passwords are 16 chars; if stored with spaces (e.g. "xxxx xxxx xxxx xxxx"), use without spaces
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
    const isSmtpConfigured = smtpUser && smtpPass &&
      smtpUser !== 'your-email@gmail.com' &&
      smtpPass !== 'your-app-password';

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = process.env.SMTP_PORT || '587';
    const maskPass = (p) => (p && p.length >= 4) ? p.slice(0, 2) + '****' + p.slice(-2) : '(not set or too short)';
    console.log('[SMTP] Using: SMTP_HOST=' + smtpHost + ' SMTP_PORT=' + smtpPort + ' SMTP_USER=' + (smtpUser || '(not set)') + ' SMTP_PASS=' + maskPass(smtpPass));

    if (isSmtpConfigured) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: { user: smtpUser, pass: smtpPass }
      });

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = Date.now() + TOKEN_EXPIRY_MS;
      createPasswordTokens.set(token, { email, expiresAt });
      const createPasswordLink = `https://vsingles.club/pages/createPassword?token=${token}&email=${encodeURIComponent(email)}`;
      const mailOptions = {
        from: smtpUser,
        to: email,
        subject: 'Complete Your Registration - Create Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to VSingles!</h2>
            <p>Thank you for registering. To complete your registration, please create your password by clicking the link below:</p>
            <p style="margin: 20px 0;">
              <a href="${createPasswordLink}" style="display: inline-block; padding: 12px 24px; background-color: #1976d2; color: white; text-decoration: none; border-radius: 4px;">Create Password V11</a>
            </p>
            <p>Or copy and paste this link into your browser:</p>
            <p style="color: #666; word-break: break-all;">${createPasswordLink}</p>
            <p style="margin-top: 30px; color: #999; font-size: 12px;">If you did not register for this account, please ignore this email.</p>
          </div>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('Registration email sent to:', email);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        let errorDetails = '';
        if (emailError.code === 'EAUTH' || (emailError.message && emailError.message.includes('Application-specific password required'))) {
          errorDetails = 'Gmail requires an App Password when 2FA is enabled. Go to: Google Account → Security → 2-Step Verification → App passwords. Generate an app password for "Mail" and use it as SMTP_PASS in your .env file.';
        } else if (emailError.message) {
          errorDetails = emailError.message;
        }
        return res.status(500).json({
          error: 'Failed to send registration email',
          details: errorDetails || emailError.message || 'Please check your SMTP configuration and try again.'
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
    res.status(500).json({ error: 'Failed to process registration' });
  }
}
