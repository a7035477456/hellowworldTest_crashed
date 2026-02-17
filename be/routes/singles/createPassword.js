import { createPasswordTokens, pendingVerifications } from './store.js';

export async function createPassword(req, res) {
  try {
    const { token, email, password, phone } = req.body;

    if (!token || !email || !password || !phone) {
      return res.status(400).json({ error: 'Invalid link. Please use the link from your registration email.' });
    }

    const stored = createPasswordTokens.get(token);
    if (!stored) {
      return res.status(400).json({ error: 'This link is invalid or has already been used. Please request a new registration email.' });
    }
    if (stored.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(400).json({ error: 'Invalid link. Please use the link from your registration email.' });
    }
    if (Date.now() > stored.expiresAt) {
      createPasswordTokens.delete(token);
      return res.status(400).json({ error: 'This link has expired. Please request a new registration email.' });
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }
    const formattedPhone = `+1${phoneDigits}`;

    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioServiceSid = process.env.TWILIO_ServiceSID;
    const isTwilioConfigured = twilioAccountSid && twilioAuthToken && twilioServiceSid;

    if (!isTwilioConfigured) {
      console.error('❌ Twilio Verify not configured.');
      return res.status(500).json({
        error: 'SMS service not configured (v3)',
        details: 'Please configure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_ServiceSID in your .env file'
      });
    }

    try {
      const twilio = (await import('twilio')).default;
      const client = twilio(twilioAccountSid, twilioAuthToken);

      await client.verify.v2.services(twilioServiceSid).verifications.create({
        to: formattedPhone,
        channel: 'sms'
      });

      console.log(`✅ Twilio Verify SMS sent to ${formattedPhone}`);

      const key = `${email}_${formattedPhone}`;
      pendingVerifications.set(key, { password, email, phone: formattedPhone });
      createPasswordTokens.delete(token);

      res.json({ success: true, message: 'Verification code sent to your phone' });
    } catch (error) {
      console.error('❌ Error sending verification via Twilio Verify:', error);
      return res.status(500).json({
        error: 'Failed to send verification SMS',
        details: error.message || 'Please check Twilio configuration.'
      });
    }
  } catch (error) {
    console.error('Error in createPassword:', error);
    res.status(500).json({ error: 'Failed to process password creation' });
  }
}
