import bcrypt from 'bcrypt';
import pool from '../../db/connection.js';
import { pendingVerifications } from './store.js';

export async function verifyPhone(req, res) {
  try {
    const { email, phone, verificationCode: verificationCodeRaw } = req.body;

    if (!email || !phone) {
      return res.status(400).json({ error: 'Email, phone, and verification code are required' });
    }

    const verificationCode = String(verificationCodeRaw ?? '').trim().replace(/\D/g, '');
    if (!verificationCode || verificationCode.length !== 6) {
      return res.status(400).json({
        error: 'Invalid verification code',
        details: 'The verification code must be exactly 6 digits.'
      });
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }
    const formattedPhone = `+1${phoneDigits}`;
    const emailNorm = String(email).trim().toLowerCase();

    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioServiceSid = process.env.TWILIO_ServiceSID;
    const isTwilioConfigured = twilioAccountSid && twilioAuthToken && twilioServiceSid;

    if (!isTwilioConfigured) {
      console.error('❌ Twilio Verify not configured');
      return res.status(500).json({
        error: 'SMS service not configured (v4)',
        details: 'Please configure Twilio Verify in your .env file'
      });
    }

    const key = `${emailNorm}_${formattedPhone}`;
    const storedData = pendingVerifications.get(key);
    if (!storedData) {
      return res.status(400).json({ error: 'Verification session not found. Please start the verification process again.' });
    }

    try {
      const twilio = (await import('twilio')).default;
      const client = twilio(twilioAccountSid, twilioAuthToken);

      const check = await client.verify.v2.services(twilioServiceSid).verificationChecks.create({
        to: formattedPhone,
        code: verificationCode
      });

      if (check.status === 'approved') {
        try {
          const passwordHash = await bcrypt.hash(storedData.password, 6);
          const existingUser = await pool.query('SELECT singles_id FROM public.singles WHERE LOWER(email) = $1', [emailNorm]);

          if (existingUser.rows.length > 0) {
            await pool.query(
              `UPDATE public.singles SET password_hash = $1, phone = $2, updated_at = CURRENT_TIMESTAMP WHERE LOWER(email) = $3`,
              [passwordHash, formattedPhone, emailNorm]
            );
          } else {
            await pool.query(
              `INSERT INTO public.singles (email, password_hash, phone, user_status, created_at, updated_at)
               VALUES ($1, $2, $3, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
              [emailNorm, passwordHash, formattedPhone]
            );
          }

          pendingVerifications.delete(key);
          console.log('✅ Phone verified successfully. Account created.');
          return res.json({ success: true, message: 'Phone verified successfully. Account created.' });
        } catch (dbError) {
          console.error('Database error in verifyPhone:', dbError);
          return res.status(500).json({ error: 'Failed to create account. Please try again.' });
        }
      }

      console.log('❌ Verification code check failed. Status:', check.status);
      res.status(400).json({
        error: 'Invalid verification code',
        details: 'The verification code is incorrect. Please try again.'
      });
    } catch (error) {
      console.error('❌ Error checking verification via Twilio Verify:', error);
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
}
