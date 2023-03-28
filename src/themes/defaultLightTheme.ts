import { createTheme } from "@mui/material";
import Oxanium from './Oxanium-VariableFont_wght.ttf'
export default createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#003b46',
    },
    secondary: {
      main: '#9155fd',
    },
    success: {
      main: '#07575b'
    },
    warning: {
      main: '#997840',
      contrastText: '#FFF'
    },
    background: {
      default: '#abd8e0',
      paper: '#cce4e8'
    }
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: `${Oxanium}, "cursive"`
  },
  spacing: 8,
  components: {
    MuiToolbar: {
      styleOverrides:{
        regular:{
          color: '#66a5ad'
        }
      }
    },
    MuiDrawer: {
      styleOverrides:{
        paper:{
          backgroundColor: '#dae9ed'
        }
      }
    }
  }
});

