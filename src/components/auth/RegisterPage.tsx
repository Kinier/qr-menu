import { Button, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useLoginMutation } from "../../store/apis/userApi";

export const RegisterPage = () => {
    const [login, /* { isError, error } */] = useLoginMutation()

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
                // Make API call to server to handle registration with values.email and values.password
                const data = login({email: values.email, password: values.password}) 
                console.log(data);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field
                        name="email"
                        label="Email"
                        type="email"
                        as={TextField}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <Field
                        name="password"
                        label="Password"
                        type="password"
                        as={TextField}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        Register
                    </Button>
                </Form>
            )}
        </Formik>
    )
}
