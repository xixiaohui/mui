import * as React from 'react';
import { Box, ThemeProvider } from '@mui/system';

function BoxGuide() {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#007FFF',
            dark: '#0066CC',
          },
        },
      }}
    >
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        
      </Box>
    </ThemeProvider>
  );
}

export default BoxGuide;
