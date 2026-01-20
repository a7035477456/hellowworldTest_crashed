import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const AllSingles = Loadable(lazy(() => import('views/dashboard/allSingles/index')));
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
        // {
        //   path: 'default',
        //   element: <DashboardDefault />
        // },
        // {
        //   path: 'vetted-singles',
        //   element: <VettedSingles />
        // },
        {
          path: 'all-singles',
          element: <AllSingles />
        },
        // {
        //   path: 'new-singles',
        //   element: <NewSingles />
        // },
        // {
        //   path: 'favorites',
        //   element: <Favorites />
        // },
        // {
        //   path: 'request-about-me',
        //   element: <RequestAboutMe />
        // },
        // {
        //   path: 'request-ive-sent',
        //   element: <RequestIveSent />
        // }
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
