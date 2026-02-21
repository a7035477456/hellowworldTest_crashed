import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import underConstructionImg from 'assets/images/underConstruction.jpg';

// ==============================|| UNDER CONSTRUCTION ||============================== //

export default function UnderConstruction() {
  return (
    <MainCard>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
          py: 3
        }}
      >
        <Box
          component="img"
          src={underConstructionImg}
          alt="Under construction"
          sx={{
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </Box>
    </MainCard>
  );
}
