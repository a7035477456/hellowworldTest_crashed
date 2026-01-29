import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

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
import { verifyPhone } from 'api/verifyPhoneFe';

// ===========================|| PHONE VERIFICATION ||=========================== //

export default function AuthPhoneVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [checked, setChecked] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Get email and phone from URL params
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';

  useEffect(() => {
    if (!email || !phone) {
      setError('Email and phone number are required.');
    }
  }, [email, phone]);

  const handleCodeChange = (e) => {
    // Only allow digits and limit to 6 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    // Validation
    if (!email || !phone) {
      setError('Email and phone number are required.');
      return;
    }
    
    if (!verificationCode) {
      setError('Verification code is required.');
      return;
    }
    
    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Call the verifyPhone API
      await verifyPhone(email, phone, verificationCode);
      
      // On success, redirect to Page 8 (Phone Verification Success)
      navigate('/pages/phoneVerificationSuccess');
    } catch (err) {
      console.error('Phone verification error:', err);
      setError(err.message || 'Verification failed. Please try again.');
      setIsSubmitting(false);
      
      // If verification fails, redirect to Page 9 (Phone Verification Failure)
      navigate('/pages/phoneVerificationFailure');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ mb: 2, alignItems: 'center' }}>
        <Typography variant="subtitle1">Sign up V4</Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          Enter your details to continue.
        </Typography>
      </Stack>

      {phone && (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {phone}
          </Typography>
        </Box>
      )}

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-verification-code">Verification Code</InputLabel>
        <OutlinedInput 
          id="outlined-adornment-verification-code" 
          type="text"
          value={verificationCode}
          onChange={handleCodeChange}
          name="verificationCode"
          placeholder="Enter the code sent to your phone"
          required
          inputProps={{
            maxLength: 6,
            pattern: '[0-9]*',
            inputMode: 'numeric'
          }}
        />
      </CustomFormControl>

      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
        label={
          <Typography variant="subtitle1">
            Agree with &nbsp;
            <Typography variant="subtitle1" component="span" sx={{ color: 'primary.main' }}>
              Terms & Condition.
            </Typography>
          </Typography>
        }
      />

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
            disabled={isSubmitting || !email || !phone}
          >
            {isSubmitting ? 'Verifying...' : 'Verify Phone'}
          </Button>
        </AnimateButton>
      </Box>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography component={Link} to="/pages/login" variant="subtitle1" sx={{ textDecoration: 'none' }}>
          Already have an account?
        </Typography>
      </Box>
    </form>
  );
}
