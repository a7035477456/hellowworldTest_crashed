import PropTypes from 'prop-types';
import { Activity, useEffect, useRef, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import useConfig from 'hooks/useConfig';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function NavItem({ item, level, isParents = false, setSelectedID }) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));
  const ref = useRef(null);

  const { pathname } = useLocation();
  const {
    state: { borderRadius }
  } = useConfig();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const isSelected = !!matchPath({ path: item?.link ? item.link : item.url, end: false }, pathname);

  const [hoverStatus, setHover] = useState(false);

  const compareSize = () => {
    const compare = ref.current && ref.current.scrollWidth > ref.current.clientWidth;
    setHover(compare);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener('resize', compareSize);
    window.removeEventListener('resize', compareSize);
  }, []);

  const iconSize = drawerOpen ? 20 : 24;
  const Icon = item?.icon;
  const itemIcon = item?.iconSrc ? (
    <Box
      component="img"
      src={item.iconSrc}
      alt=""
      sx={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
    />
  ) : item?.icon ? (
    <Icon stroke={1.5} size={drawerOpen ? '20px' : '24px'} style={{ ...(isParents && { fontSize: 20, stroke: '1.5' }) }} />
  ) : (
    <FiberManualRecordIcon sx={{ width: isSelected ? 8 : 6, height: isSelected ? 8 : 6 }} fontSize={level > 0 ? 'inherit' : 'medium'} />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  const itemHandler = () => {
    if (isParents && setSelectedID) {
      setSelectedID();
    }
  };

  return (
    <>
      <ListItemButton
        component={Link}
        to={item.url}
        target={itemTarget}
        disabled={item.disabled}
        disableRipple={!drawerOpen}
        sx={{
          zIndex: 1201,
          borderRadius: `${borderRadius}px`,
          mb: 0.5,
          ...(drawerOpen && level !== 1 && { ml: downSM ? `${level * 8}px` : `${level * 18}px` }),
          ...(!drawerOpen && { pl: 1.25 }),
          ...(downSM && drawerOpen && { py: 0.25, minHeight: 'auto' }),
          ...(level !== 1 && {
            py: 1,
            '&:hover': { bgcolor: 'transparent' },
            '&.Mui-selected': {
              '&:hover': { bgcolor: 'transparent' },
              bgcolor: 'transparent'
            }
          }),
          ...(level === 1 && {
            bgcolor: '#EDE7F6',
            border: '1px solid #D1C4E9',
            boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
            transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              bgcolor: '#D4C4F0',
              boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
            },
            ...(!drawerOpen && {
              justifyContent: 'center',
              px: 1,
              py: 0.75
            }),
            ...(isSelected && {
              border: '2px solid #744DBC',
              bgcolor: '#FFFFFF',
              color: '#744DBC',
              boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
              '&:hover': {
                bgcolor: '#F5F5F5',
                border: '2px solid #744DBC',
                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
              },
              '&.Mui-selected': {
                bgcolor: '#FFFFFF',
                '&:hover': { bgcolor: '#F5F5F5' }
              },
              '& .MuiListItemIcon-root': { color: '#744DBC' }
            })
          })
        }}
        selected={isSelected}
        onClick={() => itemHandler()}
      >
        <ButtonBase aria-label="theme-icon" sx={{ borderRadius: `${borderRadius}px` }} disableRipple={drawerOpen}>
          <ListItemIcon
            sx={{
              minWidth: downSM && drawerOpen ? (level === 1 ? 28 : 14) : level === 1 ? 36 : 18,
              color: isSelected ? '#744DBC' : 'text.primary',
              ...(!drawerOpen &&
                level === 1 && {
                  borderRadius: `${borderRadius}px`,
                  width: 46,
                  height: 46,
                  alignItems: 'center',
                  justifyContent: 'center'
                })
            }}
          >
            {itemIcon}
          </ListItemIcon>
        </ButtonBase>

        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <Tooltip title={item.title} disableHoverListener={!hoverStatus}>
            <ListItemText
              primary={
                <Typography
                  ref={ref}
                  noWrap
                  variant={isSelected ? 'h5' : 'body1'}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                    color: 'inherit',
                    ...(item.customStyle && item.customStyle),
                    ...(isSelected && { color: '#744DBC', fontWeight: item.customStyle?.fontWeight ?? 500 })
                  }}
                >
                  {item.title}
                </Typography>
              }
              secondary={
                item.caption && (
                  <Typography
                    variant="caption"
                    gutterBottom
                    sx={{
                      display: 'block',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      color: 'text.secondary',
                      textTransform: 'capitalize',
                      lineHeight: 1.66
                    }}
                  >
                    {item.caption}
                  </Typography>
                )
              }
            />
          </Tooltip>
        )}

        <Activity mode={drawerOpen && item.chip ? 'visible' : 'hidden'}>
          <Chip
            color={item.chip?.color}
            variant={item.chip?.variant}
            size={item.chip?.size}
            label={item.chip?.label}
            avatar={
              <Activity mode={item.chip?.avatar ? 'visible' : 'hidden'}>
                <Avatar>{item.chip?.avatar}</Avatar>
              </Activity>
            }
          />
        </Activity>
      </ListItemButton>
    </>
  );
}

NavItem.propTypes = { item: PropTypes.any, level: PropTypes.number, isParents: PropTypes.bool, setSelectedID: PropTypes.func };
