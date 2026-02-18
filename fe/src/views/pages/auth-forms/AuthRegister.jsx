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

const EMAIL_EXISTS_MSG = 'Account with this email already exists. Please enter another email or login with link below';

export default function AuthRegister() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setEmailError('');
    if (!checked) {
      setError('Please agree to the terms and conditions.');
      return;
    }
    const emailTrimmed = email.trim();
    if (!emailTrimmed) {
      setError('Please enter your email address.');
      return;
    }
    setIsSubmitting(true);

    try {
      await registerUser(emailTrimmed);
      navigate('/pages/registrationEmailed', { state: { email: emailTrimmed } });
    } catch (err) {
      console.error('Registration error:', err);
      const msg = err.message || 'Failed to register. Please try again.';
      if (msg.includes('already exists') || msg.includes(EMAIL_EXISTS_MSG)) {
        setEmailError(EMAIL_EXISTS_MSG);
      } else {
        setError(msg);
      }
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
          onChange={handleEmailChange}
          name="email"
          required
          error={!!emailError}
        />
      </CustomFormControl>
      {emailError && (
        <Typography variant="body2" sx={{ mt: 0.5, mb: 0, color: 'error.main' }}>
          {emailError.startsWith('Error:') ? emailError : `Error: ${emailError}`}
        </Typography>
      )}

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
            disabled={isSubmitting || !checked || !email.trim() || !!emailError}
          >
            {isSubmitting ? 'Sending...' : 'Sign Up'}
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
