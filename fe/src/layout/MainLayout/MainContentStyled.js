// material-ui
import { styled } from '@mui/material/styles';

// project imports
import { drawerWidth } from 'store/constant';

// ==============================|| MAIN LAYOUT - STYLED ||============================== //

const MainContentStyled = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'borderRadius'
})(({ theme, open, borderRadius }) => ({
  backgroundColor: '#EDE7F6',
  minWidth: 0,
  width: '100%',
  maxWidth: '100%',
  minHeight: 'calc(100vh - 88px)',
  flexGrow: 1,
  flexShrink: 1,
  padding: 20,
  marginTop: 88,
  marginRight: 0,
  boxSizing: 'border-box',
  borderRadius: `${borderRadius}px`,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  ...(!open && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter + 200
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -(drawerWidth - 72),
      width: '100%',
      marginTop: 88
    }
  }),
  ...(open && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter + 200
    }),
    marginLeft: 0,
    marginTop: 88,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginTop: 88
    }
  }),
  [theme.breakpoints.down('md')]: {
    marginLeft: 20,
    padding: 16,
    marginTop: 88,
    marginRight: 0,
    width: '100%',
    ...(!open && {
      width: '100%'
    })
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: 10,
    marginRight: 0,
    width: '100%'
  }
}));

export default MainContentStyled;
