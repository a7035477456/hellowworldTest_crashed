import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';

import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import AuthCreatePassword from '../auth-forms/AuthCreatePassword';

// ================================|| AUTH - CREATE PASSWORD ||================================ //

export default function CreatePassword() {
  return (
    <AuthWrapper1>
      <Box sx={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
        <Stack sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
          <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 68px)' }}>
            <Box sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  <Box sx={{ mb: 3 }}>
                    <Link to="#" aria-label="logo">
                      <Logo />
                    </Link>
                  </Box>
                  <Box sx={{ width: 1 }}>
                    <AuthCreatePassword />
                  </Box>
                </Stack>
              </AuthCardWrapper>
            </Box>
          </Stack>
          <Box sx={{ px: 3, my: 3 }}>
            <AuthFooter />
          </Box>
        </Stack>
      </Box>
    </AuthWrapper1>
  );
}
