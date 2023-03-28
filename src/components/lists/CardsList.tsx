// import Card from '../card/Card';
import { Box, CircularProgress, Grid, Zoom } from '@mui/material';
import { useGetAllMenusQuery } from '../../store/apis/menuApi';
import Card from '../card/Card';
import type { Menu as IMenu } from '../../store/apis/menuApi';


export const CardsList = () => {
    const { data, error, isLoading, isFetching, isSuccess } = useGetAllMenusQuery()
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
                    return (
                        <Grid item key={menu.id}>
                            <Zoom in={true} timeout={transition} style={{ transitionDelay: `${transition + (index * 50)}ms` }} unmountOnExit>
                                <Box>
                                    <Card menu={menu} />
                                </Box>
                            </Zoom>


                        </Grid>
                    )
                })
            }



        </>
    )
}

export default CardsList;