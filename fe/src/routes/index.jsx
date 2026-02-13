import { createBrowserRouter, Navigate } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/world/pages" replace />
    },
    MainRoutes,
    AuthenticationRoutes
  ],
  {
    basename: '/'
  }
);

export default router;
