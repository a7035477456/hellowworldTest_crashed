import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';

// ===========================|| JWT - REGISTER ||=========================== //

export default function AuthRegister() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState('jones@doe.com');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Navigate to registration success page
    navigate('/pages/registrationSuccess');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ mb: 2, alignItems: 'center' }}>
        <Typography variant="subtitle1">Sign up with Email address </Typography>
      </Stack>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
        <OutlinedInput 
          id="outlined-adornment-email-register" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
        />
      </CustomFormControl>

      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
        label={
          <Typography variant="subtitle1">
            Agree with &nbsp;
            <Typography variant="subtitle1" component={Link} to="#">
              Terms & Condition.
            </Typography>
          </Typography>
        }
      />

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
            Sign up
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
