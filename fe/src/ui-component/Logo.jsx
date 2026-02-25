// material-ui
import { useTheme, useColorScheme } from '@mui/material/styles';



import logo from 'assets/images/vettedSingleLogoText.png';
import logoDark from 'assets/images/vettedSingleLogoText.png'; // optional

// ==============================|| LOGO SVG ||============================== //

export default function Logo() {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  return (
  <img
  src={colorScheme === 'dark' ? logoDark : logo}
  alt="Vetted Singles"
  width={120}
  />
  );
}
