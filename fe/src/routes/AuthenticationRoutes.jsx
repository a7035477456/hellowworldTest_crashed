import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// maintenance routing
const LoginPage = Loadable(lazy(() => import('views/pages/authentication/Login')));
const RegisterPage = Loadable(lazy(() => import('views/pages/authentication/Register')));
const LoginFailurePage = Loadable(lazy(() => import('views/pages/authentication/LoginFailure')));
const RegistrationSuccessPage = Loadable(lazy(() => import('views/pages/authentication/RegistrationSuccess')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login',
      element: <LoginPage />
    },
    {
      path: '/pages/register',
      element: <RegisterPage />
    },
    {
      path: '/pages/loginFailure',
      element: <LoginFailurePage />
    },
    {
      path: '/pages/registrationSuccess',
      element: <RegistrationSuccessPage />
    }
  ]
};

export default AuthenticationRoutes;
