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
      id: 'allSingles',
      title: 'All Singles',
      type: 'item',
      url: '/dashboard/allSingles',
      icon: icons.IconUsers,
      breadcrumbs: false,
      customStyle: {
        fontFamily: 'Comic Sans MS',
        color: '#744DBC',
        fontWeight: 600
      }
    },
    {
      id: 'vettedSingles',
      title: 'Vetted Singles',
      type: 'item',
      url: '/dashboard/vettedSingles',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'interestedSingles',
      title: 'Interested Singles',
      type: 'item',
      url: '/dashboard/interestedSingles',
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
