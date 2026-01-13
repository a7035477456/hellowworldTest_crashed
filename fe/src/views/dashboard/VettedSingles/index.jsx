import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useGetSingles } from 'api/singles';

// assets
import { IconSearch, IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';
import UserRound from 'assets/images/users/user-round.svg';

// ==============================|| VETTED SINGLES ||============================== //

export default function VettedSingles() {
  const [searchQuery, setSearchQuery] = useState('');
  const { singles, singlesLoading, singlesError } = useGetSingles();

  const filteredSingles = (singles || []).filter((person) => {
    const query = searchQuery.toLowerCase();
    return (
      person.name?.toLowerCase().includes(query) ||
      person.title?.toLowerCase().includes(query) ||
      person.email?.toLowerCase().includes(query) ||
      person.location?.toLowerCase().includes(query)
    );
  });

  const handleMessage = (id) => {
    console.log('Message clicked for:', id);
    // Add message functionality here
  };

  const handleBlock = (id) => {
    console.log('Block clicked for:', id);
    // Add block functionality here
  };

  return (
    <MainCard
      title={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h3">Vetted Singles Index Cards</Typography>
          <Chip label="New" color="error" size="small" sx={{ height: 20 }} />
        </Box>
      }
      secondary={
        <OutlinedInput
          id="input-search-cards"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="16px" />
            </InputAdornment>
          }
          sx={{ width: { xs: '100%', sm: 250 } }}
        />
      }
    >
      {singlesLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {singlesError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load singles. Please try again later.
        </Alert>
      )}
      
      {!singlesLoading && !singlesError && (
        <Grid container spacing={gridSpacing}>
          {filteredSingles.map((person) => (
          <Grid key={person.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <Avatar
                      src={person.avatar && person.avatar !== 'user-round.svg' ? person.avatar : UserRound}
                      alt={person.name}
                      sx={{
                        width: 80,
                        height: 80
                      }}
                    />
                  </Box>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="div">
                      {person.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {person.title}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', minHeight: 40 }}>
                    {person.description}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Stack spacing={1.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconMail stroke={1.5} size="16px" color="inherit" style={{ opacity: 0.7 }} />
                        <Typography variant="body2" color="text.secondary">
                          {person.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconPhone stroke={1.5} size="16px" color="inherit" style={{ opacity: 0.7 }} />
                        <Typography variant="body2" color="text.secondary">
                          {person.phone}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconMapPin stroke={1.5} size="16px" color="inherit" style={{ opacity: 0.7 }} />
                        <Typography variant="body2" color="text.secondary">
                          {person.location}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleMessage(person.id)}
                  sx={{ mr: 1 }}
                >
                  Message
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={() => handleBlock(person.id)}
                >
                  Block
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        </Grid>
      )}
    </MainCard>
  );
}

