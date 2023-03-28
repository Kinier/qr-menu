import { Box, Button, Grid, Paper } from "@mui/material";
import CategoriesList from "../lists/CategoriesList";
import ItemsList from "../lists/ItemsList";
import { useSearchParams } from "react-router-dom";
import { useUploadFileMutation } from "../../store/apis/menuApi";
import { useState } from "react";
import { Formik, Form } from "formik";
import ChangeMenuDialog from "../dialogs/ChangeMenu/ChangeMenuDialog";
import { RootState, store } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedCategoryId } from "../../store/features/selectedCategorySlice";

export default function MenuPage() {
  // const [uploadFile, { error, isLoading }] = useUploadFileMutation()
  const [changeMenuDialogStatus, setChangeMenuDialogStatus] = useState(false)
  const dispatch = useDispatch()
  dispatch(clearSelectedCategoryId())

  const onChangeMenuDialogClose = () => {
    setChangeMenuDialogStatus(!changeMenuDialogStatus)
  }
  return (
    <>
      <Box sx={{ flexGrow: 1, maxHeight: '70vh' }}>
        <Button fullWidth onClick={() => onChangeMenuDialogClose()} color='primary' variant='outlined'>Change menu</Button>
        <ChangeMenuDialog open={changeMenuDialogStatus} onClose={onChangeMenuDialogClose} />

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CategoriesList></CategoriesList>
          </Grid>
          <Grid item xs={8}>
            <ItemsList></ItemsList>
          </Grid>
        </Grid>

      </Box>
    </>
  )
}

