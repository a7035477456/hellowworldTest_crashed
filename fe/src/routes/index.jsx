import { createBrowserRouter, Navigate } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

// AuthenticationRoutes before MainRoutes so /pages/login-bypass/647396 is matched (hidden backdoor)
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
