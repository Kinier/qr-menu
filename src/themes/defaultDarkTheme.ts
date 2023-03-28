import { createTheme } from "@mui/material";
import Oxanium from './Oxanium-VariableFont_wght.ttf'
export default createTheme({
    palette: {
      mode: "dark",
      background: {
        default: '#312d4b',
        paper: '#312d4b'
      }
    },
    typography: {
      fontFamily: `${Oxanium}, "cursive"`
    }
  });

  