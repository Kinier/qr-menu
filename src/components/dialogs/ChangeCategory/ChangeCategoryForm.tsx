import { Formik, Form, Field, } from "formik";
import { Button, CircularProgress, Grid, Input, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useChangeCategoryMutation, useGetCategoryByIdQuery } from "../../../store/apis/categoryApi";
import { useEffect } from "react";


const ChangeCategoryForm = ({ onClose: onClose, categoryId: categoryId }: { onClose: () => void, categoryId: number }) => {
  const [changeCategory] = useChangeCategoryMutation();
  const { data, error, isLoading, isFetching, isSuccess, isError, refetch } = useGetCategoryByIdQuery(+categoryId!, {refetchOnMountOrArgChange: true})

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
          initialValues={{ name: data.name ?? "",  file: '' }} // ! file так и надо
          validate={() => ({})}
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values)
            changeCategory({ id: +categoryId!, category: { name: values.name,  file: values.file } })
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

              {/* <Field name="description">
                {({ field }: { field: any }) => (
                  <TextField {...field} fullWidth label="Description" margin="normal" />
                )}
              </Field> */}

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

export default ChangeCategoryForm;