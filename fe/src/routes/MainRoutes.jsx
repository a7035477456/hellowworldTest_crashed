import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const VettedSingles = Loadable(lazy(() => import('views/dashboard/VettedSingles')));
const AllSingles = Loadable(lazy(() => import('views/dashboard/AllSingles')));
const NewSingles = Loadable(lazy(() => import('views/dashboard/NewSingles')));
const Friends = Loadable(lazy(() => import('views/dashboard/Friends')));
const RequestAboutMe = Loadable(lazy(() => import('views/dashboard/RequestAboutMe')));
const RequestIveSent = Loadable(lazy(() => import('views/dashboard/RequestIveSent')));

// utilities routing
const VerifySelf = Loadable(lazy(() => import('views/utilities/VerifySelf')));
const RequestsAboutMe = Loadable(lazy(() => import('views/utilities/RequestsAboutMe')));
const RequestsSent = Loadable(lazy(() => import('views/utilities/RequestsSent')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        },
        {
          path: 'vetted-singles',
          element: <VettedSingles />
        },
        {
          path: 'all-singles',
          element: <AllSingles />
        },
        {
          path: 'new-singles',
          element: <NewSingles />
        },
        {
          path: 'friends',
          element: <Friends />
        },
        {
          path: 'request-about-me',
          element: <RequestAboutMe />
        },
        {
          path: 'request-ive-sent',
          element: <RequestIveSent />
        }
      ]
    },
    {
      path: 'verifyself',
      element: <VerifySelf />
    },
    {
      path: 'requests-about-me',
      element: <RequestsAboutMe />
    },
    {
      path: 'requests-sent',
      element: <RequestsSent />
    }
  ]
};

export default MainRoutes;
