import { createBrowserRouter, Navigate } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

// AuthenticationRoutes before MainRoutes so /pages/login-bypass/:token is matched
// (no login dialog – auto sign-in as a8@b.com when token is valid)
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/pages/login" replace />
    },
    AuthenticationRoutes,
    MainRoutes
  ],
  {
    basename: '/'
  }
);

export default router;
