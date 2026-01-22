// assets
import { IconKey, IconTypography } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconTypography
};

// ==============================|| AUTHENTICATION MENU ITEMS ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    // {
    //   id: 'authentication',
    //   title: 'Authentication',
    //   type: 'collapse',
    //   icon: icons.IconKey,
    //   children: [
    //     {
    //       id: 'login',
    //       title: 'Login',
    //       type: 'item',
    //       url: '/pages/login',
    //       target: true
    //     },
    //     {
    //       id: 'register',
    //       title: 'Register',
    //       type: 'item',
    //       url: '/pages/register',
    //       target: true
    //     }
    //   ]
    // },
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
      title: 'Requests About Me',
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

export default pages;
