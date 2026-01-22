import { useNavigate } from 'react-router-dom';

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
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const handleClose = () => {
    // Close the browser tab/window or redirect to login
    // In a web app context, we'll redirect to login page
    navigate('/pages/login');
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
                  <Typography variant={downMD ? 'h4' : 'h3'} sx={{ color: 'secondary.main', fontFamily: 'Comic Sans MS' }}>
                    Congratulation, registration done.
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'secondary.main', textAlign: 'center', mt: 1 }}>
                    Please open your email and click &quot;Create Password&quot; to continue.
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
