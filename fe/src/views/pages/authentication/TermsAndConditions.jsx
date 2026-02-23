import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import AuthInnerStack from './AuthInnerStack';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// ================================|| TERMS AND CONDITIONS ||================================ //

export default function TermsAndConditions() {
  return (
    <AuthWrapper1>
      <Stack sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <AuthInnerStack sx={{ py: 1 }}>
          <Box sx={{ m: { xs: 0.5, sm: 1 }, mb: 0, maxWidth: 900, width: '100%' }}>
            <AuthCardWrapper tight sx={{ maxWidth: { xs: '100%', lg: 900 } }}>
              <Stack spacing={1} sx={{ alignItems: 'flex-start', textAlign: 'left', maxHeight: '85vh', overflow: 'auto' }}>
                <Box>
                  <Link to="/pages/login" aria-label="logo">
                    <Logo />
                  </Link>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Terms and Conditions of Service
                </Typography>
                <Typography variant="body1" paragraph>
                  This Agreement between you and <strong>vsingles.club</strong> applies to the vsingles.club website, our mobile applications (iOS and Android), and all related services (collectively, the &quot;Services&quot;). By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these terms (including our Privacy Policy) for the duration of your use. Specific features may have additional rules; we may update this agreement and will post a revised version on this page.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>1. Eligibility</Typography>
                <Typography variant="body1" paragraph>
                  You must be 18 or older and single or legally separated. vsingles.club does not currently perform automated criminal record checks but reserves the right to verify.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>2. Use of the Services</Typography>
                <Typography variant="body1" paragraph>
                  Basic Membership is free and includes compatibility assessment, limited profile, and predefined interactions. Premium Membership includes paid features (unblurred photos, advanced filters, match unlocks, virtual goods). Billing is subject to auto-renewal and cancellation policy. Use of mobile apps is also subject to Apple/Google terms.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>3. Proprietary Rights</Typography>
                <Typography variant="body1" paragraph>
                  vsingles.club retains rights to its technology and content and grants you a limited personal, non-commercial license.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>4. User Information</Typography>
                <Typography variant="body1" paragraph>
                  We handle your data as described in our Privacy Policy. You are responsible for the content you post. Do not post personal contact details (email, phone, address) in your public profile.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>5. Risk and Safety</Typography>
                <Typography variant="body1" paragraph>
                  Please review our Safety Guidelines.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>6. Disclaimer of Warranties</Typography>
                <Typography variant="body1" paragraph>
                  Services are provided &quot;<strong>AS IS</strong>&quot;.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>7. Limitation of Liability</Typography>
                <Typography variant="body1" paragraph>
                  Total liability is limited to the amount paid for the account or <strong>$25.00</strong>.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>8. Statutory Cancellation Rights</Typography>
                <Typography variant="body1" paragraph>
                  Residents of AZ, CA, CO, CT, IL, IA, MN, NY, NC, OH, RI, WI may have additional cancellation rights. Cancel via email: <strong>subscriptions@vsingles.club</strong>.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>9. Arbitration and Class Action Waiver</Typography>
                <Typography variant="body1" paragraph>
                  Binding individual arbitration applies as set forth in the full terms.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>10. Automatic Renewals</Typography>
                <Typography variant="body1" paragraph>
                  Auto-renewal process and how to disable it are described in the full terms.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>11. Mobile Messaging Terms</Typography>
                <Typography variant="body1" paragraph>
                  By providing your mobile number, you agree to receive text messages from vsingles.club for account security, identity verification, and service updates.
                </Typography>
                <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
                  <Typography component="li" variant="body1" paragraph>
                    <strong>Voluntary Consent:</strong> Opting into mobile messaging is voluntary. <strong>Consent is not a requirement to create an account or use the vsingles.club service. You may use our platform without opting into SMS marketing or notifications.</strong>
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    <strong>How to Opt-Out:</strong> You may cancel the SMS service at any time by texting &quot;<strong>STOP</strong>&quot; to the number from which you received the message. You will receive a final confirmation SMS to verify unsubscription.
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    <strong>Support:</strong> For assistance, reply &quot;<strong>HELP</strong>&quot; to any message or contact support at <strong>privacy@vsingles.club</strong>.
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    <strong>Charges:</strong> Message and data rates may apply. Message frequency varies based on your account activity and interactions.
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Revision Date: February 12, 2026.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  © 2026 vsingles.club. All rights reserved.
                </Typography>
              </Stack>
            </AuthCardWrapper>
          </Box>
        </AuthInnerStack>
        <Box sx={{ px: 1, my: 1 }}>
          <AuthFooter hideVettedSinglesText />
        </Box>
      </Stack>
    </AuthWrapper1>
  );
}
