import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import AuthInnerStack from './AuthInnerStack';

import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import AuthRegister from '../auth-forms/AuthRegister';

const REGISTER_CACHE_BUST_KEY = 'registerCacheBusted';

export default function Register() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const location = useLocation();

  // One-time cache-busting reload when opening email registration so browser uses fresh code
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasBusted = sessionStorage.getItem(REGISTER_CACHE_BUST_KEY);
    const hasBustParam = new URLSearchParams(location.search).has('_cb');
    if (!hasBusted && !hasBustParam) {
      sessionStorage.setItem(REGISTER_CACHE_BUST_KEY, '1');
      window.location.replace(`${location.pathname}?_cb=${Date.now()}`);
      return;
    }
  }, [location.pathname, location.search]);

  return (
    <AuthWrapper1>
      <Stack sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <AuthInnerStack>
          <Box sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <AuthCardWrapper>
              <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Box sx={{ mb: 3 }}>
                  <Link to="#" aria-label="theme logo">
                    <Logo />
                  </Link>
                </Box>
                <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Typography gutterBottom variant={downMD ? 'h3' : 'h2'} sx={{ color: 'secondary.main', mb: 0 }}>
                    Sign up
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '16px', textAlign: { xs: 'center', md: 'inherit' } }}>
                    Please enter your email address to continue
                  </Typography>
                </Stack>
                <Box>
                  <AuthRegister />
                </Box>
                <Divider sx={{ width: 1 }} />
                <Stack sx={{ alignItems: 'center' }}>
                  <Typography component={Link} to="/pages/login" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                    Already have an account?
                  </Typography>
                </Stack>
              </Stack>
            </AuthCardWrapper>
          </Box>
        </AuthInnerStack>
        <Stack sx={{ px: 3, mb: 3, mt: 1 }}>
          <AuthFooter />
        </Stack>
      </Stack>
    </AuthWrapper1>
  );
}
