import PropTypes from 'prop-types';

// material-ui
import Stack from '@mui/material/Stack';

// project imports
import useConfig from 'hooks/useConfig';

// Top margin from viewport (red-arrow spacing); stays this size at any zoom (scale compensates)
const TOP_MARGIN_SCREEN_PX = 24;

// ==============================|| AUTH INNER STACK - FIXED TOP MARGIN ||============================== //

export default function AuthInnerStack({ children, sx, ...other }) {
  const {
    state: { pageZoom }
  } = useConfig();
  const zoomFactor = (pageZoom ?? 100) / 100;
  const paddingTopPx = TOP_MARGIN_SCREEN_PX / zoomFactor;

  return (
    <Stack
      sx={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: 'calc(100vh - 68px)',
        paddingTop: paddingTopPx,
        ...sx
      }}
      {...other}
    >
      {children}
    </Stack>
  );
}

AuthInnerStack.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object
};
