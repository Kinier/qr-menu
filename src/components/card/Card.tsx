import './../../style/card/index.css';
import { Alert, Button, CardActionArea, CardHeader, CardMedia, Chip, IconButton, Card as MCard, Menu, MenuItem, Snackbar, Switch } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CloseTwoTone } from '@mui/icons-material';
import noImage from './NoImage.png'
import { Menu as IMenu } from '../../store/apis/menuApi';


import { useChangeStatusMutation, useDeleteMenuMutation } from '../../store/apis/menuApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ChangeMenuDialog from '../dialogs/ChangeMenu/ChangeMenuDialog';

export const Card = ({ menu: menu }: { menu: IMenu }) => {
  const [changeStatus, { isLoading }] = useChangeStatusMutation();
  const [deleteMenu, /* { isError, error } */] = useDeleteMenuMutation()
  const [image, setImage] = useState<Blob|null>(null)

  useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}/menu/${menu.id}/photo`)
      .then((value)=>value.blob()
      .then((value)=> setImage(value)))
  }, [])

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleAddMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAddMenuClose = () => {
    setAnchorEl(null);
  };


  const handleDelete = () => {
    deleteMenu({ id: menu.id })
    // setOpen(true)
  }

  // const action = (
  //   <>
  //     <Button color="secondary" size="small" onClick={() => setOpen(false)}>
  //       UNDO
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={() => setOpen(false)}
  //     >
  //       <CloseTwoTone fontSize="small" />
  //     </IconButton>
  //   </>
  // );
  return (
    <>
      <MCard sx={{minWidth: 250, maxWidth: 250, minHeight: 320 }}>
        <CardHeader
          action={
            <>
              <IconButton aria-label="settings" onClick={handleAddMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAddMenuClose}
              >
                <MenuItem onClick={() => handleDelete()}>Delete</MenuItem>
                {/* <MenuItem>Menu Item 2</MenuItem>
                <MenuItem>Menu Item 3</MenuItem> */}
              </Menu>
            </>
          }
          title={menu.name}
          subheader={menu.description}
        />
        <CardActionArea onClick={() => navigate(`/menus/${menu.id}`)}>
          <CardMedia
            component="img"
            height="194"
            image={image ? URL.createObjectURL(image) : ''}
            alt={" "}
          />
        </CardActionArea>
        <Switch color="default" checked={menu.status} onClick={() => changeStatus({ id: menu.id, status: !menu.status })}></Switch>
        {menu.status
          ? <Chip label="In use" color="success" />
          : <Chip label="Archived" color="warning" />}

      </MCard>
      {/* {
        isError
          ? <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message="Success"
            action={action}
          />
          : <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message="Error"
            action={action}
          />

      } */}
    </>

  )
}

export default Card;