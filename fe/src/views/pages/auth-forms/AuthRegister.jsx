import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
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
      navigate(`/pages/createPassword?email=${encodeURIComponent(emailTrimmed)}`);
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
        <Typography variant="body2" sx={{ mt: 0.5, mb: 0, fontWeight: 500, color: '#d32f2f' }}>
          {emailError.startsWith('Error:') ? emailError : `Error: ${emailError}`}
        </Typography>
      )}
      <Typography variant="body2" sx={{ mt: 1, mb: 0, color: '#1976d2' }}>
        For your security, we limit one account per person per phone number and email. You can update your email address anytime in your account settings.
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2, mb: 1.5 }}>
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          name="checked"
          color="primary"
          sx={{ p: 0, mr: 1, mt: 0.25 }}
        />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Agree: by providing your email you agree to receive email from vsingles.club for account security, identity verification, and service updates. Consent is not a condition of purchase.{' '}
          <Typography component="a" href="/pages/privacyPolicy" target="_blank" rel="noopener noreferrer" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Privacy Policy
          </Typography>
          {' and '}
          <Typography component="a" href="/pages/termsAndConditions" target="_blank" rel="noopener noreferrer" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Terms &amp; Conditions
          </Typography>
        </Typography>
      </Box>

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
