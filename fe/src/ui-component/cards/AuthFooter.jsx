// material-ui
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

export default function AuthFooter() {
  const [internalIp, setInternalIp] = useState('');

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    if (!origin) return;
    fetch(`${origin}/api/serverInfo`)
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        if (data?.internalIp) setInternalIp(data.internalIp);
      })
      .catch(() => {});
  }, []);

  return (
    <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" flexWrap="wrap" useFlexGap>
        <Typography component={RouterLink} to="/pages/aboutUs" variant="subtitle2" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          About us
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">|</Typography>
        <Typography component={RouterLink} to="/pages/termsAndConditions" variant="subtitle2" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Terms &amp; Conditions
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">|</Typography>
        <Typography component={RouterLink} to="/pages/privacyPolicy" variant="subtitle2" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Privacy Policy
        </Typography>
      </Stack>
      <Divider sx={{ width: '100%', maxWidth: 360 }} />
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Vetted Singles
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        © 2000-2026 eharmony, Inc. - Made with ❤️ in Los Angeles
      </Typography>
      {internalIp && (
        <Box sx={{ alignSelf: 'flex-start', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {internalIp}
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
