import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// maintenance routing
const LoginPage = Loadable(lazy(() => import('views/pages/authentication/Login')));
const RegisterPage = Loadable(lazy(() => import('views/pages/authentication/Register')));
const LoginFailurePage = Loadable(lazy(() => import('views/pages/authentication/LoginFailure')));
const RegistrationSuccessPage = Loadable(lazy(() => import('views/pages/authentication/RegistrationSuccess')));
const CreatePasswordPage = Loadable(lazy(() => import('views/pages/authentication/CreatePassword')));
const PhoneVerificationPage = Loadable(lazy(() => import('views/pages/authentication/PhoneVerification')));
const PhoneVerificationSuccessPage = Loadable(lazy(() => import('views/pages/authentication/PhoneVerificationSuccess')));
const PhoneVerificationFailurePage = Loadable(lazy(() => import('views/pages/authentication/PhoneVerificationFailure')));
const AboutUsPage = Loadable(lazy(() => import('views/pages/authentication/AboutUs')));
const TermsAndConditionsPage = Loadable(lazy(() => import('views/pages/authentication/TermsAndConditions')));
const PrivacyPolicyPage = Loadable(lazy(() => import('views/pages/authentication/PrivacyPolicy')));
const WorldLandingPage = Loadable(lazy(() => import('views/pages/world/WorldLanding')));

// Shared auth route definitions (path -> element) for /pages and locale clones
const authRoutePaths = [
  { path: '/pages/login', element: <LoginPage /> },
  { path: '/pages/register', element: <RegisterPage /> },
  { path: '/pages/loginFailure', element: <LoginFailurePage /> },
  { path: '/pages/registrationEmailed', element: <RegistrationSuccessPage /> },
  { path: '/pages/createPassword', element: <CreatePasswordPage /> },
  { path: '/pages/phoneVerification', element: <PhoneVerificationPage /> },
  { path: '/pages/phoneVerificationSuccess', element: <PhoneVerificationSuccessPage /> },
  { path: '/pages/phoneVerificationFailure', element: <PhoneVerificationFailurePage /> },
  { path: '/pages/aboutUs', element: <AboutUsPage /> },
  { path: '/pages/termsAndConditions', element: <TermsAndConditionsPage /> },
  { path: '/pages/privacyPolicy', element: <PrivacyPolicyPage /> }
];

// Build children: /world/pages, /pages/* (reference), /french/pages/*, /usa/pages/*, /viet/pages/*
const authChildren = [
  { path: '/world/pages', element: <WorldLandingPage /> },
  { path: '/createPassword', element: <CreatePasswordPage /> },
  ...authRoutePaths
];
['/french', '/usa', '/viet'].forEach((prefix) => {
  authRoutePaths.forEach(({ path, element }) => {
    authChildren.push({ path: path.replace('/pages', `${prefix}/pages`), element });
  });
});

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: authChildren
};

export default AuthenticationRoutes;
