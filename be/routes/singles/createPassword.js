import { createPasswordTokens, pendingVerifications } from './store.js';

const LOG_PREFIX = '[createPassword]';

export async function createPassword(req, res) {
  try {
    const { token, email, password, phone } = req.body;
    console.log(LOG_PREFIX, 'called', { email: email ? `${email.slice(0, 3)}***` : null, hasToken: !!token, hasPhone: !!phone });

    if (!token || !email || !password || !phone) {
      console.log(LOG_PREFIX, 'reject: missing body');
      return res.status(400).json({ error: 'Invalid link. Please use the link from your registration email.' });
    }

    const stored = createPasswordTokens.get(token);
    if (!stored) {
      console.log(LOG_PREFIX, 'reject: token not found or expired');
      return res.status(400).json({ error: 'This link is invalid or has already been used. Please request a new registration email.' });
    }
    if (stored.email.toLowerCase() !== email.toLowerCase()) {
      console.log(LOG_PREFIX, 'reject: email mismatch');
      return res.status(400).json({ error: 'Invalid link. Please use the link from your registration email.' });
    }
    if (Date.now() > stored.expiresAt) {
      createPasswordTokens.delete(token);
      console.log(LOG_PREFIX, 'reject: token expired');
      return res.status(400).json({ error: 'This link has expired. Please request a new registration email.' });
    }

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

    try {
      console.log(LOG_PREFIX, 'Calling Twilio Verify', { to: formattedPhone, serviceSidPrefix: twilioServiceSid.slice(0, 6) + '...' });
      const twilio = (await import('twilio')).default;
      const client = twilio(twilioAccountSid, twilioAuthToken);

      await client.verify.v2.services(twilioServiceSid).verifications.create({
        to: formattedPhone,
        channel: 'sms'
      });

      console.log(LOG_PREFIX, 'Twilio Verify SMS sent', { to: formattedPhone });

      const key = `${email}_${formattedPhone}`;
      pendingVerifications.set(key, { password, email, phone: formattedPhone });
      createPasswordTokens.delete(token);

      res.json({ success: true, message: 'Verification code sent to your phone' });
    } catch (error) {
      console.error(LOG_PREFIX, 'Twilio error', { code: error.code, message: error.message, stack: error.stack });
      return res.status(500).json({
        error: 'Failed to send verification SMS',
        details: error.message || 'Please check Twilio configuration.'
      });
    }
  } catch (error) {
    console.error(LOG_PREFIX, 'unexpected error', { message: error.message, stack: error.stack });
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to process password creation' });
    }
  }
}
