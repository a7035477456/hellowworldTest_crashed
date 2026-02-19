import bcrypt from 'bcrypt';
import pool from '../../db/connection.js';

const LOG_PREFIX = '[createPassword]';

export async function createPassword(req, res) {
  try {
    const { code: codeRaw, email, password, phone } = req.body;
    const code = typeof codeRaw === 'string' ? codeRaw.trim().toUpperCase() : '';
    console.log(LOG_PREFIX, 'called', { email: email ? `${email.slice(0, 3)}***` : null, hasCode: !!code, hasPhone: !!phone });

    if (!code || !email || !password || !phone) {
      console.log(LOG_PREFIX, 'reject: missing body', { hasCode: !!code, hasEmail: !!email, hasPassword: !!password, hasPhone: !!phone });
      return res.status(400).json({ error: 'Email, registration code, password, and phone are required.' });
    }

    const emailNorm = String(email).trim().toLowerCase();
    let row;
    try {
      const result = await pool.query(
        `SELECT id, email, expires_at FROM public.registration_codes
         WHERE code = $1 AND used_at IS NULL AND expires_at > now()`,
        [code]
      );
      row = result.rows[0];
    } catch (dbErr) {
      console.error(LOG_PREFIX, 'DB error looking up code', dbErr.message);
      return res.status(500).json({ error: 'Failed to verify code. Please try again.' });
    }

    if (!row) {
      console.log(LOG_PREFIX, 'reject: code not found or expired or already used');
      return res.status(400).json({
        error: 'This code is invalid, expired, or already used. Please request a new registration email.'
      });
    }
    if (row.email.toLowerCase() !== emailNorm) {
      console.log(LOG_PREFIX, 'reject: email mismatch');
      return res.status(400).json({ error: 'Email does not match the registration. Please use the email that received the code.' });
    }

    // Mark code as used (one-time)
    await pool.query(
      `UPDATE public.registration_codes SET used_at = now() WHERE id = $1`,
      [row.id]
    );
    console.log(LOG_PREFIX, 'code validated', { emailPrefix: `${emailNorm.slice(0, 3)}***` });

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      console.log(LOG_PREFIX, 'reject: phone not 10 digits', { digits: phoneDigits.length });
      return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }
    const formattedPhone = `+1${phoneDigits}`;


    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioServiceSid = process.env.TWILIO_ServiceSID;

    const twilioEnvKeys = Object.keys(process.env).filter((k) => k.startsWith('TWILIO_'));

    console.log(LOG_PREFIX, 'Twilio env', {
      TWILIO_ACCOUNT_SID: twilioAccountSid ? `set (len ${twilioAccountSid.length})` : 'MISSING',
      TWILIO_AUTH_TOKEN: twilioAuthToken ? `set (len ${twilioAuthToken.length})` : 'MISSING',
      TWILIO_ServiceSID: twilioServiceSid ? `set (len ${twilioServiceSid.length})` : 'MISSING',
      allTwilioKeys: twilioEnvKeys
    });

    const isTwilioConfigured = twilioAccountSid && twilioAuthToken && twilioServiceSid;

    if (!isTwilioConfigured) {
      const missing = [
        !twilioAccountSid && 'TWILIO_ACCOUNT_SID',
        !twilioAuthToken && 'TWILIO_AUTH_TOKEN',
        !twilioServiceSid && 'TWILIO_ServiceSID'
      ].filter(Boolean);
      console.error(LOG_PREFIX, 'Twilio Verify not configured. Missing:', missing.join(', '));
      return res.status(500).json({
        error: 'SMS service not configured (v3)',
        details: 'Please configure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_ServiceSID in your .env file'
      });
    }

    console.log(LOG_PREFIX, 'code valid, sending SMS', { to: formattedPhone });
    try {
      console.log(LOG_PREFIX, 'Calling Twilio Verify', { to: formattedPhone, serviceSidPrefix: twilioServiceSid.slice(0, 6) + '...' });
      const twilio = (await import('twilio')).default;
      const client = twilio(twilioAccountSid, twilioAuthToken);

      await client.verify.v2.services(twilioServiceSid).verifications.create({
        to: formattedPhone,
        channel: 'sms'
      });

      console.log(LOG_PREFIX, 'Twilio Verify SMS sent', { to: formattedPhone });

      const passwordHash_AAAAA = await bcrypt.hash(password, 6);
      const expiresAt_AAAAA = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      await pool.query(
        `INSERT INTO public.pending_phone_verifications (email, phone, password_hash, expires_at)
         VALUES ($1, $2, $3, $4)`,
        [emailNorm, formattedPhone, passwordHash_AAAAA, expiresAt_AAAAA]
      );

      res.json({ success: true, message: 'Verification code sent to your phone' });
    } catch (error) {
      console.error(LOG_PREFIX, 'Twilio error (link was valid; failure is SMS/config)', {
        code: error.code,
        message: error.message,
        status: error.status,
        moreInfo: error.moreInfo,
        stack: error.stack
      });
      return res.status(500).json({
        error: 'Failed to send verification SMS',
        details: error.message || 'Please check Twilio configuration.'
      });
    }
  } catch (error) {
    console.error(LOG_PREFIX, 'unexpected error (not link stale)', { message: error.message, stack: error.stack });
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to process password creation' });
    }
  }
}
