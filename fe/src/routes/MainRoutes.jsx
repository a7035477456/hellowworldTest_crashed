import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'ui-component/AuthGuard';
import AllSingles from '../views/dashboard/allSingles/AllSingles';
import VettedSingles from '../views/dashboard/vettedSingles/VettedSingles';
import InterestedSingles from '../views/dashboard/interested/InterestedSingles';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/default/defaultIndex')));
// const AllSingles = Loadable(lazy(() => import('views/dashboard/allSingles/allSinglesIndex')));
// utilities routing
const VerifySelf = Loadable(lazy(() => import('views/utilities/VerifySelf')));
const RequestsAboutMe = Loadable(lazy(() => import('views/utilities/requestsAboutMeIndex')));
const RequestsSent = Loadable(lazy(() => import('views/utilities/requestsSentIndex')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
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
          path: 'vettedSingles',
          element: <VettedSingles />
        },
        {
          path: 'allSingles',
          element: <AllSingles />
        },
        {
          path: 'interestedSingles',
          element: <InterestedSingles />
        }
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
