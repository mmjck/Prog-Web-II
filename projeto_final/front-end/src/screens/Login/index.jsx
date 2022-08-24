import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import LinearProgress from '@mui/material/LinearProgress';

import React from 'react';
import { changeUser } from "../../redux/actions/userAction";
import Api from "../../services/api";
import { Container, Button, Box, Link, Grid, Typography, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
        .string('Insira seu email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoadinng] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await Api.login({ email, senha: password });

            console.log(response.usuario);
            setLoadinng(false)
            dispatch(changeUser(response.usuario));
            navigate(`/`)
        } catch (error) {
            console.log(error);
        } finally {
            setLoadinng(false)
        }
    }

    const theme = createTheme();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <ThemeProvider theme={theme}>
            {loading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}
            <Container component="main" maxWidth="xs">

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Entrar
                    </Typography>
                    <Box component="form" onSubmit={formik.onSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}

                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />



                        <Button
                            type="submit"
                            fullWidth
                            onSubmit={handleSubmit}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Entrar
                        </Button>
                        <Grid container>

                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Ainda não possui uma conta?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );

}


export default Login;