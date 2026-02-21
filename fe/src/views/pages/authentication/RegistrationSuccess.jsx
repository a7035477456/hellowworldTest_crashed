import { useNavigate, useLocation } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';

import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ================================|| AUTH - REGISTRATION SUCCESS ||================================ //

export default function RegistrationSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  
  // Get email from navigation state
  const email = location.state?.email || '';

  const handleClose = () => {
    // Close the browser window/tab
    window.close();
    
    // If window.close() doesn't work (e.g., window wasn't opened by script),
    // fallback to navigating away
    setTimeout(() => {
      if (!document.hidden) {
        navigate('/pages/login');
      }
    }, 100);
  };

  return (
    <AuthWrapper1>
      <Stack sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 68px)' }}>
          <Box sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <AuthCardWrapper>
              <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Logo />
                </Box>
                <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Typography variant={downMD ? 'h4' : 'h3'} sx={{ color: 'secondary.main' }}>
                    Congratulations,
                  </Typography>
                  <Typography variant={downMD ? 'h4' : 'h3'} sx={{ color: 'secondary.main' }}>
                    Registration almost done
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'secondary.main', textAlign: 'center', mt: 1 }}>
                    Please open your email just sent to {email ? <strong>{email}</strong> : 'you'} and click the &quot;Create Password&quot; button or the link in the email to continue.
                  </Typography>
                </Stack>
                <Box sx={{ width: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <AnimateButton>
                    <Button
                      color="secondary"
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  </AnimateButton>
                </Box>
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
