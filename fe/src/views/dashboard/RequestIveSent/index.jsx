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
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useGetSingles } from 'api/singles';

// assets
import { IconSearch } from '@tabler/icons-react';
import UserRound from 'assets/images/users/user-round.svg';

// ==============================|| REQUEST I'VE SENT ||============================== //

export default function RequestIveSent() {
  const [searchQuery, setSearchQuery] = useState('');
  const { singles, singlesLoading, singlesError } = useGetSingles();

  const filteredSingles = (singles || []).filter((person) => {
    const query = searchQuery.toLowerCase();
    const memberId = `member ${String(person.id).padStart(5, '0')}`;
    return memberId.includes(query);
  });

  const handleMessage = (id) => {
    console.log('Message clicked for:', id);
    // Add message functionality here
  };

  const handleSaveAsFriend = (id) => {
    console.log('Save as Friend clicked for:', id);
    // Add save as friend functionality here
  };

  return (
    <MainCard
      title="Request I've Sent"
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
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Avatar
                    src={person.avatar && person.avatar !== 'user-round.svg' ? person.avatar : UserRound}
                    alt={`Member ${String(person.id).padStart(5, '0')}`}
                    sx={{
                      width: 80,
                      height: 80
                    }}
                  />
                </Box>
                <Typography 
                  variant="h4" 
                  component="div"
                  sx={{ 
                    color: 'secondary.main',
                    textAlign: 'center',
                    fontWeight: 500
                  }}
                >
                  Member {String(person.id).padStart(5, '0')}
                </Typography>
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
                  variant="contained"
                  color="primary"
                  onClick={() => handleSaveAsFriend(person.id)}
                >
                  Save as Friend
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
