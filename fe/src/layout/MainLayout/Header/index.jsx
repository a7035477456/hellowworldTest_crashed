// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// assets
import { IconMenu2 } from '@tabler/icons-react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

export default function Header() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const iconSize = downSM ? '40px' : '20px';
  const avatarSx = downSM
    ? { width: 68, height: 68, minWidth: 68, fontSize: '1.2rem' }
    : { ...theme.typography.mediumAvatar };

  return (
    <>
      {/* logo (menu toggle moved to top of sidebar, below branding; show header toggle only on mobile to open drawer) */}
      <Box sx={{ width: downMD ? 'auto' : 228, display: 'flex' }}>
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        {downMD && (
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...avatarSx,
              overflow: 'hidden',
              transition: 'all .2s ease-in-out',
              color: theme.vars.palette.secondary.dark,
              background: theme.vars.palette.secondary.light,
              '&:hover': {
                color: theme.vars.palette.secondary.light,
                background: theme.vars.palette.secondary.dark
              }
            }}
            onClick={() => handlerDrawerOpen(!drawerOpen)}
          >
            <IconMenu2 stroke={1.5} size={iconSize} />
          </Avatar>
        )}
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification */}
      <NotificationSection />

      {/* profile */}
      <ProfileSection />
    </>
  );
}
