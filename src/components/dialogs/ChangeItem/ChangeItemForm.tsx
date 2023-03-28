import { Formik, Form, Field, } from "formik";
import { Button, CircularProgress, Grid, Input, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useChangeCategoryMutation, useGetCategoryByIdQuery } from "../../../store/apis/categoryApi";
import { useEffect } from "react";
import { useChangeItemMutation, useGetItemByIdQuery } from "../../../store/apis/itemApi";


const ChangeItemForm = ({ onClose: onClose, itemId: itemId }: { onClose: () => void, itemId: number }) => {
  const [changeItem] = useChangeItemMutation();
  const { data, error, isLoading, isFetching, isSuccess, isError, refetch } = useGetItemByIdQuery(+itemId!, {refetchOnMountOrArgChange: true})

  useEffect(()=>{
    refetch()
  }, [])


  return (
    <>
      {isLoading &&
        <Grid container justifyContent="center" padding={2} >
          <CircularProgress />
        </Grid>
      }
      {isError &&
        "Error"
      }
      {isSuccess && !isFetching &&
        <Formik
          initialValues={{ name: data.name ?? "", description: data.description ?? "", price: data.price ?? 0,  file: '' }} // ! file так и надо
          validate={() => ({})}
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values)
            changeItem({ id: +itemId!, item: { name: values.name, description: values.description, price: values.price,  file: values.file } })
            onClose()
            setSubmitting(false);
          }}
        >

          {({ isSubmitting, setFieldValue }) => (
            <Form >
              <Field name="name">
                {({ field }: { field: any }) => (
                  <TextField label="Name" fullWidth {...field} margin="normal" />
                )}
              </Field>

              <Field name="description">
                {({ field }: { field: any }) => (
                  <TextField {...field} fullWidth label="Description" margin="normal" />
                )}
              </Field>

              <Field name="price">
                {({ field }: { field: any }) => (
                  <TextField {...field} fullWidth label="Price" margin="normal" type="number"/>
                )}
              </Field>

              <Field name="file" >
                {({ field }: { field: any }) => (
                  <Input
                    type="file"
                    fullWidth
                    onChange={(event: any) => {
                      setFieldValue('file', event.currentTarget.files[0])
                    }
                    }
                  />
                )}
              </Field>

              <Button fullWidth type="submit" disabled={isSubmitting} color="primary" size="medium" variant="outlined">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      }
    </>
  );
};

export default ChangeItemForm;