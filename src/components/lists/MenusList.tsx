// import Card from '../card/Card';
import { Box, CircularProgress, Grid, Zoom } from '@mui/material';
import { useGetAllMenusQuery } from '../../store/apis/menuApi';
import {Menu as Card} from '../card/Menu';
import type { Menu as IMenu } from '../../store/apis/menuApi';
import { useEffect, useState } from 'react';


export const MenusList = () => {
    const { data, error, isLoading, isFetching, isSuccess, isError } = useGetAllMenusQuery()
    const [menus, setMenus] = useState(null);
    
    let transition = 50

    return (
        <>
            {isLoading &&
                <Grid container justifyContent="center" padding={2}>
                    <CircularProgress />
                </Grid>
            }


            {isSuccess &&

                data.map((menu: IMenu, index) => {
                    if (menu.status)
                    return (
                        <Grid item key={menu.id}>
                            <Zoom in={true} timeout={transition} style={{ transitionDelay: `${transition + (index * 50)}ms` }} unmountOnExit>
                                <Box>
                                    <Card menu={menu} />
                                </Box>
                            </Zoom>


                        </Grid>
                    )
                    else return (<></>)
                })
            }



        </>
    )
}

export default MenusList;