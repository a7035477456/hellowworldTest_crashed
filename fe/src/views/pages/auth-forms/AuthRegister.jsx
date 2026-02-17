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
import { registerUser } from 'api/registerFe';

// ===========================|| JWT - REGISTER ||=========================== //

export default function AuthRegister() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!checked) {
      setError('Please agree to the terms and conditions.');
      return;
    }
    setIsSubmitting(true);

    try {
      // Call the registration API to send email
      await registerUser(email);
      
      // Navigate to registration success page after email is sent, passing email in state
      navigate('/pages/registrationEmailed', { state: { email } });
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <Stack sx={{ mb: 2, alignItems: 'center' }}>
        <Typography variant="subtitle1">Sign up with Email address </Typography>
      </Stack> */}

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
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
        label={<Typography variant="subtitle1">Agree with</Typography>}
      />

      <Typography variant="body2" sx={{ mt: 1, mb: 1.5, color: 'text.secondary' }}>
        By providing your email you agree to receive email from vsingles.club for account security, identity verification, and service updates. Consent is not a condition of purchase.{' '}
        <Typography component={Link} to="/pages/privacyPolicy" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Privacy Policy
        </Typography>
        {' and '}
        <Typography component={Link} to="/pages/termsAndConditions" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Terms &amp; Conditions
        </Typography>
      </Typography>

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1, mb: 1 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button 
            disableElevation 
            fullWidth 
            size="large" 
            type="submit" 
            variant="contained" 
            color="secondary"
            disabled={isSubmitting || !checked}
          >
            {isSubmitting ? 'Sending...' : 'Sign Up'}
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
