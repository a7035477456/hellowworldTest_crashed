import { memo, useMemo } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// project imports
import MenuList from '../MenuList';
import LogoSection from '../LogoSection';
import MiniDrawerStyled from './MiniDrawerStyled';

import useConfig from 'hooks/useConfig';
import { drawerWidth, drawerWidthClosed, drawerWidthMobile } from 'store/constant';
import SimpleBar from 'ui-component/third-party/SimpleBar';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

import { IconChevronsLeft, IconMenu2 } from '@tabler/icons-react';

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
    () =>
      drawerOpen ? (
        <Box sx={{ px: '6px', pt: '6px' }}>
          <Button
            variant="contained"
            fullWidth
            aria-label="Close menu"
            onClick={() => handlerDrawerOpen(false)}
            startIcon={<IconChevronsLeft size={20} />}
            sx={{
              bgcolor: '#744DBC',
              color: '#fff',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              py: 1.2,
              boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
              '&:hover': { bgcolor: '#6A3FB5', boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)' }
            }}
          >
            Close Menu
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5, pb: 0.5 }}>
          <IconButton
            aria-label="Open menu"
            onClick={() => handlerDrawerOpen(true)}
            sx={{
              bgcolor: '#6739B8',
              color: '#fff',
              borderRadius: '12px',
              width: 42,
              height: 42,
              boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
              '&:hover': { bgcolor: '#5A2FA8', boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)' }
            }}
          >
            <IconMenu2 size={22} />
          </IconButton>
        </Box>
      ),
    [drawerOpen]
  );

  const logo = useMemo(
    () => (
      <Box sx={{ display: 'flex', p: downSM ? 1 : 2 }}>
        <LogoSection />
      </Box>
    ),
    [downSM]
  );

  const drawer = useMemo(() => {
    let drawerSX = { paddingLeft: '4px', paddingRight: '4px', marginTop: '8px' };
    if (drawerOpen) {
      drawerSX = downSM
        ? { paddingLeft: 6, paddingRight: 6, marginTop: 0 }
        : { paddingLeft: '10px', paddingRight: '10px', marginTop: '0px' };
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
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: { xs: 'auto', md: drawerOpen ? drawerWidth : drawerWidthClosed }, transition: 'width 0.3s ease' }} aria-label="mailbox folders">
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
