import { Box, CircularProgress, Grid, IconButton, List, ListItem, ListItemButton, ListSubheader, Paper, Tooltip, Zoom } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ItemCard from "../card/Item/ItemCard";

import { Item, useGetAllItemsByCategoryIdQuery } from "../../store/apis/itemApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AddItemDialog from "../dialogs/AddItem/AddItemDialog";

export default function ItemsList() {
    const selectedCategory = useSelector((state: RootState)=> state.selectedCategory)
    const { data, error, isLoading, isFetching, isSuccess } = useGetAllItemsByCategoryIdQuery(selectedCategory.id||-1)
    const [visibleState, setVisibleState] = useState(false)
    const onClose = () => {
        setVisibleState(!visibleState)
    }
    const transition = 50;
    return (
        <>
            <Paper sx={{ height: '80vh' }}>
                <List sx={{ maxHeight: '100%', overflow: "auto" }}>
                    <ListSubheader>
                        <Box display="flex" justifyContent={'space-between'} alignItems={'center'}>
                            Items
                            <Tooltip title='Add new item'><IconButton disabled={selectedCategory.id === null} onClick={()=>onClose()}><AddCircleIcon /></IconButton></Tooltip>
                        </Box>
                    </ListSubheader>
                    {isLoading &&
                        <Grid container justifyContent="center" padding={2}>
                            <CircularProgress />
                        </Grid>
                    }


                    {isSuccess &&

                        data.map((item: Item, index) => {
                            return (
                                <Grid item key={item.id}>
                                    <Zoom in={true} timeout={transition} style={{ transitionDelay: `${transition + (index * 50)}ms` }} unmountOnExit>
                                        <Box>
                                            <ListItem><ItemCard item={item} isFetching={isFetching} /></ListItem>
                                        </Box>
                                    </Zoom>


                                </Grid>
                            )
                        })
                    }
                </List>
            </Paper>
            <AddItemDialog open={visibleState} onClose={onClose} />
        </>
    )
}