import React, { useEffect, useRef, useState } from 'react';
import { Box, ButtonGroup, CircularProgress, FormControl, Grid, Input, Paper, Typography, makeStyles } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { clearToken } from '../../store/features/usersSlice';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useProfileQuery } from '../../store/apis/userApi';
import type { RootState } from '../../store';
import { useChangeRestaurantMutation, useGetRestaurantByIdQuery } from '../../store/apis/restaurantApi';
import { Formik, Form, Field } from 'formik';
import ReactToPrint from 'react-to-print';
const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  button: {
  },
}

export default function RestaurantSettings() {
  const user = useSelector((state: RootState) => state.users)
  const profileQuery = useProfileQuery()
  const [image, setImage] = useState<Blob | null>(null)
  const restaurantFetch = useGetRestaurantByIdQuery()
  const [changeRestaurant] = useChangeRestaurantMutation()

  const componentRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    profileQuery.isSuccess &&
      fetch(`${process.env.REACT_APP_API_URL}/restaurant/${profileQuery.data?.restaurantId}/qr`)
        .then((value) => value.blob()
          .then((value) => setImage(value)))
  }, [profileQuery.data?.restaurantId])



  const exitAccount = () => {
    dispatch(clearToken())
    navigate('/login')
  }

  return (
    <>
      <Paper sx={{ m: 2 }}>
        {(restaurantFetch.isLoading || restaurantFetch.isFetching) &&
          <Grid container justifyContent="center" padding={2}>
            <CircularProgress />
          </Grid>
        }
        {restaurantFetch.isSuccess && !restaurantFetch.isFetching &&
          <Formik
            initialValues={{ name: restaurantFetch.data.name, address: restaurantFetch.data.address, phone: restaurantFetch.data.phone }} // ! file так и надо
            validate={() => ({})}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values)
              changeRestaurant({ restaurant: { ...values } })
              setSubmitting(false);
            }}
          >

            {({ isSubmitting, setFieldValue }) => (
              <Form >
                <Field name="name">
                  {({ field }: { field: any }) => (
                    <TextField label="Name"  {...field} margin="normal" sx={{ m: 2 }} />
                  )}
                </Field>

                <Field name="phone">
                  {({ field }: { field: any }) => (
                    <TextField {...field} label="Phone" margin="normal" sx={{ m: 2 }} />
                  )}
                </Field>

                <Field name="address" >
                  {({ field }: { field: any }) => (
                    <TextField {...field} label="Address" margin="normal" sx={{ m: 2 }} />
                  )}
                </Field>

                <Button type="submit" disabled={isSubmitting} color="primary" size="large" variant="outlined" sx={{ m: 2 }}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        }

      </Paper>
      <Paper sx={{ m: 2, p: 2 }}>
        <Grid container columnSpacing={1}>
          <Grid item>
            <Box component='img' src={image ? URL.createObjectURL(image) : ''} sx={{ width: '100%', height: '100%' }} ref={componentRef}/>
          </Grid>
          <Grid item >
            <Typography>QR Code for restaurant</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <ButtonGroup fullWidth variant="text" aria-label="text button group">
              <ReactToPrint
                trigger={() => <Button fullWidth>Print</Button>}
                content={() => componentRef.current}
              />
              <Button fullWidth>Generate QR-Code</Button>
              
            </ButtonGroup>
          </Grid>
        </Grid>



      </Paper>
      <Paper sx={{ m: 2 }}>

        <Button onClick={() => exitAccount()}>
          <LogoutIcon />
          Exit
        </Button>
      </Paper>
    </>
  );
}