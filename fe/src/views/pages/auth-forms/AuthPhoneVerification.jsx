import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
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
      
      // On success, redirect to Page 8 (Phone Verification Success) with email
      navigate(`/pages/phoneVerificationSuccess?email=${encodeURIComponent(email)}`);
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
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Please Enter the verification code we just sent to {phone || 'your phone'} to continue.
        </Typography>
      </Stack>

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
    </form>
  );
}
