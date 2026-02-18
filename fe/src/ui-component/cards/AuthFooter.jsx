// material-ui
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const linkSx = { fontSize: '0.875rem', color: '#673AB7', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } };

export default function AuthFooter({ hideVettedSinglesText = false }) {
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
    <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center' }}>
      <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center" flexWrap="wrap" useFlexGap>
        <Typography component="a" href="/pages/aboutUs" target="_blank" rel="noopener noreferrer" variant="subtitle2" sx={linkSx}>
          About us
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: '0.875rem', color: '#673AB7' }}>|</Typography>
        <Typography component="a" href="/pages/termsAndConditions" target="_blank" rel="noopener noreferrer" variant="subtitle2" sx={linkSx}>
          Terms &amp; Conditions
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: '0.875rem', color: '#673AB7' }}>|</Typography>
        <Typography component="a" href="/pages/privacyPolicy" target="_blank" rel="noopener noreferrer" variant="subtitle2" sx={linkSx}>
          Privacy Policy
        </Typography>
      </Stack>
      <Divider sx={{ width: '100%', maxWidth: 180 }} />
      {!hideVettedSinglesText && (
        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
          Vetted Singles
        </Typography>
      )}
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6875rem' }}>
        © 2000-2026 vsingles.club, Inc. - Made with ❤️ in Los Angeles
      </Typography>
      {internalIp && (
        <Box sx={{ alignSelf: 'flex-start', mt: 0.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem' }}>
            {internalIp}
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
