import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

// ================================|| WORLD LANDING - SELECT COUNTRY ||================================ //

const flagLinkSx = {
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: 4
  }
};

function UsaFlag() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 120,
        height: 80,
        borderRadius: 1,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 1
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
        {[...Array(7)].map((_, i) => (
          <Box key={i} sx={{ height: '14.28%', bgcolor: i % 2 === 0 ? '#B22234' : '#fff' }} />
        ))}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40%',
          height: '54%',
          bgcolor: '#3C3B6E',
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          p: 0.2
        }}
      >
        {[...Array(50)].map((_, i) => (
          <Box key={i} sx={{ width: '8%', height: '16%', color: '#fff', fontSize: 6, textAlign: 'center' }}>★</Box>
        ))}
      </Box>
    </Box>
  );
}

function FrenchFlag() {
  return (
    <Box
      sx={{
        width: 120,
        height: 80,
        borderRadius: 1,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 1,
        display: 'flex'
      }}
    >
      <Box sx={{ width: '33.33%', bgcolor: '#002395' }} />
      <Box sx={{ width: '33.33%', bgcolor: '#fff' }} />
      <Box sx={{ width: '33.33%', bgcolor: '#ED2939' }} />
    </Box>
  );
}

function VietFlag() {
  return (
    <Box
      sx={{
        width: 120,
        height: 80,
        borderRadius: 1,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 1,
        bgcolor: '#DA251D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography sx={{ fontSize: 42, color: '#FFD700', lineHeight: 1 }}>★</Typography>
    </Box>
  );
}

export default function WorldLanding() {
  return (
    <Stack
      sx={{
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
        py: 4,
        px: 2
      }}
    >
      <Typography variant="h4" sx={{ mb: 1, color: 'text.primary' }}>
        Vetted Singles
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Select your region
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3,
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          border: '2px solid',
          borderColor: 'divider',
          borderRadius: 2
        }}
      >
        <Stack component={Link} to="/usa/pages/login" alignItems="center" spacing={1} sx={flagLinkSx}>
          <UsaFlag />
          <Typography variant="subtitle1" fontWeight="600" color="primary">
            USA
          </Typography>
        </Stack>
        <Stack component={Link} to="/french/pages/login" alignItems="center" spacing={1} sx={flagLinkSx}>
          <FrenchFlag />
          <Typography variant="subtitle1" fontWeight="600" color="primary">
            French
          </Typography>
        </Stack>
        <Stack component={Link} to="/viet/pages/login" alignItems="center" spacing={1} sx={flagLinkSx}>
          <VietFlag />
          <Typography variant="subtitle1" fontWeight="600" color="primary">
            Viet
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}
