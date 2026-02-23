import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

/**
 * @param {'full' | 'icon'} [variant='full'] - 'full' = logo with text (sidebar expanded), 'icon' = icon only (sidebar collapsed)
 */
export default function LogoSection({ variant = 'full' }) {
  return (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="theme-logo" sx={{ display: 'block', minWidth: 0 }}>
      <Logo variant={variant} />
    </Link>
  );
}
