import { createTheme } from '@mui/material/styles';



export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF5A5F',
    },
    secondary: {
      main: '#ffeb3b',
    },
  },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#FF7B7F',
        color: '#fff',
      },
    },
  },
}
);

