import { CardHeader, CardMedia, Chip, IconButton, Card, Switch, Box, CardActionArea } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import cardImage from './bludo.jpg'
import cardImage2 from './hot_dish_closeup2-scaled.jpg'
import { Menu as IMenu } from '../../store/apis/menuApi';


import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { changeStatus } from '../../store/features/cardsSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Menu = ({ menu: menu }: { menu: IMenu }) => {
    const [image, setImage] = useState<Blob|null>(null)
    console.log(menu, "sdasdasd")
    useEffect(()=>{

        
        fetch(`${process.env.REACT_APP_API_URL}/menu/${menu.id}/photo`)
        .then((value)=>value.blob()
        .then((value)=> setImage(value)))
    }, [])
  
    const navigate = useNavigate();

    return (
        <Card sx={{ minWidth: 250, maxWidth: 250 }} onClick={() => navigate(`menu/${menu.id}`)}>
            <CardActionArea>
                <CardHeader
                    // action={
                    //     <IconButton aria-label="settings">
                    //         <MoreVertIcon />
                    //     </IconButton>
                    // }
                    title={menu.name}
                    subheader={menu.description}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={image?  URL.createObjectURL(image) : ''}
                    alt="Paella dish"
                />
                {/* <Box display="flex" justifyContent="center" alignItems="center">
                    {menuStatus
                        ? <Chip label="Available" color="success" />
                        : <Chip label="Inactive" color="warning" />}
                </Box> */}
            </CardActionArea>
        </Card>
        // <div className="card-container">
        //     <ImageShower />
        //     <div className='card-info'>
        //         <Status id={id}/>
        //     </div>
        // </div>

    )
}
