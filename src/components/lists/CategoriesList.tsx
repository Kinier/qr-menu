import { CircularProgress, Grid, IconButton, List, ListItem, ListItemButton, ListSubheader, Paper, Tooltip, Zoom } from "@mui/material";
import CategoryCard from "../card/Category/CategoryCard";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box } from "@mui/system";
import { useGetAllCategoriesByMenuIdQuery } from "../../store/apis/categoryApi";
import type { Category as ICategory } from "../../store/apis/categoryApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import AddCategoryDialog from "../dialogs/AddCategory/AddCategoryDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export default function CategoriesList() {
    const selectedCategory = useSelector((state: RootState)=> state.selectedCategory)
    const { menuId } = useParams();
    const { data, error, isLoading, isFetching, isSuccess } = useGetAllCategoriesByMenuIdQuery(+menuId!)
    const [visibleState, setVisibleState] = useState(false)
    const onClose = () => { //
        setVisibleState(!visibleState)
    }

    const transition = 50;
    return (
        <>
            <Paper sx={{ height: '80vh' }}>
                <List sx={{ maxHeight: '100%', overflow: "auto" }}>
                    <ListSubheader>
                        <Box display="flex" justifyContent={'space-between'} alignItems={'center'}>
                            Categories
                            <Tooltip title='Add new category' onClick={() => onClose()}><IconButton><AddCircleIcon /></IconButton></Tooltip>
                        </Box>
                    </ListSubheader>


                    {isLoading &&
                        <Grid container justifyContent="center" padding={2}>
                            <CircularProgress />
                        </Grid>
                    }

                    {isSuccess &&

                        data.map((category: ICategory, index) => {
                            return (
                                <Grid item key={category.id}>
                                    <Zoom in={true} timeout={transition} style={{ transitionDelay: `${transition + (index * 50)}ms` }} unmountOnExit>
                                        <Box>
                                            <ListItem><CategoryCard category={category} isFetching={isFetching}/></ListItem>
                                        </Box>
                                    </Zoom>


                                </Grid>
                            )
                        })
                    }




                </List>
            </Paper>
            <AddCategoryDialog open={visibleState} onClose={onClose} />
        </>
    )
}