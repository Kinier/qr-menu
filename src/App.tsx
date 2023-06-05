import { Box, CircularProgress, CssBaseline, Grid } from '@mui/material';
import { Dispatch, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DefaultContainer from './components/container/DefaultContainer';
// import Menus from './components/content/Menus';

import { Theme, ThemeProvider} from '@mui/material/styles';
import { createContext, useState } from 'react';
import themeGetter from './themes/themeGetter';
import NoMatch from './components/NoMatch';
const Menus = lazy(() => import('./content/MenusPage'));
const Menu = lazy(() => import('./content/MenuPage'));

export const ThemeContext = createContext<Dispatch<React.SetStateAction<Theme>> | any>(null); 

function App() {
  const [theme, setTheme] = useState(themeGetter('d-light'))




  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={setTheme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <Layout />
          {/* for  */}
          <Suspense fallback={<DefaultContainer Content={
              <Grid container justifyContent="center">
                <CircularProgress/>
              </Grid>
          } />}>
              
            <Routes>
              <Route path='/:establishmentId'  >
                <Route path='' element={<DefaultContainer Content={<Menus/>} />}/>
                <Route path='menu/:menuId' element={<DefaultContainer Content={<Menu/>} />}/>
              </Route>


              <Route path="*" element={<NoMatch />} />
            </Routes>

          </Suspense>
        </Box>
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

export default App;
