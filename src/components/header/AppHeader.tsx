import { IconButton, Box, AppBar, Toolbar, Grid, useTheme, Typography } from '@mui/material';
import { DarkModeOutlined, MenuOutlined, ShoppingBasketOutlined } from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../App';
import themeGetter from '../../themes/themeGetter';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useLocation } from 'react-router-dom';


function AppHeader({ setOpen: setOpen, open: open, bref: bref }: { setOpen: any, open: any, bref: any }) {
  const setTheme = useContext(ThemeContext)
  const theme = useTheme()
  const basket = useSelector((state: RootState) => state.basket)
  const location = useLocation();
  const establishmentId = location.pathname.split('/')[1];
  const [establishmentName, setEstablishmentName] = useState('')
  const toggleThemeMode = () => {
    function _() {
      if (theme.palette.mode == 'light')
        return 'd-dark'
      if (theme.palette.mode == 'dark')
        return 'd-light'
      return 'd-light'
    }

    setTheme(themeGetter(_()))
  }

  useEffect(() => {
    const _ = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/establishment`);
      const establishment = await response.json();
      setEstablishmentName(establishment.name)
    }

    _()
  }, [])


  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" color='default'>

        <Toolbar>
          <Typography variant='h5'>{establishmentName}</Typography>

          <Grid container justifyContent="flex-end">
            <IconButton onClick={toggleThemeMode} >
              <DarkModeOutlined />
            </IconButton>

            <IconButton aria-label="cart" onClick={() => setOpen(!open)} ref={bref}>
              <Badge badgeContent={basket.products.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Grid>

        </Toolbar>
      </AppBar>

    </Box>
  )
}

export default AppHeader;
