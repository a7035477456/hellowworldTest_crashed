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
      title: 'My Vetting Info',
      type: 'item',
      url: '/verifyself',
      icon: icons.IconTypography,
      breadcrumbs: false,
      customStyle: {
        fontFamily: 'Comic Sans MS',
        color: '#744DBC',
        fontWeight: 600
      }
    },
    {
      id: 'util-requests-about-me',
      title: 'Others Request About Me',
      type: 'item',
      url: '/dashboard/request-about-me',
      icon: icons.IconTypography,
      breadcrumbs: false,
      customStyle: {
        fontFamily: 'Comic Sans MS',
        color: '#744DBC',
        fontWeight: 600
      }
    },
    {
      id: 'util-requests-sent',
      title: "Request I've Sent",
      type: 'item',
      url: '/dashboard/request-ive-sent',
      icon: icons.IconTypography,
      breadcrumbs: false,
      customStyle: {
        fontFamily: 'Comic Sans MS',
        color: '#744DBC',
        fontWeight: 600
      }
    }
  ]
};

export default utilities;
