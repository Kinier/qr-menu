import { Formik, Form, Field } from "formik";
import { Button, TextField } from "@mui/material";
import { useCreateMenuMutation } from "../../../store/apis/menuApi";

const AddMenuForm = ({onClose: onClose}: {onClose: () => void}) => {
  const [createMenu, { isLoading }] = useCreateMenuMutation()

  return (
    <Formik
      initialValues={{ name: "", description: "", photo: '' }}
      validate={() => ({})}
      onSubmit={async(values, { setSubmitting }) => {
        // handle form submission here
        console.log(values);
        createMenu({ ...values })
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

export default AddMenuForm;