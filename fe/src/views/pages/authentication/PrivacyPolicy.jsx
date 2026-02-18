import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// ================================|| PRIVACY POLICY ||================================ //

export default function PrivacyPolicy() {
  return (
    <AuthWrapper1>
      <Stack sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 68px)', py: 1 }}>
          <Box sx={{ m: { xs: 0.5, sm: 1 }, mb: 0, maxWidth: 900, width: '100%' }}>
            <AuthCardWrapper tight sx={{ maxWidth: { xs: '100%', lg: 900 } }}>
              <Stack spacing={1} sx={{ alignItems: 'flex-start', textAlign: 'left', maxHeight: '85vh', overflow: 'auto' }}>
                <Box>
                  <Link to="/pages/login" aria-label="logo">
                    <Logo />
                  </Link>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  vsingles.club Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                  This policy outlines vsingles.club&apos;s privacy protocols for data gathering, storage, usage, and sharing. It applies to all information collected via its Services (including mobile applications and websites) managed by vsingles.club and its corporate partners. By using the Services, you agree to the Privacy Policy and Terms and Conditions. The policy may be updated; continued use after updates signifies agreement.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>1. Data Collection: What and How</Typography>
                <Typography variant="body1" component="div" paragraph>
                  <Box component="span" sx={{ display: 'block', mb: 0.5 }}><strong>Personal Information:</strong> Collected to facilitate matchmaking. Includes names, emails, phone numbers, addresses, birth dates, dating preferences, and notes. A Compatibility Quiz generates personality profiles. Uploaded photos may be visible.</Box>
                  <Box component="span" sx={{ display: 'block', mb: 0.5 }}><strong>Communications:</strong> We store communications with support or other members.</Box>
                  <Box component="span" sx={{ display: 'block', mb: 0.5 }}><strong>Subscriptions:</strong> We process names, addresses, and payment details; you can request removal of payment data.</Box>
                  <Box component="span" sx={{ display: 'block', mb: 0.5 }}><strong>Sensitive Information:</strong> You may voluntarily provide sensitive information (e.g., religion, ethnicity, gender identity), which you can update or hide.</Box>
                  <Box component="span" sx={{ display: 'block', mb: 0.5 }}><strong>Biometrics:</strong> May be used with consent for identity verification or fraud prevention.</Box>
                  <Box component="span" sx={{ display: 'block', mb: 0.5 }}><strong>Automated Collection:</strong> We automatically collect technical data (IP, browser, ISP, device IDs) and use cookies and web beacons. Essential cookies support security and navigation, while analytics cookies help understand usage. You can disable cookies, but some features may not work.</Box>
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>2. Purpose of Data Usage</Typography>
                <Typography variant="body1" paragraph>
                  Information is used to operate and secure the platform, maintain user profiles and show relevant fields to matches, process transactions and offer promotions, verify identities via SMS, conduct anonymized research, and address legal claims and regulatory requirements.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>3. Sharing and Disclosure</Typography>
                <Typography variant="body1" component="div" paragraph>
                  <Box component="span" sx={{ display: 'block', mb: 0.5 }}><strong>No Sale:</strong> vsingles.club does not sell your contact information to matches.</Box>
                  <Box component="span" sx={{ display: 'block', mb: 0.5 }}><strong>Permitted Sharing:</strong> We may share profile details (login status, compatibility scores, photos) with potential matches; with service providers (hosting, payments, support); for legal reasons (subpoenas, safety); for abuse prevention; and in connection with business transfers (merger or asset sale).</Box>
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>4. Security and Global Transfers</Typography>
                <Typography variant="body1" paragraph>
                  We utilize firewalls, SSL encryption, and physical security measures. Servers are located in the United States and Germany. Data may be transferred across borders. Using the service implies consent to these transfers.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>5. Your Rights and Choices</Typography>
                <Typography variant="body1" paragraph>
                  You can opt out of promotional emails. You have the right to request a copy of your data or corrections (some changes require verification). Basic members can delete profiles via &quot;Data &amp; Settings.&quot; Premium members or those with unused purchases may need to submit a request. Inactive Basic account data is generally deleted after 2 years; Premium data is kept for the membership duration, after which Basic rules apply.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>6. Jurisdiction-Specific Information</Typography>
                <Typography variant="body1" paragraph>
                  <strong>U.S. Residents:</strong> May have specific rights regarding targeted advertising. vsingles.club does not sell user data for cross-contextual behavioral advertising.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>California (CCPA/CPRA) Residents:</strong> Have additional rights, summarized below:
                </Typography>
                <Paper variant="outlined" sx={{ width: '100%', overflow: 'auto' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Category</strong></TableCell>
                        <TableCell><strong>Source</strong></TableCell>
                        <TableCell><strong>Purpose</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Identifiers (Name, IP, Email)</TableCell>
                        <TableCell>User / Web Tech</TableCell>
                        <TableCell>Account management, matching, support</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Sensitive Data</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Matchmaking and compatibility</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>7. Contact and Disputes</Typography>
                <Typography variant="body1" paragraph>
                  For privacy concerns or to exercise data rights, you can contact vsingles.club at privacy@vsingles.club.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>8. SMS Messaging and Data Privacy</Typography>
                <Typography variant="body1" paragraph>
                  vsingles.club is committed to protecting your privacy regarding mobile communications.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>No Sharing:</strong> We do not sell, rent, or share your SMS opt-in data or mobile phone numbers with third parties or affiliates for marketing or promotional purposes.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Explicit Reiteration:</strong> Personal information gathered through the SMS opt-in process will <strong>not</strong> be shared with third parties or affiliates for marketing or promotional purposes. Your mobile information will not be shared with third parties or affiliates for marketing or promotional purposes.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Exclusion:</strong> The above excludes text messaging originator opt-in data and consent; this information will not be shared with any third parties.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Effective Date: September 8, 2025.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  © 2025 vsingles.club. All Rights Reserved.
                </Typography>
              </Stack>
            </AuthCardWrapper>
          </Box>
        </Stack>
        <Box sx={{ px: 1, my: 1 }}>
          <AuthFooter hideVettedSinglesText />
        </Box>
      </Stack>
    </AuthWrapper1>
  );
}
