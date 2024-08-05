// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize the primary color
    },
    secondary: {
      main: '#dc004e', // Customize the secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Customize the font family
  },
});

export default theme;
