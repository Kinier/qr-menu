import { Formik, Form, Field } from "formik";
import { Button, TextField } from "@mui/material";
import { useCreateCategoryMutation } from "../../../store/apis/categoryApi";
import { useParams } from "react-router-dom";

const AddCategoryForm = ({onClose: onClose}: {onClose: () => void}) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation()
  const { menuId } = useParams();

  return (
    <Formik
      initialValues={{ name: "",  photo: '' }}
      validate={() => ({})}
      onSubmit={async(values, { setSubmitting }) => {
        // handle form submission here
        createCategory({ ...values, ...{menuId: +menuId!} })
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
          {/* <Field
            name="description"
            label="Description"
            component={TextField}
            fullWidth
            margin="normal"
            onChange={(event: { currentTarget: { value: string; }; }) => {
              setFieldValue("description", event.currentTarget.value);
            }}
          /> */}
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

export default AddCategoryForm;