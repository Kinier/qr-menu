import React, { useEffect, useRef, useState } from 'react';
import { Box, ButtonGroup, CircularProgress, FormControl, Grid, Input, Paper, Skeleton, Typography, makeStyles } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useProfileQuery } from '../../store/apis/userApi';
import type { RootState } from '../../store';
import { useChangeEstablishmentMutation, useGetEstablishmentByIdQuery } from '../../store/apis/establishmentApi';
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

export default function EstablishmentSettings() {
  const profileQuery = useProfileQuery()
  const [image, setImage] = useState<Blob | null>(null)
  const establishmentFetch = useGetEstablishmentByIdQuery()
  const [changeEstablishment] = useChangeEstablishmentMutation()

  const componentRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    profileQuery.isSuccess &&
      fetch(`${process.env.REACT_APP_API_URL}/establishment/${profileQuery.data?.establishmentId}/qr`)
        .then((value) => value.blob()
          .then((value) => setImage(value)))
  }, [profileQuery.data?.establishmentId])


  const qrGenerate = async () => {
    profileQuery.isSuccess &&
    fetch(`${process.env.REACT_APP_API_URL}/establishment/qr/${profileQuery.data?.establishmentId}`, {method: "POST",headers: {"Content-Type": "application/json"}})
      .then((value) => value.blob()
        .then((value) => setImage(value)))
  }


  return (
    <>
      <Paper sx={{ m: 2 }}>
        {(establishmentFetch.isLoading || establishmentFetch.isFetching) &&
          <Grid container justifyContent="center" padding={2}>
            <CircularProgress />
          </Grid>
        }
        {establishmentFetch.isSuccess && !establishmentFetch.isFetching &&
          <Formik
            initialValues={{ name: establishmentFetch.data.name, address: establishmentFetch.data.address, phone: establishmentFetch.data.phone }} // ! file так и надо
            validate={() => ({})}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values)
              changeEstablishment({ establishment: { ...values } })
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
      <Paper sx={{ m: 2, p: 2, minHeight: '200px' }}>
        <Grid container columnSpacing={1} >
          <Grid item sm={2} sx={{height: '164px'}}>


            {!image && <Grid container justifyContent="center" padding={5}>
            <CircularProgress />
          </Grid>}

            
              {image && <Box component='img' src={image ? URL.createObjectURL(image) : ''} ref={componentRef}  />}
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography>QR Code for establishment</Typography>
          </Grid>
          <Grid item xs={12} md={12} xl={12} lg={12} sm={12}>
            <ButtonGroup fullWidth variant="text" aria-label="text button group">
              <ReactToPrint
                trigger={() => <Button fullWidth>Print</Button>}
                content={() => componentRef.current}
              />
              <Button fullWidth onClick={()=>qrGenerate()}>Generate QR-Code</Button>

            </ButtonGroup>
          </Grid>
        </Grid>



      </Paper>
      
    </>
  );
}