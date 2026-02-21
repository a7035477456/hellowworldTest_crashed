import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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

// assets
import { IconSearch, IconChevronRight, IconAdjustmentsHorizontal } from '@tabler/icons-react';
import UserRound from 'assets/images/users/profile.jpeg';

//import { useGetAllSingles } from 'api/allSinglesFe';
import { useGetAllSingles } from '../../../api/allSinglesFe';

// ==============================|| ALL SINGLES ||============================== //

export default function AllSingles() {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('22003');
  const [maxDistance, setMaxDistance] = useState(19);
  const [gender, setGender] = useState('Men');
  const [ageRange, setAgeRange] = useState([21, 35]);
  const { singles, singlesLoading, singlesError } = useGetAllSingles();

  const filteredAllSingles_XXXXXXX = (singles || []).filter((person_CCCCCCCC) => {
    const query = searchQuery.toLowerCase();
    const memberId = `member ${String(person_CCCCCCCC.singles_id).padStart(5, '0')}`;
    return memberId.includes(query);
  });

  const handleMessage = (singles_id) => {
    console.log('Message clicked for:', singles_id);
    // Add message functionality here
  };

  const handleMarkInterested = (singles_id) => {
    console.log('Mark Interested clicked for:', singles_id);
    // Add mark interested functionality here
  };

  return (
    <MainCard
      title={
        <Typography
          sx={{
            fontSize: downSM ? '1.125rem' : '1.5rem',
            color: '#754DBC'
          }}
        >
          All Singles
        </Typography>
      }
    >
      {/* Instructional Message */}
      <Alert
        severity="info"
        sx={{
          mb: downSM ? 2 : 3,
          py: downSM ? 0.75 : 1.5,
          px: downSM ? 1.25 : 2,
          fontSize: downSM ? '0.8125rem' : 'inherit',
          backgroundColor: 'secondary.light',
          color: 'secondary.dark',
          '& .MuiAlert-icon': {
            color: 'secondary.main'
          }
        }}
      >
        When you Mark Interested someone, you then can visit the "Interested" page and request vetted information to learn more about them.
      </Alert>

      {/* Search bar */}
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
        endAdornment={
          <InputAdornment position="end">
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                color: theme.vars.palette.secondary.dark,
                background: theme.vars.palette.secondary.light,
                '&:hover': {
                  color: theme.vars.palette.secondary.light,
                  background: theme.vars.palette.secondary.dark
                }
              }}
            >
              <IconAdjustmentsHorizontal stroke={1.5} size="20px" />
            </Avatar>
          </InputAdornment>
        }
        aria-describedby="search-helper-text"
        slotProps={{ input: { 'aria-label': 'Search singles', sx: { bgcolor: 'transparent', pl: 0.5 } } }}
        sx={{ width: '100%', mb: downSM ? 2 : 3, px: 2 }}
      />

      {/* Singles Discovery Search Block */}
      <SubCard
        sx={{
          mb: downSM ? 2 : 3,
          p: downSM ? 1.5 : 2,
          backgroundColor: 'secondary.light',
          border: 'none'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'secondary.main',
            mb: downSM ? 1.5 : 3,
            fontWeight: 600,
            fontSize: downSM ? '1rem' : undefined
          }}
        >
          Singles Discovery
        </Typography>

        <Grid container spacing={downSM ? 2 : 3}>
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
                <Typography variant="body2" color="text.secondary" sx={downSM ? { fontSize: '0.75rem' } : undefined}>
                  My current location
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary', mt: 0.5, ...(downSM && { fontSize: '0.875rem' }) }}>
                  {location}
                </Typography>
              </Box>
              <IconChevronRight stroke={1.5} size={downSM ? 16 : 20} />
            </Box>
          </Grid>

          {/* Maximum Distance */}
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={downSM ? { fontSize: '0.75rem' } : undefined}>
                  Maximum distance
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, ...(downSM && { fontSize: '0.75rem' }) }}>
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
                <Typography variant="body2" color="text.secondary" sx={downSM ? { fontSize: '0.75rem' } : undefined}>
                  Show me
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary', mt: 0.5, ...(downSM && { fontSize: '0.875rem' }) }}>
                  {gender}
                </Typography>
              </Box>
              <IconChevronRight stroke={1.5} size={downSM ? 16 : 20} />
            </Box>
          </Grid>

          {/* Age Range */}
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={downSM ? { fontSize: '0.75rem' } : undefined}>
                  Age range
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, ...(downSM && { fontSize: '0.75rem' }) }}>
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
        <Grid container spacing={downSM ? 1.5 : gridSpacing}>
          {filteredAllSingles_XXXXXXX.map((personIndex_DDDDDDD) => (
            <Grid key={personIndex_DDDDDDD.singles_id} size={{ xs: 6, sm: 6, md: 4 }}>
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
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: downSM ? 1.5 : 2,
                    px: downSM ? 1.5 : 2
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: downSM ? 1 : 2 }}>
                    <Avatar
                      src={personIndex_DDDDDDD.profile_image_url && personIndex_DDDDDDD.profile_image_url !== 'profile.jpeg' ? personIndex_DDDDDDD.profile_image_url : UserRound}
                      alt={`Member ${String(personIndex_DDDDDDD.singles_id).padStart(5, '0')}`}
                      sx={{
                        width: downSM ? 56 : 80,
                        height: downSM ? 56 : 80
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      color: 'secondary.main',
                      textAlign: 'center',
                      fontWeight: 500,
                      ...(downSM && { fontSize: '1rem' })
                    }}
                  >
                    Member {String(personIndex_DDDDDDD.singles_id).padStart(5, '0')}
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: downSM ? 1 : 2, pt: 0, ...(downSM && { justifyContent: 'center', gap: 0.5 }) }}>
                  <Button
                    fullWidth={!downSM}
                    variant="contained"
                    color="primary"
                    size={downSM ? 'small' : 'medium'}
                    onClick={() => handleMessage(personIndex_DDDDDDD.singles_id)}
                    sx={{
                      ...(downSM && { minWidth: 0, px: 1.25, fontSize: '0.75rem', mr: 0.5 }),
                      ...(!downSM && { mr: 1 })
                    }}
                  >
                    Message
                  </Button>
                  <Button
                    fullWidth={!downSM}
                    variant="contained"
                    color="primary"
                    size={downSM ? 'small' : 'medium'}
                    onClick={() => handleMarkInterested(personIndex_DDDDDDD.singles_id)}
                    sx={downSM ? { minWidth: 0, px: 1, fontSize: '0.7rem' } : undefined}
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
