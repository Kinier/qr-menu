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
import OrdersTable from "../lists/OrdersTable";

export default function Orders() {
  
  return (
    <>
      <Box sx={{ flexGrow: 1, maxHeight: '70vh' }}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ minHeight: '80vh', p: 2}}>
                <OrdersTable/>
            </Paper>
          </Grid>
        </Grid>

      </Box>
    </>
  )
}

