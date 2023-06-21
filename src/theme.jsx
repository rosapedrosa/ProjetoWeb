import { createTheme } from '@mui/material/styles';
import { styled, Paper } from '@mui/material';


export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF5A5F',
    },
    secondary: {
      main: '#f50057',
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
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
  },
}
);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: 400,
}))