import { Formik, Form, Field } from "formik";
import { Button, TextField } from "@mui/material";
import { useCreateItemMutation } from "../../../store/apis/itemApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const AddItemForm = ({onClose: onClose}: {onClose: () => void}) => {
  const [createItem, { isLoading }] = useCreateItemMutation()
  const selectedCategory = useSelector((state: RootState)=> state.selectedCategory)

  return (
    <Formik
      initialValues={{ name: "", description: "", price: 0,  photo: '' }}
      validate={() => ({})}
      onSubmit={async(values, { setSubmitting }) => {
        // handle form submission here
        createItem({ ...values, ...{categoryId: selectedCategory.id!} })
        onClose()
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form >
          <Field
            name="name"
            label="Name"
            component={TextField}
            fullWidth
            margin="normal"
            onChange={(event: { currentTarget: { value: string; }; }) => {
              setFieldValue("name", event.currentTarget.value);
            }}
          />
          <Field
            name="description"
            label="Description"
            component={TextField}
            fullWidth
            margin="normal"
            onChange={(event: { currentTarget: { value: string; }; }) => {
              setFieldValue("description", event.currentTarget.value);
            }}
          />
          <Field
            name="price"
            label="Price"
            type="number"
            component={TextField}
            fullWidth
            margin="normal"
            onChange={(event: { currentTarget: { value: number; }; }) => {
              setFieldValue("price", event.currentTarget.value);
            }}
          />
          <Button variant="contained" fullWidth>
            <input
              type="file"
              name="photo"
              onChange={event => {
                setFieldValue("photo", event.currentTarget.files![0]);
              }}
            />
          </Button>
          <Button type="submit" disabled={isSubmitting} color="primary" size="medium" variant="outlined">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddItemForm;