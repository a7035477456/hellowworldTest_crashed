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
      title: 'Vetted Singles',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: 'vetted-singles-list',
          title: 'Vetted Singles',
          type: 'item',
          url: '/dashboard/vetted-singles',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default dashboard;
