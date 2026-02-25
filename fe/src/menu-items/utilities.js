// assets
import { IconTypography } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Vetting',
  type: 'group',
  children: [
    {
      id: 'util-vetself',
      title: 'Vetting Profile',
      type: 'item',
      url: '/verifyself',
      icon: icons.IconTypography,
      breadcrumbs: false,
      customStyle: {
        fontFamily: "'Comic Neue', 'Comic Sans MS', cursive",
        color: '#744DBC',
        fontWeight: 600
      }
    },
    {
      id: 'util-requests-about-me',
      title: 'Vetting Req In',     
      type: 'item',
      url: '/dashboard/request-about-me',
      icon: icons.IconTypography,
      breadcrumbs: false,
      customStyle: {
        fontFamily: "'Comic Neue', 'Comic Sans MS', cursive",
        color: '#744DBC',
        fontWeight: 600
      }
    },
    {
      id: 'util-requests-sent',
      title: 'Vetting Req Out',         
      type: 'item',
      url: '/dashboard/request-ive-sent',
      icon: icons.IconTypography,
      breadcrumbs: false,
      customStyle: {
        fontFamily: "'Comic Neue', 'Comic Sans MS', cursive",
        color: '#744DBC',
        fontWeight: 600
      }
    }
  ]
};

export default utilities;
