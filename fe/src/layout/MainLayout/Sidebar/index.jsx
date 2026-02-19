import { memo, useMemo } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

// project imports
import MenuList from '../MenuList';
import LogoSection from '../LogoSection';
import MiniDrawerStyled from './MiniDrawerStyled';

import useConfig from 'hooks/useConfig';
import { drawerWidth, drawerWidthMobile } from 'store/constant';
import SimpleBar from 'ui-component/third-party/SimpleBar';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import { IconMenu2 } from '@tabler/icons-react';

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
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          width: '100%',
          justifyContent: drawerOpen ? 'flex-start' : 'center',
          px: drawerOpen ? 2 : 1,
          py: 1.25,
          borderRadius: 1.5,
          color: theme.vars.palette.secondary.dark,
          bgcolor: theme.vars.palette.background.paper,
          border: '1px solid',
          borderColor: theme.vars.palette.divider,
          boxShadow: '0 2px 0 0 rgba(0,0,0,0.08), 0 3px 4px 0 rgba(0,0,0,0.06)',
          transition: 'transform 0.12s ease, box-shadow 0.12s ease',
          '&:hover': {
            bgcolor: theme.vars.palette.action.hover
          },
          '&:active': {
            transform: 'translateY(2px)',
            boxShadow: '0 0 0 0 rgba(0,0,0,0.08), 0 1px 2px 0 rgba(0,0,0,0.06)'
          }
        }}
      >
        <IconMenu2 stroke={1.5} size={20} />
        {drawerOpen && (
          <Typography variant="body2" component="span">
            Close menu
          </Typography>
        )}
      </ButtonBase>
    ),
    [drawerOpen, theme]
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
    let drawerSX = { paddingLeft: '0px', paddingRight: '0px', marginTop: '20px' };
    if (drawerOpen) {
      drawerSX = downSM
        ? { paddingLeft: 6, paddingRight: 6, marginTop: 0 }
        : { paddingLeft: '16px', paddingRight: '16px', marginTop: '0px' };
    }

    return (
      <>
        {downMD ? (
          <Box sx={drawerSX}>
            <MenuList />
          </Box>
        ) : (
          <SimpleBar sx={{ height: 'calc(100vh - 90px)', ...drawerSX }}>
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
                bgcolor: 'background.default',
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
