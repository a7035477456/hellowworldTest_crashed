import logoWithText from 'assets/images/vettedLogoWithText.png';
import logoIcon from 'assets/images/vettedLogo.png';

// ==============================|| LOGO SVG ||============================== //

/**
 * @param {'full' | 'icon'} [variant='full'] - 'full' = vettedLogoWithText.png (sidebar expanded), 'icon' = vettedLogo.png (sidebar collapsed)
 */
export default function Logo({ variant = 'full' }) {
  const src = variant === 'icon' ? logoIcon : logoWithText;

  return (
    <img
      src={src}
      alt="Vetted Singles"
      style={{
        maxWidth: '100%',
        maxHeight: 56,
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
        marginLeft: '4px'
      }}
    />
  );
}
