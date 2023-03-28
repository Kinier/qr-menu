import { Box, CircularProgress, CssBaseline, Grid } from '@mui/material';
import { Dispatch, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch';
import DefaultContainer from './components/container/DefaultContainer';
// import Menus from './components/content/Menus';

import { Theme, ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useState } from 'react';
import themeGetter from './themes/themeGetter';
import ProfilePage from './components/content/ProfilePage';
import Dashboard from './components/content/Dashboard';
import RestaurantSettings from './components/content/RestaurantSettings';
import Menus from './components/content/Menus';
import { RegisterPage } from './components/auth/RegisterPage';
import { LoginPage } from './components/auth/LoginPage';
import MenuPage from './components/content/MenuPage';
import Orders from './components/content/Orders';
import Main from './components/content/Main';
// import { AuthPage } from './components/auth/AuthPage';
export const ThemeContext = createContext<Dispatch<React.SetStateAction<Theme>> | any>(null);
// const Menus = lazy(() => import('./components/content/Menus'));

function App() {
  const [theme, setTheme] = useState(themeGetter('d-light'))




  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={setTheme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          


          
          <Routes>

            <Route path='/' element={<Layout />} >
              <Route index element={<DefaultContainer Content={<Main/>}/>}/>  
              <Route path='/menus'  >
                <Route path='' element={<DefaultContainer Content={<Menus />} />} />
                <Route path=':menuId' element={<DefaultContainer Content={<MenuPage />} />} />
                
              </Route>
              <Route path='/orders' element={<DefaultContainer Content={<Orders />} />} />
              <Route path='/profile' element={<DefaultContainer Content={<ProfilePage />} />} />
              <Route path='/dashboard' element={<DefaultContainer Content={<Dashboard />} />} />
              <Route path='/settings' element={<DefaultContainer Content={<RestaurantSettings />} />} />
            </Route>

            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>



            <Route path="*" element={<NoMatch />} />
          </Routes>
          {/* </Suspense> */}
        </Box>
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

export default App;
