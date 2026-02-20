import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import AuthWrapper1 from './AuthWrapper1';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:40000');

/**
 * No login/password dialog. Visiting /pages/login-bypass/:token calls the API;
 * on success stores user (a8@b.com) and redirects to dashboard.
 */
export default function LoginBypass() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenTrimmed = (token || '').trim();
    if (!tokenTrimmed) {
      navigate('/pages/login', { replace: true });
      return;
    }

    const url = `${API_BASE_URL}/api/loginBypass/${encodeURIComponent(tokenTrimmed)}`;
    fetch(url, { method: 'GET', credentials: 'include' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Invalid token'))))
      .then((data) => {
        if (data.success && data.user) {
          try {
            localStorage.setItem('user', JSON.stringify(data.user));
          } catch (_) {}
          navigate('/dashboard/allSingles', { replace: true });
        } else {
          navigate('/pages/login', { replace: true });
        }
      })
      .catch(() => {
        navigate('/pages/login', { replace: true });
      });
  }, [token, navigate]);

  return (
    <AuthWrapper1>
      <Stack sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 68px)' }}>
          <Box sx={{ m: { xs: 1, sm: 3 }, mb: 0, textAlign: 'center' }}>
            <Logo />
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={40} />
              <Typography variant="body1" color="text.secondary">
                Logging you in…
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Box sx={{ px: 3, my: 3 }}>
          <AuthFooter />
        </Box>
      </Stack>
    </AuthWrapper1>
  );
}
