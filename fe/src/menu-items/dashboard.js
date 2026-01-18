// assets
import { IconDashboard, IconUsers } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Singles',
  type: 'group',
  children: [
    {
      id: 'vetted-singles',
      title: 'Singles',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: 'vetted-singles-list',
          title: 'Vetted Singles',
          type: 'item',
          url: '/dashboard/vetted-singles',
          breadcrumbs: false
        },
        {
          id: 'all-singles',
          title: 'All Singles',
          type: 'item',
          url: '/dashboard/all-singles',
          breadcrumbs: false,
          customStyle: {
            fontFamily: 'Comic Sans MS',
            color: '#744DBC',
            fontWeight: 600
          }
        },
        {
          id: 'new-singles',
          title: 'New Singles',
          type: 'item',
          url: '/dashboard/new-singles',
          breadcrumbs: false,
          customStyle: {
            fontFamily: 'Comic Sans MS',
            color: '#744DBC',
            fontWeight: 600
          }
        }
      ]
    },
    {
      id: 'friends',
      title: 'Friends',
      type: 'item',
      url: '/dashboard/friends',
      icon: icons.IconUsers,
      breadcrumbs: false,
      customStyle: {
        fontFamily: 'Comic Sans MS',
        color: '#744DBC',
        fontWeight: 600
      }
    }
  ]
};

export default dashboard;
