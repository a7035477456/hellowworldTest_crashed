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
import Slider from '@mui/material/Slider';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
//import { useGetVettedSingles } from 'api/vettedSinglesFe';

// assets
import { IconSearch, IconChevronRight } from '@tabler/icons-react';
import UserRound from 'assets/images/users/user-round.svg';
import VettedCheck from 'assets/images/vettedCheck.jpg';
import { useGetVettedSingles } from '../../../api/vettedSinglesFe';

// ==============================|| ALL SINGLES ||============================== //

export default function VettedSingles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('22003');
  const [maxDistance, setMaxDistance] = useState(19);
  const [gender, setGender] = useState('Men');
  const [ageRange, setAgeRange] = useState([21, 35]);
  const {vettedSingles, vettedSinglesLoading, vettedSinglesError } = useGetVettedSingles();

  const filteredVettedSingles_XXXXXXX = vettedSingles;
  // const filteredVettedSingles_XXXXXXX = (vettedSingles || []).filter((person_CCCCCCCC) => {
  //   const query = searchQuery.toLowerCase();
  //   const memberId = `member ${String(person_CCCCCCCC.singles_id).padStart(5, '0')}`;
  //   return memberId.includes(query);
  // });

  const handleMessage = (vettedSingles_id) => {
    console.log('Message clicked for:', vettedSingles_id);
    // Add message functionality here
  };

  const handleMarkInterested = (vettedSingles_id) => {
    console.log('Mark Interested clicked for:', vettedSingles_id);
    // Add mark interested functionality here
  };

  return (
    <MainCard
      title="Vetted Singles x2"
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
      {/* Instructional Message */}
      <Alert 
        severity="info" 
        sx={{ 
          mb: 3,
          backgroundColor: 'secondary.light',
          color: 'secondary.dark',
          '& .MuiAlert-icon': {
            color: 'secondary.main'
          }
        }}
      >
        When you Mark Interested someone, you then can visit the "Interested" page and request vetted information to learn more about them.
      </Alert>

      {/* Singles Discovery Search Block */}
      <SubCard
        sx={{
          mb: 3,
          backgroundColor: 'secondary.light',
          border: 'none'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'secondary.main',
            mb: 3,
            fontWeight: 600
          }}
        >
          Singles Discovery
        </Typography>
        
        <Grid container spacing={3}>
          {/* Location */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  My current location
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary', mt: 0.5 }}>
                  {location}
                </Typography>
              </Box>
              <IconChevronRight stroke={1.5} size={20} />
            </Box>
          </Grid>

          {/* Maximum Distance */}
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Maximum distance
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  {maxDistance} km
                </Typography>
              </Box>
              <Slider
                value={maxDistance}
                onChange={(e, newValue) => setMaxDistance(newValue)}
                min={1}
                max={100}
                step={1}
                sx={{
                  color: 'error.main',
                  '& .MuiSlider-thumb': {
                    backgroundColor: 'common.white',
                    border: '2px solid',
                    borderColor: 'error.main'
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: 'error.main'
                  }
                }}
              />
            </Box>
          </Grid>

          {/* Show Me */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Show me
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary', mt: 0.5 }}>
                  {gender}
                </Typography>
              </Box>
              <IconChevronRight stroke={1.5} size={20} />
            </Box>
          </Grid>

          {/* Age Range */}
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Age range
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  {ageRange[0]}-{ageRange[1]}
                </Typography>
              </Box>
              <Slider
                value={ageRange}
                onChange={(e, newValue) => setAgeRange(newValue)}
                min={18}
                max={100}
                step={1}
                valueLabelDisplay="auto"
                sx={{
                  color: 'error.main',
                  '& .MuiSlider-thumb': {
                    backgroundColor: 'common.white',
                    border: '2px solid',
                    borderColor: 'error.main'
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: 'error.main'
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </SubCard>

      {vettedSinglesLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {vettedSinglesError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load singles. Please try again later.
        </Alert>
      )}
      
      {!vettedSinglesLoading && !vettedSinglesError && (
        <Grid container spacing={gridSpacing}>
          {filteredVettedSingles_XXXXXXX.map((vettedPersonIndex_DDDDDDD) => (
          <Grid key={vettedPersonIndex_DDDDDDD.singles_id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                    src={vettedPersonIndex_DDDDDDD.profile_image_url && vettedPersonIndex_DDDDDDD.profile_image_url !== 'user-round.svg' ? vettedPersonIndex_DDDDDDD.profile_image_url : UserRound}
                    alt={`Member ${String(vettedPersonIndex_DDDDDDD.vettedSingles_id).padStart(5, '0')}`}
                    sx={{
                      width: 80,
                      height: 80
                    }}
                  />
                </Box>
                {/* <Typography 
                  variant="h4" 
                  component="div"
                  sx={{ 
                    color: 'secondary.main',
                    textAlign: 'center',
                    fontWeight: 500
                  }}
                >
                  Member {String(vettedPersonIndex_DDDDDDD.singles_id).padStart(5, '0')}
                </Typography> */}
                  <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: 'secondary.main',
                          textAlign: 'center',
                          fontWeight: 500
                        }}
                      >
                        Member {String(vettedPersonIndex_DDDDDDD.singles_id).padStart(5, '0')}
                      </Typography>
                      {vettedPersonIndex_DDDDDDD?.vetted_status === true && (
                        <Box
                          component="img"
                          src={VettedCheck}
                          alt="Vetted"
                          sx={{
                            width: 24,
                            height: 24,
                            objectFit: 'contain'
                          }}
                        />
                      )}
                    </Box>

              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleMessage(vettedPersonIndex_DDDDDDD.vettedSingles_id)}
                  sx={{ mr: 1 }}
                >
                  Message
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleMarkInterested(vettedPersonIndex_DDDDDDD.vettedSingles_id)}
                >
                  Mark Interested
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
