import { memo, useMemo } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

// project imports
import MenuList from '../MenuList';
import LogoSection from '../LogoSection';
import MiniDrawerStyled from './MiniDrawerStyled';

import useConfig from 'hooks/useConfig';
import { drawerWidth, drawerWidthMobile } from 'store/constant';
import SimpleBar from 'ui-component/third-party/SimpleBar';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

import closemenuImg from 'assets/images/closemenu.png';
import openmenuImg from 'assets/images/openmenu.png';

// ==============================|| SIDEBAR DRAWER ||============================== //

function Sidebar() {
  const theme = useTheme();
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const {
    state: { miniDrawer }
  } = useConfig();

  const menuToggle = useMemo(
    () => (
      <ButtonBase
        aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
        onClick={() => handlerDrawerOpen(!drawerOpen)}
        sx={{
          display: 'block',
          width: '100%',
          m: '2px 6px',
          p: 0,
          borderRadius: 1.5,
          overflow: 'hidden',
          ...(drawerOpen
            ? {
                transform: 'translate(-2px, -2px)',
                transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                '&:active': { transform: 'translate(-2px, -1px)' }
              }
            : {
                transform: 'none',
                mt: '6px',
                mb: '2px',
                transition: 'transform 0.12s ease',
                '&:active': { transform: 'none' }
              }),
          '&:hover': { opacity: 0.9 }
        }}
      >
        <Box
          component="img"
          src={drawerOpen ? closemenuImg : openmenuImg}
          alt={drawerOpen ? 'Close menu' : 'Open menu'}
          sx={{
            display: 'block',
            width: '100%',
            height: 'auto',
            verticalAlign: 'middle',
            ...(!drawerOpen && { objectFit: 'contain' })
          }}
        />
      </ButtonBase>
    ),
    [drawerOpen]
  );

  const logo = useMemo(
    () => (
      <Box sx={{ display: 'flex', alignItems: 'center', p: downSM ? 1 : 2, minWidth: 0 }}>
        <LogoSection variant={drawerOpen ? 'full' : 'icon'} />
      </Box>
    ),
    [downSM, drawerOpen]
  );

  const drawer = useMemo(() => {
    let drawerSX = { paddingLeft: '0px', paddingRight: '0px', marginTop: '20px' };
    if (drawerOpen) {
      drawerSX = downSM
        ? { paddingLeft: 6, paddingRight: 6, marginTop: 0 }
        : { paddingLeft: '16px', paddingRight: '16px', marginTop: '0px' };
    }

    const navPanelBg = { bgcolor: '#EDE7F6' };

    return (
      <>
        {downMD ? (
          <Box sx={{ ...drawerSX, ...navPanelBg }}>
            <MenuList />
          </Box>
        ) : (
          <SimpleBar
            sx={{
              height: 'calc(100vh - 90px)',
              ...drawerSX,
              '& .simplebar-content-wrapper': navPanelBg
            }}
          >
            <MenuList />
          </SimpleBar>
        )}
      </>
    );
  }, [downMD, drawerOpen, downSM]);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: { xs: 'auto', md: drawerWidth } }} aria-label="mailbox folders">
      {downMD || (miniDrawer && drawerOpen) ? (
        <Drawer
          variant={downMD ? 'temporary' : 'persistent'}
          anchor="left"
          open={drawerOpen}
          onClose={() => handlerDrawerOpen(!drawerOpen)}
          slotProps={{
            paper: {
              sx: {
                mt: downMD ? 0 : 11,
                zIndex: 1099,
                width: downSM ? drawerWidthMobile : drawerWidth,
                bgcolor: '#EDE7F6',
                color: 'text.primary',
                borderRight: 'none'
              }
            }
          }}
          ModalProps={{ keepMounted: true }}
          color="inherit"
        >
          {downMD && logo}
          {menuToggle}
          {drawer}
        </Drawer>
      ) : (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {logo}
          {menuToggle}
          {drawer}
        </MiniDrawerStyled>
      )}
    </Box>
  );
}

export default memo(Sidebar);
