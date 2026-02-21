import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AllSingles from '../views/dashboard/allSingles/AllSingles';
import VettedSingles from '../views/dashboard/vettedSingles/VettedSingles';
import InterestedSingles from '../views/dashboard/interested/InterestedSingles';
import UnderConstruction from '../views/dashboard/underConstruction/UnderConstruction';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/default/defaultIndex')));
// utilities routing
const VerifySelf = Loadable(lazy(() => import('views/utilities/VerifySelf')));
const RequestsAboutMe = Loadable(lazy(() => import('views/utilities/requestsAboutMeIndex')));
const RequestsSent = Loadable(lazy(() => import('views/utilities/requestsSentIndex')));

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
        },
        {
          path: 'request-about-me',
          element: <UnderConstruction />
        },
        {
          path: 'request-ive-sent',
          element: <UnderConstruction />
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
