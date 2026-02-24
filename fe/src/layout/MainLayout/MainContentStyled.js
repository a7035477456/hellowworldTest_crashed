// material-ui
import { styled } from '@mui/material/styles';

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
  marginLeft: 0,
  marginRight: 0,
  boxSizing: 'border-box',
  borderRadius: `${borderRadius}px`,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: open ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter + 200
  }),
  [theme.breakpoints.down('md')]: {
    marginLeft: 20,
    padding: 16,
    marginRight: 0
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: 10,
    marginRight: 0
  }
}));

export default MainContentStyled;
