import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Same origin in browser (vsingles.club or localhost:40000); fallback for build
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:40000');

// ===============================|| JWT - LOGIN ||=============================== //

export default function AuthLogin() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Debug logging
    console.log("=== INPUT DATA =================================================");
    console.log('Frontend - Submitting login:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Password length:', password.length);
    console.log('Password charCodes:', password.split('').map(c => c.charCodeAt(0)));

    const url = `${API_BASE_URL}/api/verifyPassword`;
    console.log('[AuthLogin] fetch URL:', url);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("=== RESPONSE METADATA =================================================");
      console.log('response.ok:', response.ok);
      console.log('response.status:', response.status);
      console.log('response.statusText:', response.statusText);
      console.log('response.type:', response.type);
      console.log('response.url:', response.url);
      console.log('response.headers:', Object.fromEntries(response.headers.entries()));

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.log('[AuthLogin] response body (non-JSON):', text?.slice(0, 500));
        data = {};
      }

      console.log("=== RESPONSE BODY (data) =================================================");
      console.log('data:', data);
      console.log('data.success:', data.success);
      console.log('data.error:', data.error);
      console.log('data.user:', data.user);
      console.log('data.passwordHash:', data.passwordHash);

      console.log("=== WHY response.ok IS FALSE =================================================");
      console.log('response.ok is false when response.status is not 2xx (e.g. 500 = Internal Server Error)');
      console.log('Current response.status:', response.status, response.status === 500 ? '→ Backend threw an exception; check server logs.' : '');

      if (response.ok && data.success) {
        console.log('[AuthLogin] success branch → redirecting to dashboard');
        navigate('/dashboard/allSingles');
      } else {
        console.log("=== ELSE ERROR (login failed or non-2xx) =================================================");
        console.log('Email:', email);
        console.log('Plain-text Password:', password);
        console.log('Bcrypt of Password:', data.passwordHash || 'N/A');
        console.log('Backend error message (data.error):', data.error || '(none)');
        navigate('/pages/loginFailure');
      }
    } catch (error) {
      console.error("=== FETCH EXCEPTION =================================================");
      console.error('Login error:', error);
      console.error('error.name:', error?.name);
      console.error('error.message:', error?.message);
      console.error('error.cause:', error?.cause);
      navigate('/pages/loginFailure');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-login"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
        />
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
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
        />
      </CustomFormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label="Keep me logged in"
          />
        </Grid>
        <Grid>
          <Typography variant="subtitle1" component={Link} to="#!" sx={{ textDecoration: 'none', color: 'secondary.main' }}>
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button 
            color="secondary" 
            fullWidth 
            size="large" 
            type="submit" 
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
