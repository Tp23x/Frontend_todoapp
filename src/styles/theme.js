import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    mode: 'light',
    // mode: 'dark',
  },
  typography: {
  "fontFamily": `'Prompt', sans-serif`,
  },
  success: {
    main: "#0fb123",
    light: "#4caf50",
    dark: "#1b5e20",
    contrastText: "#fff",
  },
});

export default Theme;