// assets
import { IconKey } from '@tabler/icons-react';
import checkMenuImg from 'assets/images/checkMenu.png';

// constant
const icons = {
  IconKey
};

// ==============================|| AUTHENTICATION MENU ITEMS ||============================== //

const pages = {
  id: 'authentication',
  title: 'Vetting',
  type: 'group',
  children: [
    // {
    //   id: 'authentication',
    //   title: 'Vetting',
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
      iconSrc: checkMenuImg,
      breadcrumbs: false,
      customStyle: {
        fontFamily: "'Comic Neue', cursive",
        color: '#744DBC',
        fontWeight: 600
      }
    },
    {
      id: 'util-requests-about-me',
      title: 'Others Request About Me',
      type: 'item',
      url: '/dashboard/request-about-me',
      iconSrc: checkMenuImg,
      breadcrumbs: false,
      customStyle: {
        fontFamily: "'Comic Neue', cursive",
        color: '#744DBC',
        fontWeight: 600
      }
    },
    {
      id: 'util-requests-sent',
      title: "Request I've Sent",
      type: 'item',
      url: '/dashboard/request-ive-sent',
      iconSrc: checkMenuImg,
      breadcrumbs: false,
      customStyle: {
        fontFamily: "'Comic Neue', cursive",
        color: '#744DBC',
        fontWeight: 600
      }
    }
  ]
};

export default pages;
