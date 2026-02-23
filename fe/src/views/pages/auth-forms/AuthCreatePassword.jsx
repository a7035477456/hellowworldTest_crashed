import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import { createPassword } from 'api/createPasswordFe';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircle from '@mui/icons-material/CheckCircle';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';

// ===========================|| CREATE PASSWORD ||=========================== //

export default function AuthCreatePassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(() => searchParams.get('email') || '');
  const [registrationCode, setRegistrationCode] = useState('');
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCodeChange = (e) => {
    const v = e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 6).toUpperCase();
    setRegistrationCode(v);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  // First password: 4 requirements (only first password; confirm only must match)
  const pwRequirement_8Chars = password.length >= 8;
  const pwRequirement_smallLetter = /[a-z]/.test(password);
  const pwRequirement_capitalLetter = /[A-Z]/.test(password);
  const pwRequirement_numberOrSymbol = /[0-9]/.test(password) || /[^a-zA-Z0-9]/.test(password);
  const passwordMeetsAllRequirements =
    pwRequirement_8Chars &&
    pwRequirement_smallLetter &&
    pwRequirement_capitalLetter &&
    pwRequirement_numberOrSymbol;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const emailTrimmed = email.trim();
    const codeTrimmed = registrationCode.trim();

    if (!emailTrimmed) {
      setError('Email is required.');
      return;
    }
    if (codeTrimmed.length !== 6) {
      setError('Please enter the 6-character code from your registration email.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    
    if (!passwordMeetsAllRequirements) {
      setError('Please meet all 4 password requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (!checked) {
      setError('Please agree to the terms and conditions.');
      return;
    }

    if (!phone) {
      setError('Phone number is required.');
      return;
    }
    
    // Validate phone format (should be (XXX) XXX-XXXX)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    
    setIsSubmitting(true);
 
    try {
      await createPassword(codeTrimmed, emailTrimmed, password, phone);

      navigate(`/pages/phoneVerification?email=${encodeURIComponent(emailTrimmed)}&phone=${encodeURIComponent(phone)}`);
    } catch (err) {
      console.error('Create password error:', err);
      setError(err.message || 'Failed to create password. Please try again.');
      setIsSubmitting(false);
    }
  };

  const sectionHeaderSx = {
    bgcolor: '#7e57c2',
    color: 'white',
    px: 2,
    py: 1.5,
    borderRadius: 1,
    mb: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };

  const isPhoneError =
    !!error &&
    (error.includes('Phone number') ||
      error.includes('phone number') ||
      error.includes('10-digit') ||
      /already associated|different number|sign in/i.test(error));

  const isCodeError =
    !!error &&
    (error.includes('code is invalid') ||
      error.includes('invalid, expired, or already used') ||
      error.includes('6-character') ||
      error.includes('request a new registration email') ||
      error.includes('Email does not match'));

  return (
    <form onSubmit={handleSubmit}>
      {error && !isPhoneError && !isCodeError && (
        <Typography variant="subtitle1" sx={{ color: 'error.main', fontWeight: 700, textAlign: 'center', mb: 2 }}>
          Error: {error}
        </Typography>
      )}

      <Box sx={sectionHeaderSx}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, fontSize: '1.875rem' }}>
          Verify email code
        </Typography>
        <Typography variant="body2" sx={{ color: '#f3e5f5', mt: 0.5 }}>
          Enter the 6-character code we just email to you
        </Typography>
      </Box>
      {isCodeError && (
        <Typography variant="subtitle1" sx={{ color: 'error.main', fontWeight: 700, textAlign: 'center', mb: 1.5 }}>
          Error: {error}
        </Typography>
      )}
      <CustomFormControl fullWidth sx={{ mb: 2 }} error={isCodeError}>
        <InputLabel htmlFor="outlined-adornment-code" sx={{ color: '#683AB7', '&.Mui-focused': { color: '#683AB7' }, '&.MuiInputLabel-shrink': { color: '#683AB7' } }}>
          Registration Code
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-code"
          type="text"
          value={registrationCode}
          onChange={handleCodeChange}
          name="registrationCode"
          placeholder="e.g. AB12CD"
          inputProps={{ maxLength: 6, style: { textTransform: 'uppercase', letterSpacing: 2 } }}
          required
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7', borderWidth: 2 }
          }}
        />
      </CustomFormControl>

      <Box sx={{ ...sectionHeaderSx, mt: 3 }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, fontSize: '1.875rem' }}>
          Create password
        </Typography>
        <Typography variant="body2" sx={{ color: '#f3e5f5', mt: 0.5 }}>
          Please create your password, and enter your personal phone number to continue
        </Typography>
      </Box>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-email-create" sx={{ color: '#683AB7', '&.Mui-focused': { color: '#683AB7' }, '&.MuiInputLabel-shrink': { color: '#683AB7' } }}>
          Email Address
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-create"
          type="email"
          value={email}
          name="email"
          placeholder="you@example.com"
          disabled
          inputProps={{ readOnly: true }}
          required
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7', borderWidth: 2 }
          }}
        />
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password-create" sx={{ color: '#683AB7', '&.Mui-focused': { color: '#683AB7' }, '&.MuiInputLabel-shrink': { color: '#683AB7' } }}>
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-create"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7', borderWidth: 2 }
          }}
        />
        <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
          Password strength: {Math.round(([pwRequirement_8Chars, pwRequirement_smallLetter, pwRequirement_capitalLetter, pwRequirement_numberOrSymbol].filter(Boolean).length / 4) * 100)}%
        </Typography>
        <Box sx={{ p: 1.5, mt: 1 }}>
          <Stack component="ul" sx={{ listStyle: 'none', pl: 0, m: 0, gap: 0.5 }}>
            <Stack component="li" direction="row" alignItems="center" gap={1}>
              {pwRequirement_8Chars ? <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} /> : <RadioButtonUnchecked sx={{ color: 'text.secondary', fontSize: 20 }} />}
              <Typography variant="body2" sx={{ color: pwRequirement_8Chars ? 'success.main' : undefined }}>At least 8 characters</Typography>
            </Stack>
            <Stack component="li" direction="row" alignItems="center" gap={1}>
              {pwRequirement_smallLetter ? <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} /> : <RadioButtonUnchecked sx={{ color: 'text.secondary', fontSize: 20 }} />}
              <Typography variant="body2" sx={{ color: pwRequirement_smallLetter ? 'success.main' : undefined }}>At least one small letter</Typography>
            </Stack>
            <Stack component="li" direction="row" alignItems="center" gap={1}>
              {pwRequirement_capitalLetter ? <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} /> : <RadioButtonUnchecked sx={{ color: 'text.secondary', fontSize: 20 }} />}
              <Typography variant="body2" sx={{ color: pwRequirement_capitalLetter ? 'success.main' : undefined }}>At least one capital letter</Typography>
            </Stack>
            <Stack component="li" direction="row" alignItems="center" gap={1}>
              {pwRequirement_numberOrSymbol ? <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} /> : <RadioButtonUnchecked sx={{ color: 'text.secondary', fontSize: 20 }} />}
              <Typography variant="body2" sx={{ color: pwRequirement_numberOrSymbol ? 'success.main' : undefined }}>At least one number or symbol</Typography>
            </Stack>
          </Stack>
        </Box>
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password-confirm" sx={{ color: '#683AB7', '&.Mui-focused': { color: '#683AB7' }, '&.MuiInputLabel-shrink': { color: '#683AB7' } }}>
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-confirm"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          name="confirmPassword"
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7', borderWidth: 2 }
          }}
        />
        {confirmPassword && (
          <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 0.5 }}>
            {password === confirmPassword ? (
              <>
                <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: 'success.main' }}>Passwords match</Typography>
              </>
            ) : null}
          </Stack>
        )}
      </CustomFormControl>

      {isPhoneError && (
        <Typography variant="subtitle1" sx={{ color: 'error.main', fontWeight: 700, textAlign: 'center', mb: 1.5 }}>
          Error: {error}
        </Typography>
      )}
      <CustomFormControl fullWidth error={isPhoneError}>
        <InputLabel htmlFor="outlined-adornment-phone" sx={{ color: '#683AB7', '&.Mui-focused': { color: '#683AB7' }, '&.MuiInputLabel-shrink': { color: '#683AB7' } }}>
          Phone Number
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-phone"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          name="phone"
          placeholder="(100) 000-0000"
          required
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#683AB7', borderWidth: 2 }
          }}
        />
      </CustomFormControl>
      <Typography variant="body2" sx={{ mt: 1, mb: 0, color: '#683AB7' }}>
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
        I agree to receive automated text messages from Vetted Singles for account security, identity verification, and service updates at the phone number provided. Consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. Reply HELP for help or STOP to cancel.{' '}
          <Typography component="a" href="/pages/privacyPolicy" target="_blank" rel="noopener noreferrer" variant="body2" sx={{ color: '#683AB7', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Privacy Policy
          </Typography>
          {' and '}
          <Typography component="a" href="/pages/termsAndConditions" target="_blank" rel="noopener noreferrer" variant="body2" sx={{ color: '#683AB7', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Terms &amp; Conditions
          </Typography>
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button 
            disableElevation 
            fullWidth 
            size="large" 
            type="submit" 
            variant="contained" 
            color="secondary"
            disabled={isSubmitting || !email.trim() || registrationCode.trim().length !== 6 || !checked || !passwordMeetsAllRequirements}
          >
            {isSubmitting ? 'Sending...' : 'Verify and Create Password'}
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
