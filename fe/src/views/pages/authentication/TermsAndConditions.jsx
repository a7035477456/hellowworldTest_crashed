import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// ================================|| TERMS AND CONDITIONS ||================================ //

export default function TermsAndConditions() {
  return (
    <AuthWrapper1>
      <Stack sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 68px)', py: 3 }}>
          <Box sx={{ m: { xs: 1, sm: 3 }, mb: 0, maxWidth: 900, width: '100%' }}>
            <AuthCardWrapper sx={{ maxWidth: { xs: '100%', lg: 900 } }}>
              <Stack spacing={2} sx={{ alignItems: 'flex-start', textAlign: 'left', maxHeight: '70vh', overflow: 'auto' }}>
                <Box>
                  <Link to="/pages/login" aria-label="logo">
                    <Logo />
                  </Link>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Terms and Conditions of Service
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Print or Save as PDF
                </Typography>
                <Typography variant="body1" paragraph>
                  This Agreement between you and <strong>vsingles.club</strong> applies to the vsingles.club website, our mobile applications (iOS and Android), and all related services (collectively, the &quot;Services&quot;). By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these terms (including our Privacy Policy) for the duration of your use. Specific features may have additional rules; we may update this agreement and will post a revised version on this page.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 2 }}>Summary Table of Sections</Typography>
                <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
                  <Typography component="li" variant="body2">1. Eligibility</Typography>
                  <Typography component="li" variant="body2">2. Use of the Services</Typography>
                  <Typography component="li" variant="body2">3. Proprietary Rights</Typography>
                  <Typography component="li" variant="body2">4. User Information</Typography>
                  <Typography component="li" variant="body2">5. Risk and Safety</Typography>
                  <Typography component="li" variant="body2">6. Disclaimer of Warranties</Typography>
                  <Typography component="li" variant="body2">7. Limitation of Liability</Typography>
                  <Typography component="li" variant="body2">8. Statutory Cancellation Rights (State-Specific)</Typography>
                  <Typography component="li" variant="body2">9. Arbitration and Class Action Waiver</Typography>
                  <Typography component="li" variant="body2">10. Automatic Renewals</Typography>
                  <Typography component="li" variant="body2">10. Privacy &amp; Communication</Typography>
                  <Typography component="li" variant="body2">18. Revision Date</Typography>
                </Box>
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
                  Services are provided &quot;AS IS&quot;.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>7. Limitation of Liability</Typography>
                <Typography variant="body1" paragraph>
                  Total liability is limited to the amount paid for the account or $25.00.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>8. Statutory Cancellation Rights (State-Specific)</Typography>
                <Typography variant="body1" paragraph>
                  Residents of AZ, CA, CO, CT, IL, IA, MN, NY, NC, OH, RI, WI may have additional cancellation rights. Cancel via email: subscriptions@vsingles.club.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>9. Arbitration and Class Action Waiver</Typography>
                <Typography variant="body1" paragraph>
                  Binding individual arbitration applies as set forth in the full terms.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>10. Automatic Renewals</Typography>
                <Typography variant="body1" paragraph>
                  Auto-renewal process and how to disable it are described in the full terms.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Revision Date: This Agreement was last updated on February 12, 2026.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Copyright © 2026 vsingles.club. All rights reserved.
                </Typography>
                <Button component={Link} to="/pages/login" variant="contained" color="secondary" sx={{ alignSelf: 'center', mt: 2 }}>
                  Back to Login
                </Button>
              </Stack>
            </AuthCardWrapper>
          </Box>
        </Stack>
        <Box sx={{ px: 3, my: 3 }}>
          <AuthFooter />
        </Box>
      </Stack>
    </AuthWrapper1>
  );
}
