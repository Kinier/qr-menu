import { Button, TextField, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import usersSlice, { setToken } from "../../store/features/usersSlice";
import { useLoginMutation, userApi } from "../../store/apis/userApi";
import { useDispatch } from "react-redux";

interface Data {
    access_token: string;
}

export const LoginPage = () => {
    const [login, /* { isError, error } */] = useLoginMutation()
    const navigate = useNavigate();
    const dispatch = useDispatch()

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >

            <Grid item xs={3}>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={async (values, { setSubmitting }) => {
                        // Make API call to server to handle registration with values.email and values.password
                        const data = await login({ email: values.email, password: values.password }).unwrap()

                        dispatch(setToken({ access_token: data.access_token }))
                        setSubmitting(false);
                        navigate("/");
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
                            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                                Login
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    )
}
