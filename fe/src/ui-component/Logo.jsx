// material-ui
import { useTheme } from '@mui/material/styles';

// project imports

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

export default function Logo() {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={colorScheme === ThemeMode.DARK ? logoDark : logo} alt="Vetted Singles Club" width="100" />
     *
     */
    <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Red Heart Icon */}
      <path
        d="M20 12C20 8 14 6 12 10C10 6 4 8 4 12C4 16 12 24 20 30C28 24 36 16 36 12C36 8 30 6 28 10C26 6 20 8 20 12Z"
        fill="#E91E63"
      />
      {/* Black Circle with White Checkmark */}
      <circle cx="28" cy="22" r="5" fill="#000000" />
      <path
        d="M25.5 22L27 23.5L30.5 20"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Vetted Singles Text */}
      <text
        x="42"
        y="26"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill={theme.vars?.palette?.grey?.[900] || '#000000'}
      >
        Vetted Singles
      </text>
      {/* Club Text - Rotated 45 degrees */}
      <text
        x="135"
        y="12"
        fontFamily="Arial, sans-serif"
        fontSize="13"
        fontWeight="bold"
        fill={theme.vars?.palette?.grey?.[900] || '#000000'}
        transform="rotate(45 135 12)"
      >
        Club
      </text>
    </svg>
  );
}
