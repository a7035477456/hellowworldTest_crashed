// ==============================|| OVERRIDES - SLIDER ||============================== //

export default function Slider(theme) {
  return {
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#7B1FA1',
          '&.Mui-disabled': {
            color: theme.vars.palette.grey[300]
          }
        },
        thumb: {
          backgroundColor: '#7B1FA1'
        },
        track: {
          backgroundColor: '#7B1FA1'
        },
        rail: {
          backgroundColor: '#CE93D8'
        },
        mark: {
          backgroundColor: theme.vars.palette.background.paper,
          width: '4px'
        },
        valueLabel: {
          backgroundColor: '#7B1FA1'
        }
      }
    }
  };
}
