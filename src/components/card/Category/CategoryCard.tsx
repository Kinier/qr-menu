import { Card, Box, CardContent, Typography, IconButton, CardMedia, CardActionArea, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import categoryImage from './category.bmp';
import { useDeleteCategoryMutation, useGetAllCategoriesByMenuIdQuery } from "../../../store/apis/categoryApi";
import type { Category as ICategory } from "../../../store/apis/categoryApi";
import { useState, useEffect } from "react";
import ChangeCategoryDialog from "../../dialogs/ChangeCategory/ChangeCategoryDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setCategoryId } from "../../../store/features/selectedCategorySlice";
export default function CategoryCard({
   category, 
   isFetching, 
  
  }: 
  { category: ICategory, 
    isFetching: boolean, 
  
  }) {
    const dispatch = useDispatch()
    const selectedCategory = useSelector((state: RootState)=> state.selectedCategory)

  const [image, setImage] = useState<Blob | null>(null)
  const [deleteCategory, /* { isError, error } */] = useDeleteCategoryMutation()
  const [visibleState, setVisibleState] = useState(false)
  const onClose = () => {

    setVisibleState(!visibleState)
  }

  useEffect(() => {
    console.log('sadfasdf')
    fetch(`${process.env.REACT_APP_API_URL}/category/${category.id}/photo`)
      .then((value) => value.blob()
        .then((value) => {
          return setImage(value)
        }
        ))

  }, [isFetching])

  return (
    <>
      <Card sx={{ display: 'flex', width: '100%', minWidth: '100%', minHeight: 128, maxHeight: 128 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <CardActionArea sx={{
          backgroundColor: selectedCategory.id === category.id
          ? 'rgba(0, 0, 0, 0.04)'
          : 'transparent',
        '&:hover': {
          backgroundColor: selectedCategory.id === category.id
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(0, 0, 0, 0.04)'},
        }} onClick={()=>dispatch(setCategoryId({id: category.id}))}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {category.name}
              </Typography>
              {/* <Typography variant="subtitle1" color="text.secondary" component="div">
                Mac Miller
              </Typography> */}
            </CardContent>
          </CardActionArea>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

            <Tooltip title="delete"><IconButton color="default" onClick={() => deleteCategory({ id: category.id })}><DeleteIcon></DeleteIcon></IconButton></Tooltip>
            <Tooltip title="edit"><IconButton onClick={() => onClose()}><EditIcon></EditIcon></IconButton></Tooltip>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={image?  URL.createObjectURL(image) : ''}
          alt=" "
        />
      </Card>
      <ChangeCategoryDialog open={visibleState} onClose={onClose} categoryId={category.id} />
    </>
  )
}