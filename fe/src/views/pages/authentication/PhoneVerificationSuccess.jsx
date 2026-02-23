import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import AuthInnerStack from './AuthInnerStack';

import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ================================|| AUTH - PHONE VERIFICATION SUCCESS ||================================ //

export default function PhoneVerificationSuccess() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  const handleGoToLogin = () => {
    navigate('/pages/login', { state: { email } });
  };

  return (
    <AuthWrapper1>
      <Stack sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <AuthInnerStack>
          <Box sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <AuthCardWrapper>
              <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Link to="#" aria-label="logo">
                    <Logo />
                  </Link>
                </Box>
                <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Typography variant={downMD ? 'h4' : 'h3'} sx={{ color: 'secondary.main', textAlign: 'center' }}>
                    Congratulation, Registration email {email || '[your email]'} and Phone verification completed. You can login now.
                  </Typography>
                </Stack>
                <Box sx={{ width: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <AnimateButton>
                    <Button
                      color="secondary"
                      fullWidth
                      size="large"
                      variant="contained"
                      onClick={handleGoToLogin}
                    >
                      Go to Login
                    </Button>
                  </AnimateButton>
                </Box>
              </Stack>
            </AuthCardWrapper>
          </Box>
        </AuthInnerStack>
        <Box sx={{ px: 3, my: 3 }}>
          <AuthFooter />
        </Box>
      </Stack>
    </AuthWrapper1>
  );
}
