// ==============================|| OVERRIDES - CSS BASELINE ||============================== //

export default function CssBaseline(theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: theme.typography.fontFamily
        }
      }
    }
  };
}
