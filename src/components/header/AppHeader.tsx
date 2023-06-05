import { IconButton, Box, AppBar, Toolbar, Grid, useTheme, Typography } from '@mui/material';
import { DarkModeOutlined, MenuOutlined } from "@mui/icons-material";
import { useContext } from 'react';
import { ThemeContext } from '../../App';
import themeGetter from '../../themes/themeGetter';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { useGetEstablishmentByIdQuery } from '../../store/apis/establishmentApi';


function AppHeader({ drawerWidth, handleDrawerToggle }: { drawerWidth: number, handleDrawerToggle: any }) { // todo поставить тип
  const setTheme = useContext(ThemeContext)
  const theme = useTheme()
  const user = useSelector((state: RootState) => state.users)
  const { data, error, isLoading, isFetching, isSuccess } = useGetEstablishmentByIdQuery()
  const toggleThemeMode = () => {
    function _(){
      if (theme.palette.mode == 'light')
        return 'd-dark'
      if (theme.palette.mode == 'dark')
        return 'd-light'
      return 'd-light'
    }
      
    setTheme(themeGetter(_()))
  }


  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >

        <Toolbar>
          
          <IconButton aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuOutlined />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
          <Typography sx={{fontWeight: 'bold'}} maxWidth={'100%'} variant='h6'>{data?.name} </Typography>
          <Grid container justifyContent="flex-end">
            <IconButton onClick={toggleThemeMode} >
              <DarkModeOutlined />
            </IconButton>
          </Grid>

        </Toolbar>
      </AppBar>

    </Box>
  )
}

export default AppHeader;
