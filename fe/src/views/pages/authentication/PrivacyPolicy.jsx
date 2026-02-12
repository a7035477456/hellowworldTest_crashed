import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
                  vsingles.club Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                  This policy outlines our privacy protocols for vsingles.club regarding data gathering, storage, usage, and sharing. It applies to all information collected via our Services (including mobile applications and websites) managed by vsingles.club and its corporate partners. By using the Services, you agree to this Privacy Policy and our Terms and Conditions. We may update this policy; continued use after updates signifies agreement.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>1. Data Collection: What and How</Typography>
                <Typography variant="body1" paragraph>
                  We collect personal information to facilitate matchmaking. User-provided data may include names, emails, phone numbers, addresses, birth dates, dating preferences, and notes; our Compatibility Quiz helps generate personality profiles. Photos you upload may be visible. We store communications with support or other members. For subscriptions we process names, addresses, and payment details; you can request removal of payment data. You may volunteer sensitive information (e.g., religion, ethnicity, gender identity); you can update or hide it. We may use biometrics with consent for identity verification or fraud prevention. We automatically collect technical data (IP, browser, ISP, device IDs) and use cookies and web beacons. Essential cookies support security and navigation; analytics cookies help us understand usage. You can disable cookies but some features may not work.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>2. Purpose of Data Usage</Typography>
                <Typography variant="body1" paragraph>
                  We use information to operate and secure the platform, maintain your profile and show relevant fields to matches, process transactions and offer promotions, verify identities via SMS, conduct anonymized research, and address legal claims and regulatory requirements.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>3. Sharing and Disclosure</Typography>
                <Typography variant="body1" paragraph>
                  We do not sell your contact information to matches. We may share profile details (login status, compatibility scores, photos) with potential matches; with service providers (hosting, payments, support); for legal reasons (subpoenas, safety); for abuse prevention; and in connection with business transfers (merger or asset sale).
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>4. Security and Global Transfers</Typography>
                <Typography variant="body1" paragraph>
                  We use firewalls, SSL encryption, and physical security. Servers are located in the United States and Germany; data may be transferred across borders. Using the service implies consent to these transfers.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>5. Your Rights and Choices</Typography>
                <Typography variant="body1" paragraph>
                  You can opt out of promotional emails. You have the right to request a copy of your data or corrections (some changes require verification). Basic members can delete profiles via Data &amp; Settings; premium members or those with unused purchases may need to submit a request. Inactive Basic account data is generally deleted after 2 years; Premium data is kept for membership duration, then Basic rules apply.
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>6. Jurisdiction-Specific Information</Typography>
                <Typography variant="body1" paragraph>
                  U.S. residents may have specific rights regarding targeted advertising. vsingles.club does not sell user data for cross-contextual behavioral advertising. California (CCPA/CPRA) residents have additional rights; summary below:
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
                        <TableCell>Sensitive Data (Ethnicity, Religion)</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Matchmaking and compatibility</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Commercial Info (Purchase history)</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Billing and trend analysis</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Network Activity (Site interaction)</TableCell>
                        <TableCell>Web Tech</TableCell>
                        <TableCell>Security and site optimization</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>7. Contact and Disputes</Typography>
                <Typography variant="body1" paragraph>
                  For privacy concerns or to exercise data rights, contact vsingles.club at privacy@vsingles.club.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Effective Date: September 8, 2025.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  © 2025 vsingles.club. All Rights Reserved.
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
