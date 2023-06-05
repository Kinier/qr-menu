import { makeStyles, Card, CardMedia, CardContent, Typography, Box, IconButton, Tooltip } from "@mui/material";
import itemPhoto from "./item.bmp"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { Item, useDeleteItemMutation } from "../../../store/apis/itemApi";
import { useEffect, useState } from "react";
import ChangeItemDialog from "../../dialogs/ChangeItem/ChangeItemDialog";



export default function ItemCard({ item, isFetching }: { item: Item, isFetching: boolean }) {
    const [deleteItem, /* { isError, error } */] = useDeleteItemMutation()
    const [image, setImage] = useState<Blob | null>(null)
    const [visibleState, setVisibleState] = useState(false)
  const onClose = () => {

    setVisibleState(!visibleState)
  }
    useEffect(() => {
        console.log('sadfasdf')
        fetch(`${process.env.REACT_APP_API_URL}/item/${item.id}/photo`)
          .then((value) => value.blob()
            .then((value) => {
              return setImage(value)
            }
            ))
    
      }, [isFetching])
    return (
        <>
            <Card sx={{ width: "100%", display: "flex", flexDirection: "row" }}>

                <CardContent
                    sx={{ width: "50%", padding: "16px" }}
                >
                    <Typography gutterBottom variant="h5">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {item.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Price: {item.price} byn
                    </Typography>
                    <Box sx={{ display: 'flex'}}>

                        <Tooltip title="delete"><IconButton color="default" onClick={() => deleteItem({id: item.id})}><DeleteIcon></DeleteIcon></IconButton></Tooltip>
                        <Tooltip title="edit"><IconButton onClick={()=>onClose()}><EditIcon></EditIcon></IconButton></Tooltip>
                    </Box>
                </CardContent>
                <CardMedia
                component="img"
                    sx={{ height: 140, width: "50%", objectFit: "cover" }}
                    image={image?  URL.createObjectURL(image) : ''}
                    alt=" "
                />
            </Card>
            <ChangeItemDialog open={visibleState} onClose={onClose} itemId={item.id} />
        </>
    )
}