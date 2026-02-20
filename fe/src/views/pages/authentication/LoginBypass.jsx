import { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import AuthWrapper1 from './AuthWrapper1';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:40000');

/** Alternate API origins to try if the first fails (e.g. user on vsingles.club but API on www) */
function getBypassApiOrigins() {
  if (typeof window === 'undefined') return [API_BASE_URL];
  const origin = window.location.origin;
  const o = origin.replace(/^https?:\/\//, '');
  if (o.startsWith('www.')) {
    const bare = origin.replace(/www\./, '');
    return [origin, bare];
  }
  const withWww = origin.replace(/(https?:\/\/)(.+)/, '$1www.$2');
  return [origin, withWww];
}

const BYPASS_MAGIC_TOKEN = '647396';

/** Minimal user for client-side fallback when API is unreachable */
const FALLBACK_USER = { singles_id: 0, profile_image_url: null };

/**
 * No login/password dialog. Visiting /pages/login-bypass/647396 (or ?token=647396)
 * logs in as a8@b.com. Tries API first; if token is 647396 and API fails, still logs in with fallback user.
 */
export default function LoginBypass() {
  const { token: tokenParam } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tokenFromQuery = searchParams.get('token') || '';
  const tokenTrimmed = ((tokenParam || tokenFromQuery || '').trim());

  function completeLogin(user) {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (_) {}
    navigate('/dashboard/allSingles', { replace: true });
  }

  useEffect(() => {
    if (!tokenTrimmed) {
      navigate('/pages/login', { replace: true });
      return;
    }

    const path = `/api/loginBypass/${encodeURIComponent(tokenTrimmed)}`;
    const originsToTry = import.meta.env.VITE_API_BASE_URL ? [API_BASE_URL] : getBypassApiOrigins();
    const useClientFallback = tokenTrimmed === BYPASS_MAGIC_TOKEN;

    function tryOrigin(index) {
      const base = originsToTry[index];
      const url = `${base}${path}`;
      fetch(url, { method: 'GET', credentials: 'include' })
        .then((res) => {
          if (res.ok) return res.json();
          const ct = res.headers.get('content-type') || '';
          return (ct.includes('application/json') ? res.json() : res.text())
            .then((body) => Promise.reject(new Error(typeof body === 'object' && body?.error ? body.error : `HTTP ${res.status}`)));
        })
        .then((data) => {
          if (data.success && data.user) {
            completeLogin(data.user);
          } else {
            if (useClientFallback) completeLogin(FALLBACK_USER);
            else navigate('/pages/login', { replace: true });
          }
        })
        .catch((err) => {
          const msg = err?.message || String(err);
          console.warn('[LoginBypass] failed for', url, msg);
          if (index + 1 < originsToTry.length) {
            tryOrigin(index + 1);
          } else if (useClientFallback) {
            completeLogin(FALLBACK_USER);
          } else {
            navigate('/pages/login', { replace: true });
          }
        });
    }

    tryOrigin(0);
  }, [tokenTrimmed, navigate]);

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
