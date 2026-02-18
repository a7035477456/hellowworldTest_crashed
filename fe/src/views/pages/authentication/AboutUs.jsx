import { Link, useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// ================================|| ABOUT US - OUR VISION & HEART ||================================ //

export default function AboutUs() {
  const navigate = useNavigate();
  return (
    <AuthWrapper1>
      <Stack sx={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 68px)', py: { xs: 1, sm: 1.5 } }}>
          <Box sx={{ m: { xs: 0.5, sm: 1 }, mb: 0, maxWidth: 720 }}>
            <AuthCardWrapper tight>
              <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'left' }}>
                <Box>
                  <Link to="/pages/login" aria-label="logo">
                    <Logo />
                  </Link>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, alignSelf: 'flex-start' }}>
                  Our Vision &amp; Heart
                </Typography>
                <Typography variant="body1" paragraph>
                  At <strong>vsingles.club</strong>, we believe that real love is the most meaningful journey you will ever embark on. As a trailblazing community dedicated to the art of connection, our mission is to help single adults find not just a partner, but their perfect match. By focusing on shared core values and the key dimensions of personality that predict long-term success, we champion deeper connections and more authentic dates.
                </Typography>
                <Typography variant="body1" paragraph>
                  We are committed to providing a best-in-class experience that evolves alongside technology to ensure a trusted, inclusive, and customer-first environment. Unlike traditional platforms, we have pioneered a unique vetting infrastructure specifically for the dating world—a level of rigorous verification that does not exist on other dating websites. Whether you are seeking a kindred spirit or a life-long partner, we provide a welcoming space for our diverse and dynamic community to flourish.
                </Typography>
                <Box sx={{ width: '100%', borderTop: 1, borderColor: 'divider', pt: 2, mt: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Why Choose vsingles.club?
                  </Typography>
                  <Typography variant="body1" paragraph>
                    We understand that opening your heart requires a foundation of trust. That is why we go beyond the standard profile; <strong>vsingles.club</strong> provides a dedicated vetting service for every member. This process is comprehensive, unique, offering a layer of security and authenticity that you simply won&apos;t find on other dating websites. By prioritizing your peace of mind through our thoughtful screening process, we ensure a safer, more intentional environment where you can focus on what truly matters: finding the right love.
                  </Typography>
                  <Stack component="ul" sx={{ pl: 2.5, m: 0 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                      <strong>Authentic Connections:</strong> Built on decades of insight into compatible relationships.
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                      <strong>Global Community:</strong> Bringing people together across borders and languages.
                    </Typography>
                    <Typography component="li" variant="body1">
                      <strong>Safety First:</strong> A refined vetting process designed to protect your heart and your experience.
                    </Typography>
                  </Stack>
                </Box>
                <Button onClick={() => navigate(-1)} variant="contained" color="secondary" sx={{ alignSelf: 'center', mt: 2 }}>
                  Close
                </Button>
              </Stack>
            </AuthCardWrapper>
          </Box>
        </Stack>
        <Box sx={{ px: 2, my: 1.5 }}>
          <AuthFooter />
        </Box>
      </Stack>
    </AuthWrapper1>
  );
}
